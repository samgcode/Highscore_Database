
//make sure the page is loaded before runnign the program
document.addEventListener('DOMContentLoaded', () => {
  //get certain elements on the page
  const form = document.getElementById('registrar');
  const nameInput = document.getElementsByName('usernameInput')[0];
  const scoreInput = document.getElementsByName('scoreInput')[0];

  const ul = document.getElementById('userList');

  //run code when you submit the text fields
  form.addEventListener('submit', (e) => {
    //stop the age from reloding when the form is submitted
    e.preventDefault();

    //get the text from the name and high score input field
    const userNameText = nameInput.value;
    nameInput.value = '';
    const highscoreText = scoreInput.value;
    scoreInput.value = '';
    //add a new user to the database
    addUser(userNameText, highscoreText);
  });

  //store the username
  let username = '';

  //detect a click on one of the users
  ul.addEventListener('click', (e) => {
    //if the click is on a button
    if(e.target.tagName === 'BUTTON') {
      //get elements on the ul
      const button = e.target;
      const li = button.parentNode;

      //remove all white pace in the text content of the button
      //then set the action to the buttons content
      const action = button.textContent.replace(/\s/g, '');

      //create an array of functions
      const actions = {
        remove: () => {
          //removes a user from the data base
          removeUser(li);
        },
        Edit: () => {
          //start editing a users name
          //get the text for the username
          const userNameSpan = li.childNodes[1];
          //make an input element
          const usernameInput = document.createElement('input');
          usernameInput.type = 'text';
          //set the username to the name on the li
          username = userNameSpan.textContent;
          //set the value of the input to the current username
          usernameInput.value = userNameSpan.textContent;
          //replace the span with the input
          li.insertBefore(usernameInput, userNameSpan);
          li.removeChild(userNameSpan);
          //update the text content of the button
          button.textContent = 'Save';

          //start editing a users highscore
          //get the text for the highscore
          const highScoreSpan = li.childNodes[3];
          //create an input element
          const highscoreInput = document.createElement('input');
          highscoreInput.type = 'text';

          //set the inputs value t othe current high score
          highscoreInput.value = highScoreSpan.textContent;
          //replace the soan with the input
          li.insertBefore(highscoreInput, highScoreSpan);
          li.removeChild(highScoreSpan);
        },
        Save: () => {
          editUser(username, li);
        },
      };
      //call the function of the button that was pressed
      actions[action]();
    }
  });

  //create an li element for each user
  function createLi(userName, highscore) {
    //create an li element
    const li = document.createElement('li');

    //make all the text and buttons for the li
    appendToLi('span', 'textContent', 'Username: ');
    createSpan('textContent', userName, 'username-span');
    appendToLi('span', 'textContent', ' Highscore: ');
    createSpan('textContent', highscore, 'highscore-span');
    var editButton = appendToLi('button', 'textContent', 'Edit');
    var removeButton = appendToLi('button', 'textContent', 'remove');
    //add whatever other stuff to the li

    editButton.className = 'btn btn-outline-info';
    removeButton.className = 'btn btn-outline-danger';

    //create a span element with the given class and property
    function createSpan(property, value, className) {
      //create a span element
      const span = createElement('span', property, value);
      //set the class name of the span
      span.className = className;
      //add the span to the li
      li.appendChild(span);
    }

    //add a new element to the li
    function appendToLi(elementName, property, value) {
      //create the given element
      const element = createElement(elementName, property, value);
      //add the element to the li
      li.appendChild(element);
      return element;
    }

    //create and return a new element
    function createElement(elementName, property, value) {
      //create the element
      const element = document.createElement(elementName);
      //set the property on the element
      element[property] = value;
      return element;
    }
    //return the li
    return li;
  }

  //create a new http request
  let xhr = new XMLHttpRequest();

  //load all the users
  loadUsers();

  function loadUsers() {
    //make a query to the database
    xhr.open('GET', 'http://localhost:3000/users');
    xhr.send();

    //when the request loads check the status code
    xhr.onload = () => {
      if(xhr.status != 200) {
        alert(`Error ${xhr.status}: ${xhr.statusText}`);
      } else {
        //parse the http response
        var users = JSON.parse(xhr.response);
        for(var i = 0; i < users.length; i++) {
          //create an li for each user
          const user = users[i];
          console.log('username: ', user.username);
          const li = createLi(user.username, user.highscore);

          ul.appendChild(li);
        }
      }
    };
  }

  //add a new user to the database
  function addUser(username_, highscore_) {
    var username = username_.replace(/\s+/g, "");
    var highscore = highscore_.replace(/\s+/g, "");
    if(username != '' && highscore != '') {
      //make a query to the database
      xhr.open('POST', `http://localhost:3000/users/`);
      //send the info of the new user to the database
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.send(`username=${username}&highscore=${highscore}`);

      console.log(username);

      //when the request loads check the status code
      xhr.onload = () => {
        if(xhr.status != 201) {
          alert(`Error ${xhr.status}: ${xhr.statusText}`);
        } else {
          //create an i for the new user
          const li = createLi(username, highscore);
          ul.appendChild(li);
        }
      };
    } else {
      if (username === '') {
        alert("Please enter a name that's not blank. (I'm pretty sure that's not your username)");
      }
      if(highscore === '') {
        alert("Please enter a score that's not blank. (You don't want a blank score)");
      }
    }
  }

  //remove as user from the database
  function removeUser(li) {
    //get the name of the user
    username = li.childNodes[1].textContent;

    //make the query to the database
    xhr.open('DELETE', `http://localhost:3000/users/${username}`);
    xhr.send();

    //when the request loads check the status code
     xhr.onload = () => {
       if(xhr.status != 200) {
         alert(`Error ${xhr.status}: ${xhr.statusText}`);
       } else {
         //remove the li from the page
         ul.removeChild(li);
       }
     };
  }

  function editUser(username, li) {

    console.log('Username: ', username);
    xhr.open('PUT', `http://localhost:3000/users/${username}`);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    const nameInput = li.childNodes[1];
    const scoreInput = li.childNodes[3];
    const button = li.childNodes[4];

    const newName = nameInput.value;
    const newScore = scoreInput.value;

    console.log('score: ', newScore);

    xhr.send(`username=${newName}&highscore=${newScore}`)

    xhr.onload = () => {
      if (xhr.status != 200) {
        alert(`Error ${xhr.status}: ${xhr.statusText}`);
      } else {
        const scoreSpan = document.createElement('span');
        scoreSpan.textContent = scoreInput.value;

        li.insertBefore(scoreSpan, scoreInput);
        li.removeChild(scoreInput);

        const nameSpan = document.createElement('span');
        nameSpan.textContent = nameInput.value;

        li.insertBefore(nameSpan, nameInput);
        li.removeChild(nameInput);

        button.textContent = 'Edit';
      }
    };

  }
});//210


























//
