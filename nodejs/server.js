const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const path = require('path');

const CorsOption = {
  origin: true,
  credentials: true,
};
app.use('*', cors(CorsOption));
dotenv.config({ path: "config.env" });
require('../nodejs/dbconnection/connection');
const filePath = path.join(__dirname, "../crud/nodejs"); // Use __dirname to get the current script's directory

const port = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
  const fileAbsolutePath = path.join(filePath, 'users.xlsx'); // Construct the absolute path to the file
  res.sendFile(fileAbsolutePath);
});

app.get('/nodejs/models/usermodel', (req, res) => {
  res.send("hello");
});

app.use(require('../nodejs/api/user'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

