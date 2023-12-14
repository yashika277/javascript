{/* <script src="./product.js"></script> */ }

const products = [
  {
    id: 0,
    title: "NIKE SHOES",
    imgSrc: "img/product1.jpg",
    price: 79.55,
    productNumber: 1,
  },
  {
    id: 1,
    title: "BACKPACK",
    imgSrc: "img/product2.jpg",
    price: 59.55,
    productNumber: 1,
  },
  {
    id: 2,
    title: "METAL BOTTLE",
    imgSrc: "img/product3.jpg",
    price: 29.5,
    productNumber: 1,
  },
  {
    id: 3,
    title: "SUNGLASSES",
    imgSrc: "img/product4.jpg",
    price: 10.55,
    productNumber: 1,
  },
  {
    id: 4,
    title: "PS5 CONTROLLER",
    imgSrc: "img/product5.jpg",
    price: 105.55,
    productNumber: 1,
  },
  {
    id: 5,
    title: "GALAXY Z FOLD",
    imgSrc: "img/product6.jpg",
    price: 1400.55,
    productNumber: 1,
  },
  {
    id: 6,
    title: "NOKON CAMERA",
    imgSrc: "img/product7.jpg",
    price: 1700.55,
    productNumber: 1,
  },
  {
    id: 7,
    title: "APPLE WATCH",
    imgSrc: "img/product8.jpg",
    price: 110.55,
    productNumber: 1,
  },
  {
    id: 8,
    title: "IPHONE 14",
    imgSrc: "img/ip1.webp",
    price: 1900.55,
    productNumber: 1,
  },
  {
    id: 9,
    title: "Tshirt",
    imgSrc: "img/1.jpg",
    price: 10.55,
    productNumber: 1,
  },
  {
    id: 10,
    title: "Top",
    imgSrc: "img/2.webp",
    price: 20.55,
    productNumber: 1,
  },
  {
    id: 11,
    title: "Tshirt-2",
    imgSrc: "img/3.jpg",
    price: 30.55,
    productNumber: 1,
  },
  {
    id: 12,
    title: "Top-2",
    imgSrc: "img/4.webp",
    price: 110.55,
    productNumber: 1,
  },
  {
    id: 13,
    title: "black-shirt",
    imgSrc: "img/5.jpg",
    price: 90.55,
    productNumber: 1,
  },
  {
    id: 14,
    title: "white-shirt",
    imgSrc: "img/6.jpg",
    price: 90.55,
    productNumber: 1,
  },
  {
    id: 15,
    title: "t-shirt",
    imgSrc: "img/8.jpg",
    price: 90.55,
    productNumber: 1,
  },
  {
    id: 16,
    title: "short",
    imgSrc: "img/9.jpg",
    price: 90.55,
    productNumber: 1,
  },
  {
    id: 17,
    title: "long-slv",
    imgSrc: "img/10.jpg",
    price: 90.55,
    productNumber: 1,
  },
  {
    id: 18,
    title: "tshirt",
    imgSrc: "img/11.jpg",
    price: 90.55,
    productNumber: 1,
  },
  {
    id: 13,
    title: "black-tshirt",
    imgSrc: "img/12.jpg",
    price: 90.55,
    productNumber: 1,
  },
]




// console.log(products, "products");
const productEle = document.querySelector(".shop-content");
let iconCart = document.querySelector('.cart-icon');
let cart_item = document.querySelector('.cart-items');
let closeCart = document.querySelector('.close');
const body = document.querySelector("body");
const subTotal=document.querySelector('.subtotal');

iconCart.addEventListener('click', () =>{
  body.classList.toggle('showCart');
});

closeCart.addEventListener('click', () =>{
  body.classList.toggle('showCart');
});




const randerProduct = () => {
  products.map((val) => {
    console.log(val);

    productEle.innerHTML +=
      `
              <div class="item">
              <div class="img-box">
              <img src="${val.imgSrc}" alt="${val.title}">
          </div>
          <h2 class="pr-title">${val.title}</h2>
          <div class="price">${val.price}</div>
          <button class="addCart" onclick="addToCart(${val.id})">add to cart</button>
          </div>
       `

  });
  const productstring = JSON.stringify(products);
    localStorage.setItem("products", productstring);

    const storedString = localStorage.getItem("products");
    const retrive = JSON.parse(storedString)

    console.log(retrive);
}
randerProduct();



// let cart=[];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const addToCart = (id) =>{
  //check product already exist in cart
  if(cart.some((item) => item.id === id)){
      changeUnitNum('plus', id);
  }
  else{
      const item = products.find((products) => products.id === id);
      cart.push(item);
      console.log(cart);
  }

  updateCart();
  
}

const updateCart = ()=>{
  randerCartitem();
  randersubtotal();
  
  localStorage.setItem("CART", JSON.stringify(cart));
}

const randerCartitem = () =>{
  cart_item.innerHTML = "";     //clear cart element
  cart.map((item, ind) =>{   
    cart_item.innerHTML += `
  <div class="cart-item">
          <div class="item-info" onclick="remove(${item.id})">
              <img src="${item.imgSrc}" alt="${item.title}">
              <h4>${item.title}</h4>
          </div>
          <div class="unit-price">
              <small>$</small>${item.price}
          </div>
          <div class="units">
              <div class="btn minus" onclick="changeUnitNum('minus', ${item.id})">-</div>
              <div class="number">${item.productNumber}</div>
              <div class="btn plus" onclick="changeUnitNum('plus', ${item.id})">+</div>           
          </div>
      </div>`
  }); 
};

const changeUnitNum = (action, id) =>{
  
   cart = cart.map((item)=>{
      
      let productNumber = item.productNumber;
      if(item.id === id){
      
      if(action === 'minus' && productNumber > 1){
          productNumber--;
      }
      else if(action === 'plus' && productNumber < 15){
          productNumber++;
      }
      
  }
   return {
      ...item,
      productNumber,
   };       
  });
  updateCart();
}
const randersubtotal = () => {
  let totalPrice = 0, totalItem = 0;
  cart.map((item) =>{
      totalPrice += item.price * item.productNumber;
      totalItem += item.productNumber;
  });
  
  // iconCartSpan.innerText = totalItem;   
  
  subTotal.innerHTML=
  `
  Subtotal <br> (${totalItem} items): <br> <span class="a-price-symbol">₹</span>${totalPrice.toFixed(2)}
  `
   
};

const remove = (id) => {
 cart = cart.filter((item) => item.id !== id);
 updateCart();      
      
}
// localStorage.clear();

