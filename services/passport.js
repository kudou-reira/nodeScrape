const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy;

const keys = require('../config/keys.js');

const User = mongoose.model('users');

//get 'user' from done(null, user)
passport.serializeUser((user, done) => {
	//the user.id is not the profile id
	//the user.id is the "_id" in mongo database
	done(null, user.id);
})

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then((user) => {
			done(null, user);
		});
})

passport.use(
	new GoogleStrategy({
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	}, 
	(accessToken, refreshToken, profile, done) => {
		// console.log('access token', accessToken);
		// console.log('refresh token', refreshToken);
		// console.log('profile:', profile);
		User.findOne({ googleId: profile.id })
			.then((existingUser) => {
				if(existingUser){
					done(null, existingUser);
				}
				else {
					//saving User is async
					new User({ googleId: profile.id })
						.save()
						.then(user => done(null, user));
				}
			});
	})
);

passport.use(
	new LocalStrategy(
		async (username, password, done) => {
			let user = await User.findOne({ username });
			if (!user) {
				return done(null, false);
			}
			// TODO Change to test against bcrypt password
			if (user.password != password) {
				return done(null, false);
			}
			return done(null, user);
    	}
    )
);