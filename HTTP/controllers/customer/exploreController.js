const menu = require('../../../app/models/menu');


// Controller for writing Explore page logic.
function explore() {
    return {
        async explore(req, res) {
            const pizzas = await menu.find()
            return res.render('explore', { pizzas: pizzas });
        }
    }
}


// Export the factory function

module.exports = explore