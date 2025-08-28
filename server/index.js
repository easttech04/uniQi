const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // HTTP request logger middleware

// MongoDB Connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
  initial(); // Function to seed initial roles
});

const Role = require('./models/Role');

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "Sales",
        permissions: ["MANAGE_ORDERS", "MANAGE_PRODUCTS", "VIEW_REPORTS"]
      }).save(err => {
        if (err) console.log("error", err);
        console.log("added 'Sales' to roles collection");
      });

      new Role({
        name: "System Administrator",
        permissions: ["MANAGE_USERS", "MANAGE_ROLES", "MANAGE_WEBSITE_CONTENT"]
      }).save(err => {
        if (err) console.log("error", err);
        console.log("added 'System Administrator' to roles collection");
      });

      new Role({
        name: "Super Admin",
        permissions: ["ALL"] // Super admin has all permissions
      }).save(err => {
        if (err) console.log("error", err);
        console.log("added 'Super Admin' to roles collection");
      });
    }
  });
}

// API Routes
const ordersRouter = require('./routes/orders');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const statsRouter = require('./routes/stats');
const authRouter = require('./routes/auth');

app.use('/api/orders', ordersRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/stats', statsRouter);
app.use('/api/auth', authRouter);

app.get('/api', (req, res) => {
  res.send('Hello from UniQi API!');
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
