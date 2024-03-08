var productJSON = [];
window.onload = () => {
    productJSON = JSON.parse(localStorage.getItem("cartItems")) || [];
 
    var len = productJSON.length;
     if(len === 0) {
        document.getElementById("empty-item").style.display = "block";
        document.getElementById("full-fill-item").style.display = "none";
      } 
      else {
        document.getElementById("empty-item").style.display = "none";
        document.getElementsByClassName("cart")[0].innerHTML = productJSON.length;
      }
}
