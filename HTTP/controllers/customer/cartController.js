// Controller for cart page 
const menu = require('../../../app/models/menu');
const session = require("express-session");
const { json } = require("express")

function cartController() {
    return {
        async cart(req, res) {
            const pizzas = await menu.find()
            return res.render('cart', { pizzas: pizzas });
        },
        sessionUpdate(req, res,) {
            let { pizza } = req.body
            let pizzaj = JSON.parse(pizza)
            console.log(pizza);
            console.log(req.session.cart);
            let cart = req.session.cart
            if (Object.keys(req.session.cart.items).length > 1) {
                delete cart.items[pizzaj._id]
                cart.totalQty = cart.totalQty - 1;
                console.log(typeof cart.totalPrice, typeof pizzaj.price);
                cart.totalPrice = cart.totalPrice - pizzaj.price

                console.log('In more than one and cart', cart);
                return res.render('cart')
            }
            else {
                delete req.session.cart
                return res.render('cart')
            }

        },
        updateCart(req, res) {
            // Logic for updating cart items

            // Creating cart if no cart is exist in session
            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }

            let cart = req.session.cart


            // This will log below kind of object
            // {
            //     _id: '6087d17a734d4d5ca4d97fd2',
            //     name: 'Marinara',
            //     image: 'pizza.jpg',
            //     price: 149,
            //     size: 'Medium'
            //   }

            // Check of item doesnt not exist in cart
            if (!cart.items[req.body._id]) {
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1,
                }
                cart.totalQty = cart.totalQty + 1,
                    cart.totalPrice = cart.totalPrice + req.body.price

            }
            else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
                cart.totalQty = cart.totalQty + 1;
                cart.totalPrice = cart.totalPrice + req.body.price

            }
            return res.json({ Qty: req.session.cart.totalQty })
        }

    }
}


// Export the factory function

module.exports = cartController