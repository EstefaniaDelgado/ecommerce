const getAllMen = async () => {
  let data = null;
  try {
    const api = await fetch(
      'https://dragonball-api.com/api/characters?gender=Male'
    );
    const response = await api.json();
    data = response;
  } catch (error) {
    console.log('Ocurrio un error', error);
  }

  return {
    data,
  };
};


window.addEventListener('load', ()=>{
  
  /*--- DESPLEGAR EL MENU Y CERRARLO EN MOBILE-----> */

  function showMenu() {
    const iconMenu = document.querySelector('.container-icon-menu');

    iconMenu.addEventListener('click', () => {
      const menu = document.querySelector('.container-menu');
      menu.classList.add('active-menu');
    });

    const closeIcon = document.querySelector('.container-close-icon');

    closeIcon.addEventListener('click', () => {
      const menu = document.querySelector('.container-menu');
      menu.classList.remove('active-menu');
    });
  }

  showMenu();

  const showMen = async () => {
    const { data } = await getAllMen();
    console.log(data);
    let container = document.querySelector('.container-characters');
    // container.innerHTML = '';
    data.forEach((element) => container.innerHTML += showStructure(element));
    //container.innerHTML += characters
  };
  
  showMen();
  
  const showStructure = (character) => {
    console.log(character);
    return`<section class="card-character">
            <figure class="container-image">
              <img src=${character.image} alt="personaje" class="character" />
            </figure>
            <div class="container-info">
              <h3 class="name-character">${character.name}</h3>
             <p class="race">Raza: ${character.race}</p>
             <p class="genre">Genero: ${character.gender}</p>
            </div>
          </section>`;
  };
})



