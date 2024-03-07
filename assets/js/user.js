window.onload=()=>{
    let storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    console.log(storedCartItems);
    // If cartItems exist in localStorage, parse it; otherwise, initialize an empty array
    cartItems = storedCartItems;
    document.getElementsByClassName("cart")[0].innerHTML = cartItems.length;

    var currentUser = JSON.parse(localStorage.getItem('currentUser')) || [];
  

}