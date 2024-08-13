const productsArr = [
  {
    id: 1,
    name: 'Fall Limited Edition Sneakers',
    price: 125.0,
    description:
      ' These low-profile sneakers are your perfect casual wear companion.Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.',
    image: '../images/image-product-1.jpg',
    images: [
      { imageOne: '../images/image-product-1.jpg' },
      { imageOne: '../images/image-product-2.jpg' },
      { imageOne: '../images/image-product-3.jpg' },
      { imageOne: '../images/image-product-4.jpg' },
    ],
    liked: false,
  },
  {
    id: 2,
    name: 'Fall Limited Edition Sneakers',
    price: 125.0,
    description:
      ' These low-profile sneakers are your perfect casual wear companion.Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.',
    image: '../images/image-product-1.jpg',
    images: [
      { imageOne: '../images/image-product-1.jpg' },
      { imageOne: '../images/image-product-2.jpg' },
      { imageOne: '../images/image-product-3.jpg' },
      { imageOne: '../images/image-product-4.jpg' },
    ],
    liked: false,
  },
  {
    id: 3,
    name: 'Fall Limited Edition Sneakers',
    price: 125.0,
    description:
      ' These low-profile sneakers are your perfect casual wear companion.Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.',
    image: '../images/image-product-1.jpg',
    images: [
      { imageOne: '../images/image-product-1.jpg' },
      { imageOne: '../images/image-product-2.jpg' },
      { imageOne: '../images/image-product-3.jpg' },
      { imageOne: '../images/image-product-4.jpg' },
    ],
    liked: false,
  },
  {
    id: 4,
    name: 'Fall Limited Edition Sneakers',
    price: 125.0,
    description:
      ' These low-profile sneakers are your perfect casual wear companion.Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.',
    image: '../images/image-product-1.jpg',
    images: [
      { imageOne: '../images/image-product-1.jpg' },
      { imageOne: '../images/image-product-2.jpg' },
      { imageOne: '../images/image-product-3.jpg' },
      { imageOne: '../images/image-product-4.jpg' },
    ],
    liked: false,
  },
];

window.addEventListener('load', () => {
  const USER = 'user';

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
  /* ---------------------------------------------------------- */

  /*<------- MOSTRAR LA LISTA DE PRODUCTOS DENTRO DEL CARRITO-----*/

  const CART = 'cart';
  let products = JSON.parse(localStorage.getItem(CART)) || [];

  function counterProducts() {
    const tagCounter = document.querySelector('.counter-products');
    tagCounter.innerText = products.length;

    //OCULTAR EL NUMERO QUE MUESTRA LA CANTIDAD DE PRODUCTOS EN EL CARRITO SI ESTE ES CERO
    if (!products.length) {
      tagCounter.classList.add('hide-counter-products');
    }
    //-----------MOSTRAR LA CANTIDAD DE PRODUCTOS EN EL CARRITO y actulizar el contador con el valor actual de productos-----
    tagCounter.innerHTML = products.length;
    if (products.length) tagCounter.classList.remove('hide-counter-products');
  }

  counterProducts();
  /* ----------------------------------------------------> */

  /* <----CARRITO DE COMPRAS MOSTRAR MODAL CON LISTA DE PRODUCTOS SELECCIONADOS----------------------- */
  function showProductsInCart() {
    const iconCart = document.querySelector('.icon-cart');
    const btnCheckout = document.querySelector('.btn-checkout');

    iconCart.addEventListener('click', () => {
      const modalCard = document.querySelector('.card-basket-products');
      modalCard.classList.toggle('active-card-basket');
      let contenedorUl = document.querySelector('.basket-product');

      if (products.length > 0) {
        contenedorUl.innerHTML = '';
        products.forEach((product) => {
          contenedorUl.innerHTML += showInfo(product);
        });
        console.log(contenedorUl);
        deleteProduct();
      } else {
        btnCheckout.style.display = 'none';
        return (contenedorUl.innerHTML =
          '<p>No hay productos en el carrito</p>');
      }
    });
  }
  showProductsInCart();
  /* ----------------------------------------------------------> */

  // ------------CONTENIDO DE LA LISTA EN EL CARRITO-------
  const showInfo = (product) => {
    return ` <li class="item-product" id=${product.id}>
            <img
            src="./images/image-product-1.jpg"
            alt="zapatos"
            class="buy-product-image"
          />
          <div class="container-info-basket">
            <div class="content-text-basket">
              <span>Fall Limited Edition Sneakers</span>
              <span class="price-product">$125.500</span>
              <span>x 3 <strong>$375.00</strong></span>
            </div>
            
           
            <figure class="container-icon-delete" id=${product.id}>
              <img src="./images/icon-delete.svg" alt="icono de eliminar" />
            </figure>
          </div>
          </li>
       `;
  };
  //----------------------------------------------------------->

  // <-----------ELIMINAR UN PRODUCTO DE LA LISTA DEL CARRITO----------------
  function deleteProduct() {
    console.log('ejecuta funcion');

    let deleteIcon = document.querySelectorAll('.container-icon-delete');

    deleteIcon.forEach((item) => {
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => {
        const getId = item.id;
        let itemLi = document.getElementById(getId);
        itemLi.remove();
        const filterProducts = products.filter(
          (item) => item.id !== parseInt(getId)
        );
        products = filterProducts;
        localStorage.setItem(CART, JSON.stringify(products));
      });
    });
  }

  //------------------------------------------------------------->

  function showProductInCard() {
    //1. capturar el contenedor de todas las cartas de los productos
    const cardProduct = document.querySelector('.container-all-products');

    //2. Traer el array de productos, iterar y generar la estructura HTML con la info de cada prod que es un obj dentro del array, llamar a la funcion debajo para la estructa

    // cardProduct.innerHTML = '';

    productsArr.forEach(
      (prod) => (cardProduct.innerHTML += showInfoEachProduct(prod))
    );

 
  }
  showProductInCard();

  function showInfoEachProduct(product) {
    return ` <article class="only-one-product" id=${product.id}>
          <figure class="card-product">
            <figure>
              <img
                src=${product.image}
                alt="imagen producto"
                class="main-image-product"
              />
            </figure>
            <figure class="container-icons-like">
              <img
                id=${product.id}
                src="./images/heartUnfilled.png"
                alt="corazon sin color"
                class="heart unfilled-heart"
              />
            </figure>
          </figure>
          <a href="/product.html?id=${product.id}" class="info-container">
            <h3 class="main-header">Fall Limited Edition Sneakers</h3>
            <div class="container-prices">
              <div>
                <span class="discount-price">$125.00 </span>
                <span class="full-price">$250.00</span>
              </div>
              <div><span class="percentage"> 50% </span></div>
            </div>
          </a>
        </article>
        `;
  }

  //----------------DAR LIKE O NO A UN PRODUCTO--------------------
  const LIKED_PRODUCTS = 'liked_products';
  let liked = JSON.parse(localStorage.getItem(LIKED_PRODUCTS)) || [];

  function likedProduct() {
    const iconsHeart = document.querySelectorAll('.heart');

    for (const heart of iconsHeart) {
      let heartId = parseInt(heart.id);
      let isLiked = liked.some((ele) => ele.id === heartId);

      if (isLiked) {
        heart.setAttribute('src', './images/heartFilled.png');
      } else {
        heart.setAttribute('src', './images/heartUnfilled.png');
      }

      heart.addEventListener('click', () => {
        if (heart.getAttribute('src') === './images/heartUnfilled.png') {
          heart.setAttribute('src', './images/heartFilled.png');
          stateHeart = './images/heartFilled.png';
          const findProduct = productsArr.find((prod) => prod.id === heartId);
          liked.push(findProduct);
        } else {
          heart.setAttribute('src', './images/heartUnfilled.png');
          liked = liked.filter((item) => item.id !== Number(heartId));
        }
        localStorage.setItem(LIKED_PRODUCTS, JSON.stringify(liked));
      });
    }
  }
  likedProduct();

  //-------------MOSTRAR INFO USER-------------------

  const user = JSON.parse(localStorage.getItem(USER));
  console.log(user);

  function showInfoUser() {
    const nameUser = document.querySelector('.name-user');
    const avatarUser = document.querySelector('.container-image-avatar');
    const modalUser = document.querySelector('.modal-user');
    const closeSesion = document.querySelector('.option-user');

    if (user) {
      nameUser.innerText = `!Hola, ${user.name}`;
      avatarUser.addEventListener('click', () => {
        modalUser.classList.toggle('active-modal-user');
        closeSesion.addEventListener('click', () => {
          console.log('cierra sesion');
          localStorage.removeItem(USER);
          modalUser.style.display = 'none';
          nameUser.style.display = 'none';
        });
      });
    } else {
      nameUser.style.display = 'none';
    }
  }
  showInfoUser();
});
