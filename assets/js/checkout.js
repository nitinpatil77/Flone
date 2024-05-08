var productJSON = [];
let checkout = () => { };
window.onload = () => {
  productJSON = JSON.parse(localStorage.getItem("cartItems")) || [];

  var len = productJSON.length;
  if (len === 0) {
    document.getElementById("empty-item").style.display = "block";
    document.getElementById("full-fill-item").style.display = "none";
  }
  else {
    document.getElementById("empty-item").style.display = "none";
    checkout();
    check();
    document.getElementsByClassName("cart")[0].innerHTML = productJSON.length;
  }
}
checkout = () => {
  document.getElementById("your-order-middle").innerHTML = productJSON
    .map((item) => {
      let { id, name, price, discount, product_main_img, qty, subtotal } = item;
      const discountedPrice = price - price * (discount / 100);

      subtotal = discount ? discountedPrice : price;
      subtotal = (subtotal * qty).toFixed(2);
      return `
              <ul>
                  <li class="d-flex justify-content-between">
                            <span class="order-middle-left">${name}</span>
                            <span class="order-price">${discountedPrice}</span>
                  </li>
              </ul>
               `;
    })
    .join("");
};

var check = () => {
  let grandtotal = 0; // Initialize grandtotal
  
  productJSON.forEach((item) => {
    let { price, discount, qty } = item;
    const discountedPrice = price - price * (discount / 100);
    const subtotal = discount ? discountedPrice * qty : price * qty;
    grandtotal += subtotal; // Accumulate subtotal to grandtotal
  });

  // Display grandtotal in the HTML
  document.getElementById("your-order-total").innerHTML = `
    <ul class="d-flex justify-content-between">
      <li class="order-total">Total</li>
      <li>${grandtotal.toFixed(2)}</li>
    </ul>`;
};


