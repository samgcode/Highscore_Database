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
          ul.removeChild(li);
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
          const span = document.createElement('span');
          const input = li.childNodes[1];
          span.textContent = input.value;
          li.insertBefore(span, input);
          li.removeChild(input);
          button.textContent = 'Edit name';
        },
        Editscore: () => {
          const span = li.childNodes[5];
          const input = document.createElement('input');
          input.type = 'text';
          username = span.textContent;
          input.value = span.textContent;
          li.insertBefore(input, span);
          li.removeChild(span);
          button.textContent = 'Save score';
        },
        Savescore: () => {
          const span = document.createElement('span');
          const input = li.childNodes[5];
          span.textContent = input.value;
          li.insertBefore(span, input);
          li.removeChild(input);
          button.textContent = 'Edit score';
        }
      };
      actions[action]();
    }
  });

  function addUser(userName, highscore) {
    //do database stuff
    const usernameLi = createLi(userName, highscore);
    ul.appendChild(usernameLi);
  }

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

});
