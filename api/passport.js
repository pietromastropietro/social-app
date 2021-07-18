const User = require("./models/User");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
    passport.use(
        new LocalStrategy((email, password, done) => {
            User.findOne({ email: email }, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    console.log('wrong username');
                    return done(null, false, { message: "Incorrect username" });
                }
                if (user.password !== password) {
                    console.log('wrong pass');
                    return done(null, false, { message: "Incorrect password" });
                }
                return done(null, user);
            });
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};