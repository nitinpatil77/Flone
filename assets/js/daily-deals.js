
let mainProduct = () => {}; 
let addToCart = () => {};
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
                      <a href="#" id="">
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
                      <h3><a href="#" id="">${name}</a></h3>
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
    mainProduct();
    var cartItems = [];
    addToCart = (productId) => {
      console.log("click");
      cartItems.push(Api.find((item) => item.id === productId));
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      document.getElementsByClassName("cart")[0].innerHTML = cartItems.length;
    };
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

/*let mainProduct = () => {}; // Initialize with an empty function

window.onload = () => {
  mainProduct();
};

var Api = [];

fetch(
  "https://raw.githubusercontent.com/nitinpatil77/JsonData/main/product.json"
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    Api = data; // Assign fetched data to a variable

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
                      <a href="#" id="">
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
                      <h3><a href="#" id="">${name}</a></h3>
                      <div class="product-rating">
                          ${generateStars(rating)}
                      </div>
                      <div class="product-price">
                          <span class="new">$${discountedPrice.toFixed(2)}</span> 
                          <span class="old">$${price}</span>
                      </div>
                  </div>     
                </div>
              </div>
                `;
      }).join(""));
    };
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

var cartItems = [];

function addToCart(productId) {
  console.log("click");
  cartItems.push(Api.find(item => item.id === productId));
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  document.getElementsByClassName("cart")[0].innerHTML = cartItems.length;
}
*/