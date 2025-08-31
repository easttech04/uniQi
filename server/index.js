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

async function initial() {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count === 0) {
      await new Role({
        name: "Sales",
        permissions: ["MANAGE_ORDERS", "MANAGE_PRODUCTS", "VIEW_REPORTS"]
      }).save();
      console.log("added 'Sales' to roles collection");

      await new Role({
        name: "System Administrator",
        permissions: ["MANAGE_USERS", "MANAGE_ROLES", "MANAGE_WEBSITE_CONTENT"]
      }).save();
      console.log("added 'System Administrator' to roles collection");

      await new Role({
        name: "Super Admin",
        permissions: ["ALL"] // Super admin has all permissions
      }).save();
      console.log("added 'Super Admin' to roles collection");
    }
  } catch (err) {
    console.error("Error initializing roles:", err);
  }
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
