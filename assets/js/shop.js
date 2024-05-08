
let mainProduct = () => {}; 
let addToCart = () => {};
let addToWish =()=>{};
let Api;
window.onload=()=>{
  let storedCartItems = localStorage.getItem('cartItems');
   
   // If cartItems exist in localStorage, parse it; otherwise, initialize an empty array
   cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
   document.getElementsByClassName("cart")[0].innerHTML = cartItems.length;
   dailyDeals();
}
const apiUrl = "https://raw.githubusercontent.com/nitinpatil77/JsonData/main/product.json";

let cartPage = document.getElementById("shopPage");
fetch(apiUrl)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
     Api = data; // Assign fetched data to a variable
    searchProduct(Api);
   
    var count = 0;
    mainProduct = () => {
      return (cartPage.innerHTML = Api.map((item) => {
        let { id, name, price, discount, newP, rating, product_main_img } = item;
        const discountedPrice = price - price * (discount / 100);
        return `
        
              <div class="col-xl-4 col-sm-6">
                <div class="product-card position-relative">
                  <div class="product-img">
                      <a href="#" id="" onclick="singleProduct(${id})">
                          <img src="${product_main_img[0]}" alt="product-img" class="default-img">
                          <img src="${product_main_img[1]}" alt="product-img" class="hover-img">
                      </a>
                      <div class="product-img-badges">
                          ${
                            discount
                              ? `<span class="pink">${discount}%</span>`
                              : ""
                          }
                          ${
                            newP
                              ? `<span class="purple">${newP}</span>`
                              : ""
                          }
                      </div>
                      <div class="product-action d-flex">
                          <div class="pro-same-action pro-wishlist">
                              <button class="wishlist" title="Add to wishlist"  onclick="addToWish(${id})">
                                  <i class="fa-regular fa-heart"></i>
                              </button>
                          </div>
                          <div class="pro-same-action pro-cart">
                              <button title="Add to cart" onclick="addToCart(${id})"> 
                                  <i class="bi bi-cart2"></i> Add to cart
                              </button>
                          </div>
                          <div class="pro-same-action pro-quickview">
                              <button title="Quick View">
                                  <i class="bi bi-eye"></i>
                              </button>
                          </div>
                      </div>
                  </div>
                  <div class="product-content text-center">
                      <h3><a href="#" id="" onclick="singleProduct(${id})">${name}</a></h3>
                      <div class="product-rating">
                          ${generateStars(rating)}
                      </div>
                      <div class="product-price">
                        ${
                          discount ?`<span class="new">$${discountedPrice.toFixed(2)}</span>`:""
                        }    
                        ${
                          discount ?`<span class="old">$${price}</span>`:`<span class="new">$${price}</span>`
                        }  
                      </div>
                  </div>     
                </div>
              </div>
                `;
      }).join(""));

    };
    mainProduct();
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
    //  add to wishlist functionality
    var wishItem=[];
     addToWish =( productId)=>{
      // Retrieve cart items from localStorage
      let wishItem = JSON.parse(localStorage.getItem('wishItem')) || [];
       
      document.getElementsByClassName("cart")[0].innerHTML = wishItem.length;
      console.log(wishItem.length);
    
      // Push the selected product to the wishItem array
      wishItem.push(Api.find((item) => item.id === productId));
      
      // Save wishItem back to localStorage
      localStorage.setItem("wishItem", JSON.stringify(wishItem));
      
      // Update the cart count display
      document.getElementsByClassName("wish")[0].innerHTML = wishItem.length;
     }
     console.log(wishItem);
  })
  .catch((error) => console.log(error));

// Rating
function generateStars(rating) {
  const filledStars = Math.floor(rating);
  const halfStar = rating - filledStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - filledStars - halfStar;

  let starsHTML = "";
  for (let i = 0; i < filledStars; i++) {
    starsHTML += `<i class="fa-regular fa-star" style="color: #ffa900;"></i>`;
  }
  if (halfStar) {
    starsHTML += `<i class="fa-regular fa-star-half-alt" style="color: #ffa900;"></i>`;
  }
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += `<i class="far fa-star"></i>`;
  }
  return starsHTML;
}

/*Search Product */
// let filterProduct=JSON.parse(localStorage.getItem('filterProduct')) || [];

function searchProduct(data) {
  let Search=document.getElementById('serchProduct');
    
    Search.addEventListener("input", (event)=>{
      var inputValue = event.target.value;
      console.log(typeof(inputValue));
      let filteredProduct=[];
      for(let i=0; i<data.length; i++){
        if(data[i].Categories[1]===inputValue ){
          filteredProduct.push(data[i]);
          localStorage.setItem('filterProduct',JSON.stringify(filteredProduct));
        }
        else{
          console.log('not found');
        }
      }
    let  Product = () => {
        return (cartPage.innerHTML = filteredProduct.map((item) => {
          let { id, name, price, discount, newP, rating, product_main_img } = item;
          const discountedPrice = price - price * (discount / 100);
  
          // if (count == 8) {
          //   return;
          // }
          // count++;
          return `
          
                <div class="col-xl-4 col-sm-6">
                  <div class="product-card position-relative">
                    <div class="product-img">
                        <a href="#" id="" onclick="singleProduct(${id})">
                            <img src="${product_main_img[0]}" alt="product-img" class="default-img">
                            <img src="${product_main_img[1]}" alt="product-img" class="hover-img">
                        </a>
                        <div class="product-img-badges">
                            ${
                              discount
                                ? `<span class="pink">${discount}%</span>`
                                : ""
                            }
                            ${
                              newP
                                ? `<span class="purple">${newP}</span>`
                                : ""
                            }
                        </div>
                        <div class="product-action d-flex">
                            <div class="pro-same-action pro-wishlist">
                                <button class="" title="Add to wishlist">
                                    <i class="fa-regular fa-heart"></i>
                                </button>
                            </div>
                            <div class="pro-same-action pro-cart">
                                <button title="Add to cart" onclick="addToCart(${id})"> 
                                    <i class="bi bi-cart2"></i> Add to cart
                                </button>
                            </div>
                            <div class="pro-same-action pro-quickview">
                                <button title="Quick View">
                                    <i class="bi bi-eye"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-content text-center">
                        <h3><a href="#" id="" onclick="singleProduct(${id})">${name}</a></h3>
                        <div class="product-rating">
                            ${generateStars(rating)}
                        </div>
                        <div class="product-price">
                          ${
                            discount ?`<span class="new">$${discountedPrice.toFixed(2)}</span>`:""
                          }    
                          <span class="old">$${price}</span>
                        </div>
                    </div>     
                  </div>
                </div>
                  `;
        }).join(""));
  
      };
      Product();

  });
}

// single page product

let singleProduct=(id)=>{
  console.log(id);
    localStorage.setItem('singleItemId',JSON.stringify(id));
    window.location.href='single-product.html';

}

// search products

let search = document.getElementById("serchProduct");

search.addEventListener('change',(e)=>{

   let search_key = e.target.value;

   searchdata(apiUrl);

   async function searchdata(apiUrl ){

      let rowdata = await fetch(apiUrl);

      let data = await rowdata.json();

      Api = data.filter((item)=>{

         if(search_key === ""){

           window.location.reload();

         }else if(search_key === item.name){

             return item;

         }else if(search_key !== ""){
            
             let flag = false;

             item.Categories.forEach( categorie=> {
                 
                if(search_key === categorie){

                    flag = true;
                }
             });

             if(flag == true){

                return item;

             }
         }

      });

      mainProduct();
   }
   
});

function dailyDeals() {
  const apiUrl = "https://raw.githubusercontent.com/nitinpatil77/JsonData/main/product.json";

fetch(apiUrl)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let Api = data; // Assign fetched data to a variable
    let cartPage = document.getElementById("daily-deals");
    var count = 0;
    mainProduct = () => {
      return (cartPage.innerHTML = Api.map((item) => {
        let { id, name, price, discount, newP, rating, product_main_img } = item;
        const discountedPrice = price - price * (discount / 100);

        if (count == 8) {
          return;
        }
        count++;
        return `
        
              <div class="col-xl-3 col-md-6 col-lg-4 col-sm-6">
                <div class="product-card position-relative">
                  <div class="product-img">
                      <a href="#" id="" onclick="singleProduct(${id})">
                          <img src="${product_main_img[0]}" alt="product-img" class="default-img">
                          <img src="${product_main_img[1]}" alt="product-img" class="hover-img">
                      </a>
                      <div class="product-img-badges">
                          ${
                            discount
                              ? `<span class="pink">${discount}%</span>`
                              : ""
                          }
                          ${
                            newP
                              ? `<span class="purple">${newP}</span>`
                              : ""
                          }
                      </div>
                      <div class="product-action d-flex">
                          <div class="pro-same-action pro-wishlist">
                              <button class="" title="Add to wishlist">
                                  <i class="fa-regular fa-heart"></i>
                              </button>
                          </div>
                          <div class="pro-same-action pro-cart">
                              <button title="Add to cart" onclick="addToCart(${id})"> 
                                  <i class="bi bi-cart2"></i> Add to cart
                              </button>
                          </div>
                          <div class="pro-same-action pro-quickview">
                              <button title="Quick View">
                                  <i class="bi bi-eye"></i>
                              </button>
                          </div>
                      </div>
                  </div>
                  <div class="product-content text-center">
                      <h3><a href="#" id="" onclick="singleProduct(${id})">${name}</a></h3>
                      <div class="product-rating">
                          ${generateStars(rating)}
                      </div>
                      <div class="product-price">
                        ${
                          discount ?`<span class="new">$${discountedPrice.toFixed(2)}</span>`:""
                        }    
                        ${
                          discount ?`<span class="old">$${price}</span>`:`<span class="new">$${price}</span>`
                        }  
                      </div>
                  </div>     
                </div>
              </div>
                `;
      }).join(""));

    };
    mainProduct();
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
     
  })
  .catch((error) => console.log(error));
}