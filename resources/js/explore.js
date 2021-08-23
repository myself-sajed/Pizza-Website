// Import Axios for making HTTP reqs
import axios from 'axios';
import Noty from 'noty';
import { initCart } from './cart'



// Getting array of buttons
let addToCartButtonArray = document.querySelectorAll('.add-to-cart')
let cartCounter = document.getElementById('cartCounter')




// Function for updating cart 
function updateCart(pizza) {
    axios.post('/update-cart', pizza).then(res => {

        cartCounter.innerText = res.data.Qty
        new Noty({
            type: 'success',
            timeout: 1000,
            text: "Item Added to Cart"
        }).show();

    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: "Error Adding to Cart"
        }).show();
    })
}

addToCartButtonArray.forEach(btn => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza);

        // Update Cart after click vy using this function
        updateCart(pizza);
    })
})

initCart()

