document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrar');
  const nameInput = document.getElementsByName('usernameInput')[0];
  const scoreInput = document.getElementsByName('scoreInput')[0];

  const ul = document.getElementById('userList');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const userNameText = 'Username: ' + nameInput.value;
    nameInput.value = '';
    const highscoreText = 'Highscore: ' + scoreInput.value;
    scoreInput.value = '';
    addUser(userNameText, highscoreText);

  });

  function addUser(userName, highscore) {
    //do database stuff
    const usernameLi = createLi(userName);
    ul.appendChild(usernameLi);

    const highscoreLi = createLi(highscore);
    ul.appendChild(highscoreLi);
  }

  function createLi(text) {
    console.log('test');
    const li = document.createElement('li');

    appendToLi('span', 'textContent', text);
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
