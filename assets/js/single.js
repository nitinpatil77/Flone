let singleItemId;
let addToCart = () => {};

let mainProduct = () => {}; 
window.onload=()=>{
    singleItemId= JSON.parse(localStorage.getItem("singleItemId"));

    let storedCartItems = localStorage.getItem('cartItems');
   
   // If cartItems exist in localStorage, parse it; otherwise, initialize an empty array
   cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
   document.getElementsByClassName("cart")[0].innerHTML = cartItems.length;
}

const apiUrl = "https://raw.githubusercontent.com/nitinpatil77/JsonData/main/product.json";

fetch(apiUrl)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let Api = data; // Assign fetched data to a variable
    console.log(Api.length);
    let singleProduct=[];
    let singlePage = document.getElementById("singlePage");
    var count = 0;
    Api.forEach((product) => {
        let { id, name, price, discount, newP, rating, product_main_img,subDescrption } = product;
        const discountedPrice = price - price * (discount / 100);
        if(id === singleItemId){
            singlePage.innerHTML =`
            <div class="row">
                <div class="col-lg-6 col-md-6">
                    <div class="product-large-image-wrapper position-relative">
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
                        <div class="swiper-wrap">
                            <div class="single-image"><img src="${product_main_img[0]}" class="img-fluid" alt=""></div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6">
                    <div class="product-details-content ml-70">
                        <h2>${name}</h2>
                        <div class="product-details-price">
                         ${
                            discount ?`<span class="new">$${discountedPrice.toFixed(2)}</span>`:""
                          } 
                          ${
                            discount ?`<span class="old">$${price}</span>`:`<span class="new">$${price}</span>`
                          }   
                          
                        </div>
                        <div class="pro-details-rating-wrap">
                            <div class="pro-details-rating">
                                ${generateStars(rating)}
                            </div>
                        </div>
                        <div class="pro-details-list">
                            <p>${subDescrption}</p>
                        </div>
                        <div class="pro-details-size-color d-flex">
                            <div class="pro-details-color-wrap">
                                <span>Color</span>
                                <div class="pro-details-color-content">
                                    <label class="pro-details-color-content--single white">
                                        <input type="radio" name="product-color" value="white" checked="">
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="pro-details-color-content--single black">
                                        <input type="radio" name="product-color" value="black">
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="pro-details-color-content--single brown">
                                        <input type="radio" name="product-color" value="brown">
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                            <div class="pro-details-size">
                                <span>Size</span>
                                <div class="pro-details-size-content">
                                    <label class="pro-details-size-content--single">
                                        <input type="radio" value="x" checked="">
                                        <span class="size-name">x</span>
                                    </label>
                                    <label class="pro-details-size-content--single">
                                        <input type="radio" value="m">
                                        <span class="size-name">m</span>
                                    </label>
                                    <label class="pro-details-size-content--single">
                                        <input type="radio" value="xl">
                                        <span class="size-name">xl</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="pro-details-quality">
                            <div class="cart-plus-minus">
                                <button class="dec qtybutton">-</button>
                                <input class="cart-plus-minus-box" type="text" readonly="" value="1">
                                <button class="inc qtybutton">+</button>
                            </div>
                            <div class="pro-details-cart btn-hover">
                                <button onclick="addToCart(${id})"> Add To Cart </button>
                            </div>
                            <div class="pro-details-wishlist">
                                <button class="" title="Add to wishlist">
                                    <i class="bi bi-suit-heart"></i>
                                </button>
                            </div>
                            <div class="pro-details-compare">
                                <button class="" title="Add to compare">
                                    <i class="bi bi-shuffle"></i>
                                </button>
                            </div>
                        </div>
                        <div class="pro-details-meta d-flex">
                            <span>Categories :</span>
                            <ul>
                                <li><a href="#">fashion</a></li>
                                <li><a href="#">men</a></li>
                            </ul>
                        </div>
                        <div class="pro-details-meta d-flex">
                            <span>Tags :</span>
                            <ul><li><a href="#">fashion</a></li>
                                <li><a href="#">men</a></li>
                                <li><a href="#">jacket</a></li>
                                <li><a href="#">full sleeve</a></li>
                            </ul>
                        </div>
                        <div class="pro-details-social">
                            <ul class="d-flex">
                                <li>
                                    <a href="//facebook.com"><i class="fa-brands fa-facebook-f"></i></a>
                                </li>
                                <li>
                                    <a href="//dribbble.com"><i class="fa-brands fa-dribbble"></i></a>
                                </li>
                                <li>
                                    <a href="//pinterest.com"><i class="fa-brands fa-pinterest-p"></i></a>
                                </li>
                                <li>
                                    <a href="//twitter.com"><i class="fa-brands fa-x-twitter"></i></a>
                                </li>
                                <li>
                                    <a href="//linkedin.com"><i class="fa-brands fa-linkedin-in"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
    
        var cartItems = [];
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

    });
    let cartPage = document.getElementById("related-product");
    var count = 0;
    mainProduct = () => {
      return (cartPage.innerHTML = Api.map((item) => {
        let { id, name, price, discount, newP, rating, product_main_img } = item;
        const discountedPrice = price - price * (discount / 100);

        if (count == 4) {
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