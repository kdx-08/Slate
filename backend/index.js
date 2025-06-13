const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;
const noteRoutes = require('./routes/noteRoutes');
const connectDB = require('./config/db');

connectDB();
app.use(cors({ origin: 'http://localhost:2005' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/notes', noteRoutes);

app.all(/(.*)/, (req, res) => {
  res.status(404).send('The requested page does not exist.');
});

app.listen(port, () => {
  console.log('server is running at port', port);
});
