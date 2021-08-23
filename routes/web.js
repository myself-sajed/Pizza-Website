// 1. Importing explore controller
let exploreController = require('../HTTP/controllers/customer/exploreController')()

// 2. Importing auth controller
let authController = require('../HTTP/controllers/customer/authController')()

// 3. Importing home controller
let homeController = require('../HTTP/controllers/customer/homeController')()

// 4. Importing cart controller 
let cartController = require('../HTTP/controllers/customer/cartController')()

// 4. Importing order controller 
let orderController = require('../HTTP/controllers/customer/orderController')()

// 5. Importing admin controller 
let adminController = require('../HTTP/controllers/admin/adminController')()

// Middlewares

// 1. Importing Middleware to restrict authenticated user to go on Login and signup page.
let loginAuthUser = require('../HTTP/middlewares/guest')

// 2. Importing Middleware to restrict unauthenticated user to go on Orders page.
let orderAuthUser = require('../HTTP/middlewares/orderAuthUser')

// 2. Importing Middleware to restrict unauthenticated user to go on Orders page.
let adminAuthUser = require('../HTTP/middlewares/adminAuthUser')


function intiRoutes(app) {

    // Customer routes
    app.get('/', homeController.home)
    app.get('/explore', exploreController.explore)
    app.get('/cart', cartController.cart)
    app.post('/update-cart', cartController.updateCart)
    app.get('/login', loginAuthUser, authController.login)
    app.post('/login', authController.postlogin)
    app.get('/signup', loginAuthUser, authController.signup)
    app.post('/signup', authController.postsignup)
    app.post('/logout', authController.logout)
    app.get('/checkout', orderController.checkout)
    app.post('/checkout', orderController.postcheckout)
    app.get('/orders', orderAuthUser, orderController.order)
    app.post('/deletePizza', cartController.sessionUpdate)

    // Admin routes
    app.get('/admin/dashboard', adminAuthUser, adminController.index)
    app.post('/admin/dashboard', adminController.status)

    // Status route
    app.get('/orders/status/:id', orderController.status)


}

module.exports = intiRoutes