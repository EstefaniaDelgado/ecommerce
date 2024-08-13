window.addEventListener('load', () => {
  //---------------Creacion de un usuario para el RESGITRO------------

  // 1. Capturar los inputs
  const name = document.querySelector('#name');
  const email = document.querySelector('#email');
  const password = document.querySelector('#pass');
  const btnSendInfo = document.querySelector('.send-info');

  const USERS = 'users';
  const USER ='user';

  const infoUsers = JSON.parse(localStorage.getItem(USERS)) || [];

  //2. Guarda el valor de los inputs en un objeto y agrega cada valor al objeto del user
  function infoFormRegister() {
    const user = {
      name: '',
      email: '',
      password: '',
      image: '',
    };

    user.name = name.value;
    user.email = email.value;
    user.password = password.value;

    return user;
  }

  //2.Toma el obj user y lo manda a la funcion que valide cada valor
  function sendInfoFormResgiter() {
    const form = document.querySelector('.container-inputs');

    //agrega el evento al form para el envio de la info
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      
      //llama a la funcion que devuelve el user y luego lo envia a la funcion que valida
      const data = infoFormRegister();
      const errors = validationInfo(data);
 
      if (Object.keys(errors).length > 0) {
        console.log('no hace el envio de la info');
      } else {
        infoUsers.push(data);
        localStorage.setItem(USER, JSON.stringify(data))
        name.value = '';
        email.value = '';
        password.value = '';
        window.location.href = "index.html"
      }
      localStorage.setItem(USERS, JSON.stringify(infoUsers));
      console.log(infoUsers)
    });
  }

  sendInfoFormResgiter();

  //3. recibe cada propiedad del user y valida que tenga valor y que este sea correcto en formato
  function validationInfo({ name, email, password }) {
    const errors = {};

    //capturar los parrafos que muestra el msj de error
    const msjName = document.querySelector('.msj-name');
    const msjEmail = document.querySelector('.msj-email');
    const msjPassword = document.querySelector('.msj-password');
   

    if (name.length === 0) {
      msjName.style.display = 'block';
      msjName.innerText = '*Debes agregar un nombre';
      errors.name = msjName.innerText;
    } else if (name.length <= 3) {
      msjName.style.display = 'block';
      msjName.innerText = 'Agrega un nombre válido de más de 3 caracteres';
      errors.name = msjName.innerText;
    }

    if (!email.length) {
      msjEmail.style.display = 'block';
      msjEmail.innerText = '*Debes agregar un email';
      errors.email = msjEmail.innerText;
    }

    if (!password.length) {
      msjPassword.style.display = 'block';
      msjPassword.innerText = '*Debes agregar una contraseña';
      errors.password = msjPassword.innerText;
    }
    
    //Importante: valida que el correo del usuario no exista aun
    if (infoUsers.length) {
      const existUser = infoUsers.some((user) => user.email === email);
      if (existUser) {
        msjEmail.style.display = 'block';
        msjEmail.innerText = '*Este correo ya existe';
        errors.email = msjEmail.innerText;
      }
    }
    return errors;
  }
});
