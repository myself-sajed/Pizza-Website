// Controller for writing Sign up and login page logic.

const User = require('../../../app/models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

function auth() {
    return {
        // Main Page
        login(req, res) {
            res.render('login')
        },

        // Logic for post req in login form
        postlogin(req, res, next) {
            passport.authenticate('local', (err, user, info) => {

                if (err) {
                    req.flash('error', info.message)
                    return next(err)
                }

                if (!user) {

                    req.flash('error', info.message)
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if (err) {

                        req.flash('error', info.message)
                        return next(err)

                    }
                    req.flash('success', `Hello! ${user.name}, You have successfully logged in.`)
                    return res.redirect('/')
                })

            })(req, res, next)
        },

        signup(req, res) {
            res.render('signup')
        },
        async postsignup(req, res) {
            const { name, email, password } = req.body;

            // Check if email id already exist in database
            User.exists({ email: email.toLowerCase() }, (err, result) => {

                if (result) {
                    req.flash('error', 'Sorry, This Email is already registered')
                    return res.redirect('/signup')
                }
            })

            // Before adding password into database, we must hash it
            const hashedPassword = await bcrypt.hash(password, 10)


            const user = new User({
                name,
                email: email.toLowerCase(),
                password: hashedPassword
            })

            user.save().then((user) => {
                // Login
                req.flash('error', 'Registration Successfull')
                return res.redirect('/login')
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/signup')
            })

        },
        logout(req, res) {
            req.logout()
            return res.redirect('/login')
        }
    }
}


// Export the factory function

module.exports = auth