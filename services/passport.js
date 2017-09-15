const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const keys = require('../config/keys.js');

const User = mongoose.model('users');
const Profile = mongoose.model('profile');

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
		callbackURL: '/auth/google/callback',
		proxy: true
	}, 
	(accessToken, refreshToken, profile, done) => {
		// console.log('access token', accessToken);
		// console.log('refresh token', refreshToken);
		// console.log('profile:', profile);
		// console.log('email:', profile.emails[0].value)
		// console.log('display name:', profile.displayName)
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

					Profile.findOne({ email: profile.emails[0].value })
						.then((existingEmail) => {
							if(existingEmail){
								console.log("email exists!");
								done(null, existingEmail)
							}

							else{
								new Profile({
									name: profile.displayName,
									email: profile.emails[0].value
								})
									.save()
									.then(profile => done(null, profile))
							}
						})
					
				}
			});
	})
);

//	    profileFields:['id','displayName','emails']

passport.use(
	new FacebookStrategy({
	    clientID: keys.facebookClientID,
	    clientSecret: keys.facebookClientSecret,
	    callbackURL: '/auth/facebook/callback',
	    profileFields: ['email', 'id', 'displayName'],
	    proxy: true
    }, 
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ facebookId: profile.id })
			.then((existingUser) => {
				if(existingUser){
					done(null, existingUser);
				}
				else {
					new User({ facebookId: profile.id })
						.save()
						.then(user => done(null, user));

					Profile.findOne({ email: profile.emails[0].value })
						.then((existingEmail) => {
							if(existingEmail){
								console.log("email exists!");
								done(null, existingEmail)
							}

							else{
								new Profile({
									name: profile.displayName,
									email: profile.emails[0].value
								})
									.save()
									.then(profile => done(null, profile))
							}
						})
				}
			});
    }
));

passport.use(
	new TwitterStrategy({
	    consumerKey: keys.twitterClientID,
	    consumerSecret: keys.twitterClientSecret,
	    callbackURL: '/auth/twitter/callback',
	    includeEmail: true,
	    proxy: true
    }, 
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ twitterId: profile.id })
			.then((existingUser) => {
				if(existingUser){
					done(null, existingUser);
				}
				else {
					new User({ twitterId: profile.id })
						.save()
						.then(user => done(null, user));

					Profile.findOne({ email: profile.emails[0].value })
						.then((existingEmail) => {
							if(existingEmail){
								console.log("email exists!");
								done(null, existingEmail)
							}

							else{
								new Profile({
									name: profile.displayName,
									email: profile.emails[0].value
								})
									.save()
									.then(profile => done(null, profile))
							}
						})
				}
			});
    }
));


// passport.use(
// 	new LocalStrategy(
// 		async (username, password, done) => {
// 			let user = await User.findOne({ username });
// 			if (!user) {
// 				return done(null, false);
// 			}
// 			// TODO Change to test against bcrypt password
// 			if (user.password != password) {
// 				return done(null, false);
// 			}
// 			return done(null, user);
//     	}
//     )
// );