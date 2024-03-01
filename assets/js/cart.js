var productJSON = [];

window.onload = () => {
    productJSON = JSON.parse(localStorage.getItem('cartItems')) || []; 
     // if there is no data in local storage its return empty array

     
    if(productJSON.length===0){
        document.getElementById('empty-cart').style.display='block';
        document.getElementById('full-fill-cart').style.display='none';
    }
    else{
        document.getElementById('empty-cart').style.display='none';
        // load cart
        addtocartPage();
        document.getElementsByClassName('cart')[0].innerHTML = productJSON.length;
    }

}

addtocartPage=()=> {
    const cartPage = document.getElementById('addcart');
    cartPage.innerHTML = productJSON.map((item) => {
        let { id, name, price, discount, newP, rating, product_main_img } = item;
        const discountedPrice = price - price * (discount / 100);
        return `
            <tr>
                <td class="product-thumbnail">
                    <a href="#">
                        <img class="img-fluid" src="${product_main_img[0]}" alt="">
                    </a>
                </td>
                <td class="product-name">
                    <a href="#">${name}</a>
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
                    <div class="cart-plus-minus">
                        <button class="dec qtybutton">-</button>
                        <input class="cart-plus-minus-box" type="text" readonly="" value="1">
                        <button class="inc qtybutton">+</button>
                    </div>
                </td>
                <td class="product-subtotal">$${discountedPrice.toFixed(2)}</td>
                <td class="product-remove">
                    <button onclick="removeItem()"><i class="fa fa-times"></i></button>
                </td>
            </tr>
        `;
    }).join('');
}
// subtotal


// remove item
let removeItem = (index) => {

    productJSON.splice(index, 1);
    document.getElementsByClassName('cart')[0].innerHTML = productJSON.length;
    //new data set on local storage
    localStorage.setItem('cartItems', JSON.stringify(productJSON)) || [];
    if(productJSON.length===0){
        document.getElementById('empty-cart').style.display='block';
        document.getElementById('full-fill-cart').style.display='none';
    }
    else{
        addtocartPage();
    }
}

