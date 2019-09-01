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
  const { username, password } = request.body;

  pool.query('SELECT * FROM highscores WHERE username = $1 AND password = $2', [username, password], (error, results) => {
    if(error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
}

//add new user
const addUser = (request, response) => {
  const { username, password } = request.body;

  pool.query('INSERT INTO invitees (username, password) VALUES ($1, $2)', [username, password], (error, results) => {
    if(error) {
      throw error;
    }
    response.status(201).send(`User added with the username: ${username}`);
  });
}

//edit high score
const editScore = (request, response) => {
  const newScore = request.params.score;
  const { username, password } = request.body;

  pool.query(
    'UPDATE highscores SET highscore = $1 WHERE username = $2 AND password = $3',
    [username, [password], newScore],
    (error, results) => {
      if(error) {
        throw error;
      }
      response.status(200).send(`High score modified of user: ${username}`);
    }
  );
}

//remove user
const removeInvitee = (request, response) => {
  const { username, password } = request.body;
  
  pool.query(
    'DELETE FROM highscore WHERE username = $1 AND password = $2', [username, password], (error, results) => {
    if(error) {
      throw error;
    }
    response.status(200).send(`Invitee removed with name ${name}`);
    }
  );
}






















//
