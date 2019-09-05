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

  function addUser(userName, highscore) {
    //do database stuff
    const usernameLi = createLi(userName, highscore);
    ul.appendChild(usernameLi);
  }

  function createLi(userName, highscore) {
    console.log('test');
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

});
