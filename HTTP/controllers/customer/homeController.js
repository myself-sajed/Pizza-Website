// Controller for home page

function home() {
    return {
        home(req, res) {
            res.render('home')
        }
    }
}


// Export the factory function

module.exports = home