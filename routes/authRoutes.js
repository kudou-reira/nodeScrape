const passport = require('passport');

module.exports = (app) => {
	app.get('/auth/google', 
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	//both use passport.authenticate('google'), but the one below does other stuff

	app.get('/auth/google/callback', passport.authenticate('google'))

	app.post('/login', passport.authenticate('local', {
	  failureRedirect: '/login'
	}), (req, res) => {
	  // You can also redirect here but I'm still building out my app
	  // REDIRECT
	  console.log(req)
	  res.send({ message: 'success' });
	});

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.send(req.user);
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
}
