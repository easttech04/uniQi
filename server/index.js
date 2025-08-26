const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (placeholder)
const uri = process.env.ATLAS_URI || "mongodb://localhost:27017/uniqi";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully (mocked)");
})

// API Routes
const ordersRouter = require('./routes/orders');
app.use('/api/orders', ordersRouter);

app.get('/api', (req, res) => {
  res.send('Hello from UniQi API!');
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
