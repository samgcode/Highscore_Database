document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrar');
  const nameInput = document.getElementsByName('usernameInput')[0];
  const scoreInput = document.getElementsByName('scoreInput')[0];

  const ul = document.getElementById('userList');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const userNameText = nameInput.value;
    nameInput.value = '';
    const highscoreText = scoreInput.value;
    scoreInput.value = '';
    addUser(userNameText, highscoreText);
  });

  let username = '';

  ul.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON') {
      const button = e.target;
      const li = button.parentNode;
      const action = button.textContent.replace(/\s/g, '');
      console.log(action);
      const actions = {
        remove: () => {
          removeUser(li);
        },
        Editname: () => {
          const span = li.childNodes[1];
          const input = document.createElement('input');
          input.type = 'text';
          username = span.textContent;
          input.value = span.textContent;
          li.insertBefore(input, span);
          li.removeChild(span);
          button.textContent = 'Save name';
        },
        Savename: () => {
          editUsername(username, li);
        },
        Editscore: () => {
          const span = li.childNodes[5];
          const input = document.createElement('input');
          input.type = 'text';
          username = li.childNodes[1].textContent;
          input.value = span.textContent;
          li.insertBefore(input, span);
          li.removeChild(span);
          button.textContent = 'Save score';
        },
        Savescore: () => {
          editScore(username, li);
        }
      };
      actions[action]();
    }
  });

  let xhr = new XMLHttpRequest();

  loadUsers();

  function createLi(userName, highscore) {
    const li = document.createElement('li');

    appendToLi('span', 'textContent', 'Username: ');
    appendToLi('span', 'textContent', userName);
    appendToLi('span', 'textContent', ' ');
    appendToLi('button', 'textContent', 'Edit name');
    appendToLi('span', 'textContent', ' Highscore: ');
    appendToLi('span', 'textContent', highscore);
    appendToLi('span', 'textContent', ' ');
    appendToLi('button', 'textContent', 'Edit score');
    appendToLi('button', 'textContent', 'remove');
    //add whatever other stuff to the li

    function appendToLi(elementName, property, value) {
      const element = createElement(elementName, property, value);
      li.appendChild(element);
      return element;
    }

    function createElement(elementName, property, value) {
      const element = document.createElement(elementName);
      element[property] = value;
      return element;
    }

    return li;
  }


  function loadUsers() {
    xhr.open('GET', 'http://localhost:3000/users');
    xhr.send();

    xhr.onload = () => {
      if(xhr.status != 200) {
        alert(`Error ${xhr.status}: ${xhr.statusText}`);
      } else {
        var users = JSON.parse(xhr.response);
        for(var i = 0; i < users.length; i++) {
          const user = users[i];
          console.log('username: ', user.username);
          const li = createLi(user.username, user.highscore);

          ul.appendChild(li);
        }
      }
    };
  }

  function addUser(username, highscore) {
    xhr.open('POST', `http://localhost:3000/users/`);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(`username=${username}&highscore=${highscore}`);

    console.log(username);

    xhr.onload = () => {
      if(xhr.status != 201) {
        alert(`Error ${xhr.status}: ${xhr.statusText}`);
      } else {
        const li = createLi(username, highscore);
        ul.appendChild(li);
      }
    };
  }

  function removeUser(li) {
    username = li.childNodes[1].textContent;

    xhr.open('DELETE', `http://localhost:3000/users/${username}`);
    xhr.send();

     xhr.onload = () => {
       if(xhr.status != 200) {
         alert(`Error ${xhr.status}: ${xhr.statusText}`);
       } else {
         ul.removeChild(li);
       }
     };
  }

  function editUsername(username, li) {
    xhr.open('PUT', `http://localhost:3000/users/${username}`);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    const input = li.childNodes[1];
    const button = li.childNodes[3];

    const newName = input.value;
    const score = parseInt(li.childNodes[5].textContent);

    xhr.send(`username=${newName}&highscore=${score}`);

    xhr.onload = () => {
      if (xhr.status != 200) {
        alert(`Error ${xhr.status}: ${xhr.statusText}`);
      } else {
        const span = document.createElement('span');
        span.textContent = input.value;

        li.insertBefore(span, input);
        li.removeChild(input);

        button.textContent = 'Edit name';
      }
    };
  }

  function editScore(username, li) {

    console.log('Username: ', username);
    xhr.open('PUT', `http://localhost:3000/users/${username}`);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    const input = li.childNodes[5];
    const button = li.childNodes[7];

    const newName = li.childNodes[1].textContent;
    const newScore = input.value;

    console.log('score: ', newScore);

    xhr.send(`username=${newName}&highscore=${newScore}`)

    xhr.onload = () => {
      if (xhr.status != 200) {
        alert(`Error ${xhr.status}: ${xhr.statusText}`);
      } else {
        const span = document.createElement('span');
        span.textContent = input.value;

        li.insertBefore(span, input);
        li.removeChild(input);

        button.textContent = 'Edit score';
      }
    };

  }
});


























//
