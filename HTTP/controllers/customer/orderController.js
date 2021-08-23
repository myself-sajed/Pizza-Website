const Order = require('../../../app/models/order')
const moment = require('moment')

function order() {
    return {
        // main checkout page - HTML

        checkout(req, res) {
            res.render('checkout')
        },

        // Place order logic

        postcheckout(req, res) {

            const { name, phone, address } = req.body
            // Validate Request

            if (!name || !phone || !address) {
                req.flash('error', { message: 'All Fields are Mandatory' })
                return res.redirect('/checkout')
            }

            const order = new Order({
                customerId: req.user._id,
                name,
                phone,
                address,
                items: req.session.cart.items
            })

            order.save().then((result) => {
                req.flash('success', { message: 'Order Placed successfully' })
                delete req.session.cart
                return res.redirect('/orders')

            }).catch((err) => {
                req.flash('error', { message: 'Something Went wrong' })
                return res.redirect('/cart')
            })
        },

        // Orders Page - HTML
        async order(req, res) {

            const orders = await Order.find({ customerId: req.user._id },
                null, { sort: { 'createdAt': -1 } })

            res.render('order', { orders: orders, moment: moment })
        },

        async status(req, res) {
            const order = await Order.findById(req.params.id)
            // Authorize user
            if (req.user._id.toString() === order.customerId.toString()) {
                console.log(order);
                return res.render('status', { order: order })
            }
            return res.redirect('/')
        }
    }
}


// Export the factory function

module.exports = order


