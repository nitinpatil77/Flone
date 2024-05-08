var productJSON = [];

window.onload = () => {
  productJSON = JSON.parse(localStorage.getItem("wishItem")) || [];
  
  var len = productJSON.length;
  console.log(len);


 /* Bill Calculation */
 var grand_total = 0;
 var sum = 0;

 for (var i = 0; i < len; i++) {
   const discountedPrice =
     productJSON[i].price -
     productJSON[i].price * (productJSON[i].discount / 100);

 }

 localStorage.setItem("cartItems", JSON.stringify(productJSON)) || [];

 /*Bill Calculation end*/
  
  /*Upadted json */
  productJSON = JSON.parse(localStorage.getItem("wishItem")) || [];
  if (len === 0) {
    document.getElementById("empty-list").style.display = "block";
    document.getElementById("full-fill-list").style.display = "none";
  } else {
    document.getElementById("empty-list").style.display = "none";
    addtocartPage();
    document.getElementsByClassName("wish")[0].innerHTML = productJSON.length;
  }
};

addtocartPage = () => {
  const cartPage = document.getElementById("wishlist");
  cartPage.innerHTML = productJSON
    .map((item) => {
      let { id, name, price, discount, product_main_img, qty, subtotal } = item;
      const discountedPrice = price - price * (discount / 100);

      subtotal = discount ? discountedPrice : price;
      subtotal = (subtotal * qty).toFixed(2);

      return `
            <tr>
                <td class="product-thumbnail">
                    <a href="/product/3">
                        <img class="img-fluid"
                            src="${product_main_img[0]}" alt="">
                        </a>
                    </td>
                <td class="product-name text-center">
                    <a href="/product/3">${name}</a>
                </td>
                <td class="product-price-cart">
                    <span class="amount old">${price}</span>
                    <span class="amount">${discount}</span>
                </td>
                <td class="product-wishlist-cart">
                    <button class="active" title="Added to cart"
                        onclick="addToCart(${id})">Added to cart</button>
                </td>
                <td class="product-remove">
                    <button><i class="fa fa-times"></i></button>
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
  productJSON = JSON.parse(localStorage.getItem("wishlist")) || [];

  for (let i = 0; i < productJSON.length; i++) {
    if (productJSON[i].id === index) {
      productJSON.splice(i, 1);
      document.getElementsByClassName("cart")[0].innerHTML = productJSON.length;
      //new data set on local storage
      localStorage.setItem("wishlist", JSON.stringify(productJSON)) || [];
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
  productJSON = JSON.parse(localStorage.getItem("wishlist")) || [];
  productJSON = [];
  localStorage.setItem("wishlist", JSON.stringify(productJSON)) || [];
  document.getElementsByClassName("wish")[0].innerHTML = productJSON.length;
  if (productJSON.length === 0) {
    document.getElementById("empty-list").style.display = "block";
    document.getElementById("full-fill-list").style.display = "none";
  } else {
    addtocartPage();
  }
};

// qty calculation


// single page product

let singleProduct=(id)=>{
  console.log(id);
    localStorage.setItem('singleItemId',JSON.stringify(id));
    window.location.href='single-product.html';

}


var cartItems = [];
// add to cart functionality
addToCart = (productId) => {
  // Retrieve cart items from localStorage
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
   
  document.getElementsByClassName("cart")[0].innerHTML = cartItems.length;
  console.log(cartItems.length);

  // Push the selected product to the cartItems array
  cartItems.push(Api.find((item) => item.id === productId));
  
  // Save cartItems back to localStorage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  
  // Update the cart count display
  document.getElementsByClassName("cart")[0].innerHTML = cartItems.length;
 };
 