document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrar');
  const nameInput = document.getElementsByName('usernameInput')[0];
  const scoreInput = document.getElementsByName('scoreInput')[0];

  const ul = document.getElementById('userList');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = nameInput.value;
    nameInput.value = '';
    addUser(text);

  });
  function addUser(userName) {
    //do database stuff
    const li = createLi(userName);
    ul.appendChild(li);
  }

  function createLi(userName) {
    console.log('test');
    const li = document.createElement('li');

    appendToLi('span', 'textContent', userName);
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
