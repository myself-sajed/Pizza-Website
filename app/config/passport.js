const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')


function passportInit(passport) {

    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {

        // Check if email exists in db
        const user = await User.findOne({ email: email })
        if (!user) {
            console.log('No User with this email address');
            return done(null, false, { message: 'No User with this email address' })
        }

        bcrypt.compare(password, user.password).then(match => {

            // match is a boolean 
            if (match) {
                console.log('Logged in successfully!');
                return done(null, user, { message: 'Logged in successfully!' })
            }
            console.log('Invalid Email or password');
            return done(null, false, { message: 'Invalid Email or password' })
        }).catch(err => {
            console.log('Something went wrong');
            return done(null, false, { message: 'Something went wrong' })
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })

}


module.exports = passportInit