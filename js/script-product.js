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
  /* DESPLEGAR EL MENU Y CERRARLO EN MOBILE */
  const iconMenu = document.querySelector('.container-icon-menu');

  iconMenu.addEventListener('click', () => {
    const menu = document.querySelector('.container-menu');
    menu.classList.add('active-menu');
    console.log(menu);
  });

  const closeIcon = document.querySelector('.container-close-icon');

  closeIcon.addEventListener('click', () => {
    const menu = document.querySelector('.container-menu');
    menu.classList.remove('active-menu');
    console.log(menu);
  });

  /* AUMENTAR O DISMINUIR EL NUMERO DE LA CANTIDAD DE PRODUCTOS */
  const iconPlus = document.querySelector('.icon-plus');
  const iconMinus = document.querySelector('.icon-minus');

  let valor = 0;

  iconPlus.addEventListener('click', () => {
    valor++;
    const number = document.querySelector('.number-product');
    number.innerText = valor;
  });

  iconMinus.addEventListener('click', () => {
    valor--;
    const number = document.querySelector('.number-product');
    number.innerText = valor;
  });

  /* AGREGAR UN PRODUCTO AL CARRITO DE COMPRAS*/

  const CART = 'cart';
  let products = JSON.parse(localStorage.getItem(CART)) || [];
  let generateId = !products.length ? 1 : products[products.length - 1].id + 1;

  const addCartBtn = document.querySelector('.btn-add-cart');
  const tagCounter = document.querySelector('.counter-products');
  tagCounter.innerText = products.length;

  //OCULTAR EL NUMERO QUE MUESTRA LA CANTIDAD DE PRODUCTOS EN EL CARRITO SI ESTE ES CERO
  if (!products.length) {
    tagCounter.classList.add('hide-counter-products');
  }

  addCartBtn.addEventListener('click', () => {
    //const name = document.querySelector('.second-header').innerText;
    let product = {
      id: generateId,
      name: '',
      price: 0,
      description: '',
      image: '',
      liked: false,
    };
    product.id = generateId++;
    // product.name = name;
    products.push(product);
    localStorage.setItem(CART, JSON.stringify(products));
    //-----------MOSTRAR LA CANTIDAD DE PRODUCTOS EN EL CARRITO-----
    tagCounter.innerHTML = products.length;
    if (products.length) tagCounter.classList.remove('hide-counter-products');
  });

  /* ------------OTRA FORMA DE AGREGAR AL CARRITO---------- */
  // addCartBtn.addEventListener('click', ()=>{
  //   if(!products){
  //     products= [prod]
  //     console.log(products)
  //     console.log("ejecita este primer if")
  //   }else{
  //    products.push(prod);
  //    console.log("ejecuta el else")
  //   }

  //   localStorage.setItem(CART, JSON.stringify(products))
  // })

  /* CARRITO DE COMPRAS MOSTRAR MODAL CON LISTA DE PRODUCTOS SELECCIONADOS */
  const iconCart = document.querySelector('.icon-cart');

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
      return (contenedorUl.innerHTML = '<p>No hay productos en el carrito</p>');
    }
  });

  // ------------contenido del producto en la lista del carrito
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

  // -----------ELIMINAR UN PRODUCTO DE LA LISTA DEL CARRITO----------------
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

  //----------------DAR LIKE O NO A UN PRODUCTO--------------------
  const LIKED_PRODUCTS = 'liked_products';
  const liked = JSON.parse(localStorage.getItem(likedProduct)) || [];

  function likedProduct() {
    const heartUnfilled = document.querySelector('.unfilled-heart');
    const heartFilled = document.querySelector('.filled-heart');

    heartUnfilled.addEventListener('click', () => {
      // if(!liked.length){
      //  liked = []
      // }
      heartFilled.classList.add('liked-product');
      heartUnfilled.classList.add('hidden-heart');
    });

    heartFilled.addEventListener('click', () => {
      heartFilled.classList.remove('liked-product');
      heartUnfilled.classList.remove('hidden-heart');
    });
  }
  likedProduct();

  //--------------MODAL DE LAS FOTOS DEL PRODUCTO--------------
  const modalImages = document.querySelector('.slider');
  const containerImages = document.querySelectorAll('.container-image');
  const iconClose = document.querySelector('.container-icon-close');

  containerImages.forEach((image) => {
    if (window.innerWidth >= 1024) {
      image.addEventListener('click', () => {
        console.log('activo el modal');
        modalImages.classList.add('active-modal-products');
      });
      iconClose.addEventListener('click', () => {
        modalImages.classList.remove('active-modal-products');
      });
    }
  });

  //-----------TRAER EL DETALLE DEL PRODUCTO-------------------

  const idProduct = window.location.search.slice(4);

  function getDetailProduct(idProduct) {
    const findProduct = productsArr.find(
      (prod) => prod.id === Number(idProduct)
    );
    console.log('encontre el producto!!🤩', findProduct);
    strutureDetailProduct(findProduct);
  }
  getDetailProduct(idProduct);

  function strutureDetailProduct(product) {
    console.log('dentro de estructura', product);
  }

  //-------------MOSTRAR INFO USER-------------------

  const USER = 'user';
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

  //--------------SLIDER FUNCTION MOBILE-----------------------------
  //1.Guardar url de las imagenes
  const images = [
    './images/image-product-1.jpg',
    './images/image-product-2.jpg',
    './images/image-product-3.jpg',
    './images/image-product-4.jpg',
  ];

  //2.Tener una variable que contenga el indice actual currentIndex
  let currentIndex = 0;

  //3.Capturar los elementos
  const currentImage = document.querySelector('.main-product-sneakers');
  const btnNext = document.querySelector('#btnNext');
  const btnPrev = document.querySelector('#btnPrev');
  

  //4. crear funcion que vaya cambiando la ruta de la imagen segun el index del array
  function changeImage(index) {
    currentImage.src = images[index];
  }

  //5.agregar el evento a los botones quienes envian el indice actual a la funcion changeImage
  btnNext.addEventListener('click',()=>{
    console.log("funciona el evento")
    currentIndex = (currentIndex === images.length-1) ? 0 : currentIndex+1;
    changeImage(currentIndex)
  })

  btnPrev.addEventListener('click', ()=>{
    currentIndex =  (currentIndex === 0) ? images.length-1 : currentIndex-1;
    console.log(currentIndex, "valor prev");
    changeImage(currentIndex)
  })


  //--------------SLIDER FUNCTION DESKTOP -------------------------------
 

  const sliderImage = document.querySelector('.slider-active');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const thumbnails = document.querySelectorAll('.thumbnail');
  

 
 
  function updateSliderImage(index) {
    sliderImage.src = images[index];

  // agrega estilo al la imagen seleccionada 
  thumbnails.forEach((thumbnail) => {
    thumbnail.style.opacity = '1'; 
    thumbnail.style.border = 'none'; 
  });

  thumbnails[index].style.opacity = '0.4';
  thumbnails[index].style.border = '2px solid  hsl(26, 100%, 55%)';
  
  }
  
  prevBtn.addEventListener('click', () => {
    currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    updateSliderImage(currentIndex);
  });

 
  nextBtn.addEventListener('click', () => {
    currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    updateSliderImage(currentIndex);
  });

  //En desktop como muestra las imagenes debajo se añade que tenga un estilo opacity a la imagen que se muestra 
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', (event) => {
      currentIndex = parseInt(event.target.getAttribute('data-index'));
      updateSliderImage(currentIndex);
    });
  });

  

});
