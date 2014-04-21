/**
 * Created by ELatA on 14-1-26.
 */

var http = require('http');
var express = require('express');
var config = require('./config');

var app = express();
config(app);

var path = require('path');
app.use(express.static(path.join(__dirname, 'www')));


var passport = require('passport');
LocalStrategy = require('passport-local').Strategy;

/*passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));*/
app.use(express.cookieParser('sctalk admin manager'));
app.use(express.session());
var flash = require('connect-flash');
app.use(flash());
app.post('/login',
    passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true })
);

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'passwd'
    },
    function(username, password, done) {
        console.log(username,password,done);
        // ...
    }
));

var server = http.createServer(app);
server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});


