const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'my_database',
  port: 54320,
});

//get all users
const getUsers = (request, response) => {
  pool.query('SELECT * FROM highscores', (error, results) => {
    if(error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
}

//get user by username & password
const getUser = (request, response) => {
  const username = request.params.username;

  pool.query('SELECT * FROM highscores WHERE username = $1', [username], (error, results) => {
    if(error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
}

//add new user
const addUser = (request, response) => {
  const { username, highscore } = request.body;

  pool.query('INSERT INTO highscores (username, highscore) VALUES ($1, $2)', [username, highscore], (error, results) => {
    if(error) {
      throw error;
    }
    response.status(201).send(`User added with the username: ${username}`);
  });
}

//edit high score
const editScore = (request, response) => {
  const username = request.params.username;
  const newScore = request.body.newScore;

  pool.query(
    'UPDATE highscores SET highscore = $1 WHERE username = $2',
    [newScore, username],
    (error, results) => {
      if(error) {
        throw error;
      }
      response.status(200).send(`High score modified of user: ${username}`);
    }
  );
}

//remove user
const removeUser = (request, response) => {
  const username = request.params.username;

  pool.query(
    'DELETE FROM highscores WHERE username = $1', [username], (error, results) => {
    if(error) {
      throw error;
    }
    response.status(200).send(`User removed with username: ${username}`);
    }
  );
}

module.exports = {
  getUsers,
  getUser,
  addUser,
  editScore,
  removeUser,
};




















//
