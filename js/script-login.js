const infoApi = async () => {
  const character = {};
  try {
    const api = await fetch('https://dragonball-api.com/api/characters/1');
    const response = await api.json();
    character.name = response.name;
    character.img = response.image;
  } catch (error) {
    console.log(error);
  }

  return {
    character,
  };
};

window.addEventListener('load', async () => {
  // const { character } = await infoApi();
  // console.log(character);
  // const card = document.querySelector('.card-character');
  // const loading = document.createElement('p');

  // if (Object.keys(character) < 0) {
  //   console.log('entra al if');
  //   loading.innerHTML = 'Cargando Personaje';
  //   card.appendChild(loading);
  // }

  // const nameTag = document.createElement('h3');
  // const imageTag = document.createElement('img');
  // imageTag.style.width = '200px';

  // console.log(card);

  // const content = document.createTextNode(character.name);
  // // const image = document.createTextNode(character.img);
  // // console.log(typeof image)
  // imageTag.setAttribute('src', character.img);
  // console.log(imageTag);
  // nameTag.appendChild(content);
  // //card.appendChild(nameTag);
  // card.appendChild(imageTag);

  const btnSignIn = document.querySelector('.btn-sign-in');

  const USERS = 'users';
  const USER ='user';

  const infoUsers = JSON.parse(localStorage.getItem(USERS));
  console.log(infoUsers);

  function userLogin() {
    //1. capturo los inputs de ingreso
    const inputEmail = document.querySelector('.input-email');
    const inputPassword = document.querySelector('.input-password');

    //2. creo un user de ingreso que va a tener esos valores del ingreso
    const userLogin = {
      email: '',
      password: '',
    };
    userLogin.email = inputEmail.value;
    userLogin.password = inputPassword.value;

    return userLogin;
  }

  function sendInfoLogin() {
    btnSignIn.addEventListener('click', () => {
      const data = userLogin();
      const errors = validation(data);
    });
  }
  sendInfoLogin();

  function validation({ email, password }) {
    const errors = {};

    const msjEmail = document.querySelector('.msj-email');
    const msjPassword = document.querySelector('.msj-password');

    if (!email.length) {
      msjEmail.style.display = 'block';
      msjEmail.innerText = '*Debes ingresar un email';
      errors.email = msjEmail.innerText;
    }

    if (infoUsers.length) {
      const findUser = infoUsers.find((user) => {
        return user.email === email;
      });
      if (findUser && findUser.password === password) {
        localStorage.setItem(USER, JSON.stringify(findUser))
        window.location.href = 'index.html';
      } else if(!findUser){
        alert("contraseña o correo incorrecto")
      }
    }

    if (!password.length) {
      msjPassword.style.display = 'block';
      msjPassword.innerText = '*Debes ingresar una contraseña';
      errors.password = msjPassword.innerText;
    }
  }
});
