const passport = require("passport");

function orderAuthUser(req, res, next) {

    if (req.isAuthenticated()) {
        return next()
    }

    return res.redirect('/login')

}

module.exports = orderAuthUser