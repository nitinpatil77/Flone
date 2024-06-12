//global area
var cartItem = [];
var WishItem = [];
let productcard;
const singlePage = document.getElementById("singlePage");
const relatedItem = document.getElementById("related-product");

//onload function
window.onload = () => {

    displaySingleProducts();
    cartItems();

}

//addToWish functionality 
async function addToWish(productId) {

    const collection = await fetchData(0, 30);

    collection.forEach((product) => {

        if (product.id == productId) {
            let left = 0;
            let right = WishItem.length - 1;
            let flag = true;

            while (left <= right) {
                let mid = Math.floor((left + right) / 2);

                if (WishItem[mid].id === productId) {

                    flag = flase;
                    break;
                }

                if (WishItem[mid].id < productId) {
                    left = mid + 1;
                }

                else {

                    right = mid - 1;
                }
            }

            if (flag) {

                WishItem.push(product);

            }

        }
    });
    localStorage.setItem("WishItem", JSON.stringify(WishItem));
    WishItems();
}

//function create card wishItems cards
function WishItems() {

    const wishPage = document.getElementById("wishlist");
    WishItem = JSON.parse(localStorage.getItem("WishItem")) || [];
    wishlength = WishItem.length;
    document.getElementById("wishlistLength").innerHTML = wishlength;

    if (wishlength === 0) {
        document.getElementById("empty-list-wish").style.display = "block";
        document.getElementById("full-fill-list-wish").style.display = "none";
    } else {
        document.getElementById("empty-list-wish").style.display = "none";
    }

    wishPage.innerHTML = WishItem
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
                <button onclick="removeItemWish(${id})"><i class="fa fa-times"></i></button>
            </td>
        </tr> 
              `;
        })
        .join("");
}

// remove products from wish
async function removeItemWish(productId) {

    WishItem.forEach((item, i) => {

        if (item.id == productId) {

            WishItem.splice(i, 1);
        }
    });

    localStorage.setItem("WishItem", JSON.stringify(WishItem));
    WishItems();
}

//remove All products from wish
async function removeAllItemWish() {
    WishItem = [];
    localStorage.setItem("WishItem", JSON.stringify(WishItem));
    WishItems();
}

//addTocart functionality add product to cart 
async function addToCart(productId) {

    const collection = await fetchData(0, 30);

    collection.forEach((product) => {

        if (product.id == productId) {

            let left = 0;
            let right = cartItem.length - 1;
            let flag = true;

            while (left <= right) {
                let mid = Math.floor((left + right) / 2);

                if (cartItem[mid].id === productId) {

                    flag = flase;
                    break;
                }

                if (cartItem[mid].id < productId) {
                    left = mid + 1;
                }

                else {

                    right = mid - 1;
                }
            }

            if (flag) {
                cartItem.push(product);
            }
        }
    });
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
    cartItems();
}

// remove products from cart
async function removeItem(productId) {

    cartItem.forEach((item, i) => {

        if (item.id == productId) {

            cartItem.splice(i, 1);
        }
    });

    localStorage.setItem("cartItem", JSON.stringify(cartItem));
    cartItems();
}

//remove All products from cart
async function removeAllItem() {
    cartItem = [];
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
    cartItems();
}

// qty increment 
function increment(id) {
    productJSON = JSON.parse(localStorage.getItem("cartItem")) || [];

    for (let i = 0; i < productJSON.length; i++) {
        if (productJSON[i].id === id) {
            productJSON[i].qty = productJSON[i].qty + 1;
            var subtotal =
                productJSON[i].subtotal +
                productJSON[i].price -
                productJSON[i].price * (productJSON[i].discount / 100);

            productJSON[i].subtotal = Math.floor(subtotal * 100) / 100;

            localStorage.setItem("cartItem", JSON.stringify(productJSON)) || [];
            cartItems();
        }
    }
}

// qty increment 
function decrease(id) {
    productJSON = JSON.parse(localStorage.getItem("cartItem")) || [];
    for (let i = 0; i < productJSON.length; i++) {
        if (productJSON[i].id === id) {
            productJSON[i].qty = productJSON[i].qty - 1;

            var subtotal =
                productJSON[i].subtotal -
                productJSON[i].price +
                productJSON[i].price * (productJSON[i].discount / 100);

            productJSON[i].subtotal = Math.floor(subtotal * 100) / 100;

            localStorage.setItem("cartItem", JSON.stringify(productJSON)) || [];
            cartItems();
        }
    }
}

//function create card cartItem cards
function cartItems() {

    const cartPage = document.getElementById("addcart");
    cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
    cartlength = cartItem.length;
    document.getElementById("cartlength").innerHTML = cartlength;

    if (cartlength === 0) {
        document.getElementById("empty-cart").style.display = "block";
        document.getElementById("full-fill-cart").style.display = "none";
    } else {
        document.getElementById("empty-cart").style.display = "none";
    }

    cartPage.innerHTML = cartItem
        .map((item) => {
            let { id, name, price, discount, product_main_img, qty, subtotal } = item;
            const discountedPrice = price - price * (discount / 100);

            subtotal = discount ? discountedPrice : price;
            subtotal = (subtotal * qty).toFixed(2);

            return `
                  <tr>
                      <td class="product-thumbnail">
                          <a href="#" onclick="singleProduct(${id})">
                              <img class="img-fluid" src="${product_main_img[0]
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

    // Bill Calculation

    var grand_total = 0;
    var sum = 0;

    for (var i = 0; i < cartlength; i++) {
        const discountedPrice =
            cartItem[i].price -
            cartItem[i].price * (cartItem[i].discount / 100);
        cartItem[i].subtotal = cartItem[i].discount ? discountedPrice : cartItem[i].price;
        cartItem[i].subtotal = (cartItem[i].subtotal * cartItem[i].qty).toFixed(2);
        sum += Number(cartItem[i].subtotal);
        grand_total = sum.toFixed(2);
    }

    document.getElementById("grand-total").innerText = grand_total;
    document.getElementById("total-product").innerText = cartlength;

}

//function to fetch data from Api
async function fetchData(start, end) {

    const url = `https://raw.githubusercontent.com/nitinpatil77/JsonData/main/product.json?`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const collection = await response.json();
        return collection.slice(start, end);

    } catch (error) {

        console.error('Error fetching data:', error);

    }

}

// function daily deails for home page
async function daily_deals(start, end) {

    try {

        let dailyDeals = document.getElementById('daily-deals');
        const collection = await fetchData(start, end);

        dailyDeals.innerHTML = collection.map((item) => {
            let { id, name, price, discount, newP, rating, product_main_img } = item;
            const discountedPrice = price - price * (discount / 100);

            return `
        
            <div class="col-xl-3 col-md-6 col-lg-4 col-sm-6">
              <div class="product-card position-relative">
                <div class="product-img">
                    <a href="#" id="" onclick="singleProduct(${id})">
                        <img src="${product_main_img[0]}" alt="product-img" class="default-img">
                        <img src="${product_main_img[1]}" alt="product-img" class="hover-img">
                    </a>
                    <div class="product-img-badges">
                        ${discount
                    ? `<span class="pink">${discount}%</span>`
                    : ""
                }
                        ${newP
                    ? `<span class="purple">${newP}</span>`
                    : ""
                }
                    </div>
                    <div class="product-action d-flex">
                        <div class="pro-same-action pro-wishlist">
                            <button class="" title="Add to wishlist" onclick="addToWish(${id})">
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
                      ${discount ? `<span class="new">$${discountedPrice.toFixed(2)}</span>` : ""
                }    
                      ${discount ? `<span class="old">$${price}</span>` : `<span class="new">$${price}</span>`
                }  
                    </div>
                </div>     
              </div>
            </div>
              `;

        }).join("");

    } catch (error) {

        console.error('Error fetching or rendering data:', error);

    }
}

// function shopPage 
async function shopPage(start, end) {

    var count = 0;

    try {

        let shop = document.getElementById('shopPage');
        const collection = await fetchData(start, end);

        shop.innerHTML = collection.map((item) => {
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
                          ${discount
                    ? `<span class="pink">${discount}%</span>`
                    : ""
                }
                          ${newP
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
                        ${discount ? `<span class="new">$${discountedPrice.toFixed(2)}</span>` : ""
                }    
                        ${discount ? `<span class="old">$${price}</span>` : `<span class="new">$${price}</span>`
                }  
                      </div>
                  </div>     
                </div>
              </div>
                `;

        }).join("");

    } catch (error) {

        console.error('Error fetching or rendering data:', error);
    }
}

//genrate start function 
function generateStars(rating) {

    const filledStars = Math.floor(rating);  //filled star
    const halfStar = rating - filledStars >= 0.5 ? 1 : 0; //half star
    const emptyStars = 5 - filledStars - halfStar; // empty star

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

    return starsHTML; //return all star
}

//searchAndFetch function for search data
async function searchAndFetch(searchKey) {

    let shop = document.getElementById('shopPage');

    const collection = await fetchData(0, 30);

    var data = collection.filter((item) => {

        if (searchKey == "") {

            shopPage(0, 15);

        } else {

            let searchword = item.name.toLowerCase();;

            if (searchword.includes(searchKey)) {

                return item;

            }
        }
    });


    shop.innerHTML = data.map((item) => {
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
                      ${discount
                ? `<span class="pink">${discount}%</span>`
                : ""
            }
                      ${newP
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
                    ${discount ? `<span class="new">$${discountedPrice.toFixed(2)}</span>` : ""
            }    
                    ${discount ? `<span class="old">$${price}</span>` : `<span class="new">$${price}</span>`
            }  
                  </div>
              </div>     
            </div>
          </div>
            `;

    }).join("");
}

//filter products
async function filterProducts(filters) {

    let shop = document.getElementById('shopPage');

    const collection = await fetchData(0, 30);

    let data = [];

    filters.forEach((filter) => {

        collection.forEach((item) => {

            item.Categories.forEach((category) => {

                if (filter.toLowerCase() == "all categories") {

                    shopPage(0, 9);

                } else if (filter.toLowerCase() == category.toLowerCase()) {

                    data.push(item);
                }
            });
        });
    });

    console.log(data);

    var count = 0;

    shop.innerHTML = data.map((item) => {

        let { id, name, price, discount, newP, rating, product_main_img } = item;
        const discountedPrice = price - price * (discount / 100);

        count++;

        return `

          <div class="col-xl-4 col-sm-6">
            <div class="product-card position-relative">
              <div class="product-img">
                  <a href="#" id="" onclick="singleProduct(${id})">
                      <img src="${product_main_img[0]}" alt="product-img" class="default-img">
                      <img src="${product_main_img[1]}" alt="product-img" class="hover-img">
                  </a>
                  <div class="product-img-badges">
                      ${discount
                ? `<span class="pink">${discount}%</span>`
                : ""
            }
                      ${newP
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
                    ${discount ? `<span class="new">$${discountedPrice.toFixed(2)}</span>` : ""
            }    
                    ${discount ? `<span class="old">$${price}</span>` : `<span class="new">$${price}</span>`
            }  
                  </div>
              </div>     
            </div>
          </div>
            `;

    }).join("");
}

//filter products
async function tagProducts(tagList) {

    let shop = document.getElementById('shopPage');

    const collection = await fetchData(0, 30);

    let list = new Set();

    tagList.forEach((tag) => {

        collection.forEach((item) => {

            item.Tags.forEach((tagItem) => {

                if (tagItem.toLowerCase() == tag.toLowerCase()) {

                    list.add(item);
                }
            });

        });

    });

    let data = Array.from([...list]);

    console.log(data);

    shop.innerHTML = data.map((item) => {
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
                      ${discount
                ? `<span class="pink">${discount}%</span>`
                : ""
            }
                      ${newP
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
                    ${discount ? `<span class="new">$${discountedPrice.toFixed(2)}</span>` : ""
            }    
                    ${discount ? `<span class="old">$${price}</span>` : `<span class="new">$${price}</span>`
            }  
                  </div>
              </div>     
            </div>
          </div>
            `;

    }).join("");
}

//function single page 
async function singleProduct(productId) {

    try {

        const collection = await fetchData(0, 30);

        var productcard = collection.find((item) => item.id == productId);

        localStorage.setItem("productcard", JSON.stringify(productcard));

        window.location.href = "single-product.html";

    } catch (error) {

        console.error('Error fetching or rendering data:', error);
    }
}

async function displaySingleProducts() {



    try {

        productcard = JSON.parse(localStorage.getItem("productcard"));

        const discountedPrice = productcard.price - productcard.price * (productcard.discount / 100);

        singlePage.innerHTML = `
            <div class="row">
                <div class="col-lg-6 col-md-6">
                    <div class="product-large-image-wrapper position-relative">
                        <div class="product-img-badges">
                        ${productcard.discount
                ? `<span class="pink">${productcard.discount}%</span>`
                : ""
            }
                        ${productcard.newP
                ? `<span class="purple">${productcard.newP}</span>`
                : ""
            }
                        </div>
                        <div class="swiper-wrap">
                            <div class="single-image"><img src="${productcard.product_main_img[0]}" class="img-fluid" alt=""></div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6">
                    <div class="product-details-content ml-70">
                        <h2>${productcard.name}</h2>
                        <div class="product-details-price">
                         ${productcard.discount ? `<span class="new">$${discountedPrice.toFixed(2)}</span>` : ""
            } 
                          ${productcard.discount ? `<span class="old">$${productcard.price}</span>` : `<span class="new">$${productcard.price}</span>`
            }   
                          
                        </div>
                        <div class="pro-details-rating-wrap">
                            <div class="pro-details-rating">
                                ${generateStars(productcard.rating)}
                            </div>
                        </div>
                        <div class="pro-details-list">
                            <p>${productcard.subDescrption}</p>
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
                            <div class="pro-details-cart btn-hover ms-0">
                                <button onclick="addToCart(${productcard.id})"> Add To Cart </button>
                            </div>
                            <div class="pro-details-wishlist">
                                <button class="" title="Add to wishlist">
                                    <i class="bi bi-suit-heart"></i>
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
        relatedProducts(productcard.Categories);

    } catch (error) {

        console.error('Error fetching or rendering data:', error);
    }
}

//function relatedProducts
async function relatedProducts(relatedCategories) {

    var count = 0;
    var relatedData = [];

    try {

        const collection = await fetchData(0, 30);

        relatedCategories.forEach((item) => {

            collection.forEach(item2 => {

                item2.Categories.forEach((category) => {

                    if (category == item) {

                        if (count == 4) {

                            return;
                        }

                        count++;

                        relatedData.push(item2);

                    }
                })
            })
        })

        relatedItem.innerHTML = relatedData.map((item) => {

            let { id, name, price, discount, newP, rating, product_main_img } = item;
            const discountedPrice = price - price * (discount / 100);

            return `
        
              <div class="col-xl-3 col-md-6 col-lg-4 col-sm-6">
                <div class="product-card position-relative">
                  <div class="product-img">
                      <a href="#" id="" onclick="singleProduct(${id})">
                          <img src="${product_main_img[0]}" alt="product-img" class="default-img">
                          <img src="${product_main_img[1]}" alt="product-img" class="hover-img">
                      </a>
                      <div class="product-img-badges">
                          ${discount
                    ? `<span class="pink">${discount}%</span>`
                    : ""
                }
                          ${newP
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
                        ${discount ? `<span class="new">$${discountedPrice.toFixed(2)}</span>` : ""
                }    
                        ${discount ? `<span class="old">$${price}</span>` : `<span class="new">$${price}</span>`
                }  
                      </div>
                  </div>     
                </div>
              </div>
                `;

        }).join("");

    } catch (error) {

        console.error('Error fetching or rendering data:', error);
    }

}

//display chekout
function displayCheckOut() {

    cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];

    if (cartItem.length > 0) {

        window.location.href = "checkout.html";

    } else {

        window.location.href = "shop.html";
    }
}

//DOMContentLoader event 
document.addEventListener('DOMContentLoaded', () => {

    const pagination = document.querySelectorAll(".pagination li");
    const searchProduct = document.getElementById("serchProduct");
    const result_start = document.getElementById("result-start");
    const result_end = document.getElementById("result-end")
    const checkmarks = document.querySelectorAll(".checkmark");
    const tagsList = document.querySelectorAll("#tags");
    const pagetop = document.getElementById("page-top");
    let filters = new Set();
    let tagList = new Set();

    daily_deals(0, 8); // function use to fetch data into daily deals
    shopPage(0, 9);

    // pagination 
    pagination.forEach((btn) => {

        btn.addEventListener("click", () => {

           pagetop.scrollIntoView({ behavior: "smooth", block: "start" });

            pagination.forEach((btn) => {

                btn.classList.remove("page-active");
            });

            btn.classList.add("page-active");

            let prvnum = btn.innerHTML;
            let num = parseInt(prvnum);
            let end = num * 9;
            let start = end - 9;
            result_start.innerHTML = start;  //showing start results after pagination 
            result_end.innerHTML = end   //showing end results after pagination 
            shopPage(start, end);

        });
    });

    //search product
    searchProduct.addEventListener("keyup", (event) => {

        let searchKeys = event.target.value;
        let searchKey = searchKeys.toLowerCase();
        searchAndFetch(searchKey);
    });

    //filter product
    checkmarks.forEach((checkmark) => {

        checkmark.addEventListener("change", () => {

            pagetop.scrollIntoView({ behavior: "smooth", block: "start" });

            if (checkmark.checked) {

                filters.add(checkmark.value);

            } else {

                filters.delete(checkmark.value);
            }

            if (filters.size === 0) {

                shopPage(0, 15);

            } else {

                filterProducts(filters);
            }

        });

    });

    tagsList.forEach((item) => {

        item.addEventListener("click", () => {
            
            pagetop.scrollIntoView({ behavior: "smooth", block: "start" });

            item.style.color = "white";
            item.style.background = "#a749ff";
            tagList.add(item.innerHTML);

            tagProducts(tagList);
        });

    });
});

WishItems();


//single page increment decrement

/* <div class="cart-plus-minus">
    <button class="dec qtybutton">-</button>
    <input class="cart-plus-minus-box" type="text" readonly="" value="1">
    <button class="inc qtybutton" onclick ="increment(${productcard.id})" id="singlePageInc">+</button>
</div> */



