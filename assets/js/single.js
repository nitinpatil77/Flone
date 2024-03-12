let singleItemId;
window.onload=()=>{
    singleItemId= JSON.parse(localStorage.getItem("singleItemId"));
    console.log(singleItemId);
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
        let { id, name, price, discount, newP, rating, product_main_img } = product;
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
                        <span>$11.2</span> 
                        <span class="old">$12.45</span>
                    </div>
                    <div class="pro-details-rating-wrap">
                        <div class="pro-details-rating">
                            <i class="bi bi-star"></i>
                            <i class="bi bi-star"></i>
                            <i class="bi bi-star"></i>
                            <i class="bi bi-star"></i>
                            <i class="bi bi-star"></i>
                        </div>
                    </div>
                    <div class="pro-details-list">
                        <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.</p>
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
                            <button> Add To Cart </button>
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
    });
})
.catch((error) => console.log(error));