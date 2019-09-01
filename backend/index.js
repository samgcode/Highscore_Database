const express = require('express');
const bodyParser = require('body-parser');
const queries = require('./queries');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
