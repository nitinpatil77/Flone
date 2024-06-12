//global declarations
var products = [];

//checkout function
checkout = () => {
  let grandtotal=0;
  document.getElementById("your-order-middle").innerHTML = products
    .map((item) => {
      
      let { id, name, price, discount, product_main_img, qty, subtotal } = item;
      const discountedPrice = price - price * (discount / 100);

      subtotal = discount ? discountedPrice : price;
      subtotal = (subtotal * qty);
      grandtotal += subtotal; 
      document.getElementById("your-order-total").innerHTML=grandtotal.toFixed(2);
      return `
              <ul>
                  <li class="d-flex justify-content-between">
                            <span class="order-middle-left">${name}</span>
                            <span class="order-price">${subtotal}</span>
                  </li>
              </ul>
               `;
    })
    .join("");
};

//domcontentloader function onload function
document.addEventListener("DOMContentLoaded",()=>{
  
  products= JSON.parse(localStorage.getItem("cartItem")) || [];
  
  if (products.length == 0) {

    document.getElementById("empty-item").style.display = "block";
    document.getElementById("full-fill-item").style.display = "none";
  }
  else {
    document.getElementById("empty-item").style.display = "none";
    checkout(); 
  }

});



