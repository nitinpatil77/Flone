var productJSON = [];

window.onload = () => {
  productJSON = JSON.parse(localStorage.getItem("cartItems")) || [];
  
  var len = productJSON.length;
  console.log(len);

  /* Bill Calculation */
  var grand_total = 0;
  var sum = 0;

  for (var i = 0; i < len; i++) {
    const discountedPrice =
      productJSON[i].price -
      productJSON[i].price * (productJSON[i].discount / 100);
     productJSON[i].subtotal = productJSON[i].discount ? discountedPrice : productJSON[i].price;
     productJSON[i].subtotal = ( productJSON[i].subtotal * productJSON[i].qty).toFixed(2);
    sum += Number(productJSON[i].subtotal);
    grand_total = sum.toFixed(2);
  }

  document.getElementById("grand-total").innerText = grand_total;
  document.getElementById("total-product").innerText = len;
  localStorage.setItem("cartItems", JSON.stringify(productJSON)) || [];

  /*Bill Calculation end*/
  
  /*Upadted json */
  productJSON = JSON.parse(localStorage.getItem("cartItems")) || [];
  if (len === 0) {
    document.getElementById("empty-cart").style.display = "block";
    document.getElementById("full-fill-cart").style.display = "none";
  } else {
    document.getElementById("empty-cart").style.display = "none";
    addtocartPage();
    document.getElementsByClassName("cart")[0].innerHTML = productJSON.length;
  }
};

addtocartPage = () => {
  const cartPage = document.getElementById("addcart");
  cartPage.innerHTML = productJSON
    .map((item) => {
      let { id, name, price, discount, product_main_img, qty, subtotal } = item;
      const discountedPrice = price - price * (discount / 100);

      subtotal = discount ? discountedPrice : price;
      subtotal = (subtotal * qty).toFixed(2);

      return `
              <tr>
                  <td class="product-thumbnail">
                      <a href="#" onclick="singleProduct(${id})">
                          <img class="img-fluid" src="${
                            product_main_img[0]
                          }" alt="">
                      </a>
                  </td>
                  <td class="product-name">
                      <a href="#" onclick="singleProduct(${id})">${name}</a>
                      <div class="cart-item-variation">
                          <span>Color: white</span>
                          <span>Size: x</span>
                      </div>
                  </td>
                  <td class="product-price-cart">
                    <span class="amount old">$${price}</span>
                    <span class="amount">$${discountedPrice.toFixed(2)}</span>
                  </td>
                  <td class="product-quantity">
                      <div class="cart-plus-minus d-flex align-items-center justify-content-center">
                          <button class="dec qtybutton" onclick="decrease(${id})">-</button>
                          <span class="cart-plus-minus-box " id="qty">${qty}</span>
                          <button class="inc qtybutton" onclick="increment(${id})">+</button>
                      </div>
                  </td>
                  <td class="product-subtotal">$${subtotal}</td>
                  <td class="product-remove">
                      <button onclick="removeItem(${id})"><i class="fa fa-times"></i></button>
                  </td>
              </tr>
          `;
    })
    .join("");
};

// subtotal

// remove item
let removeItem = (index) => {
  window.location.reload();
  productJSON = JSON.parse(localStorage.getItem("cartItems")) || [];

  for (let i = 0; i < productJSON.length; i++) {
    if (productJSON[i].id === index) {
      productJSON.splice(i, 1);
      document.getElementsByClassName("cart")[0].innerHTML = productJSON.length;
      //new data set on local storage
      localStorage.setItem("cartItems", JSON.stringify(productJSON)) || [];
      if (productJSON.length === 0) {
        document.getElementById("empty-cart").style.display = "block";
        document.getElementById("full-fill-cart").style.display = "none";
      } else {
        addtocartPage();
      }
    }
  }
};

// remove all product

let removeAllItem = () => {
  productJSON = JSON.parse(localStorage.getItem("cart")) || [];
  productJSON = [];
  localStorage.setItem("cartItems", JSON.stringify(productJSON)) || [];
  document.getElementsByClassName("cart")[0].innerHTML = productJSON.length;
  if (productJSON.length === 0) {
    document.getElementById("empty-cart").style.display = "block";
    document.getElementById("full-fill-cart").style.display = "none";
  } else {
    addtocartPage();
  }
};

// qty calculation

function increment(id) {
  productJSON = JSON.parse(localStorage.getItem("cartItems")) || [];

  for (let i = 0; i < productJSON.length; i++) {
    if (productJSON[i].id === id) {
      productJSON[i].qty = productJSON[i].qty + 1;
      var subtotal =
        productJSON[i].subtotal +
        productJSON[i].price -
        productJSON[i].price * (productJSON[i].discount / 100);

      productJSON[i].subtotal = Math.floor(subtotal * 100) / 100;

      localStorage.setItem("cartItems", JSON.stringify(productJSON)) || [];
      window.location.reload();
      addtocartPage();
    }
  }
}

function decrease(id) {
  productJSON = JSON.parse(localStorage.getItem("cartItems")) || [];
  for (let i = 0; i < productJSON.length; i++) {
    if (productJSON[i].id === id) {
      productJSON[i].qty = productJSON[i].qty - 1;

      var subtotal =
        productJSON[i].subtotal -
        productJSON[i].price +
        productJSON[i].price * (productJSON[i].discount / 100);

      productJSON[i].subtotal = Math.floor(subtotal * 100) / 100;

      localStorage.setItem("cartItems", JSON.stringify(productJSON)) || [];
      window.location.reload();
      addtocartPage();
    }
  }
}

// 

let checkoutbtn=document.getElementById('Checkout-btn');

checkoutbtn.addEventListener('click',()=>{
  var currentUser = JSON.parse(localStorage.getItem('currentUser')) || [];
      if(currentUser.length>0){
        window.location.href='checkout.html';
      }
      else{
        window.location.href='login-register.html';
      }
})

// single page product

let singleProduct=(id)=>{
  console.log(id);
    localStorage.setItem('singleItemId',JSON.stringify(id));
    window.location.href='single-product.html';

}