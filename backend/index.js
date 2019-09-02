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

app.get('/', (req, res) => {
  res.json({info: 'Highscore database, with Node.js and postgres API'});
});

app.post('/users', queries.addUser);
app.get('/users', queries.getUsers);
app.get('/users/:username', queries.getUser);
app.put('/users/:username', queries.editScore);
app.delete('/users/:username', queries.removeUser);

app.listen(port, () => {
  console.log(`App runing on port ${port}`);
});
