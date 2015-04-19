Router.map( function() {
	this.route('home', {path: '/'} );
	this.route('signup');
	this.route('votes');
	this.route('login');
	this.route('about');
});

Router.onBeforeAction( function(pause) {
	if (!Meteor.userId()) {
		this.render('login');
	} else {
		this.next();
	}},
	{
		only: ['votes']
	}
);

Router.onBeforeAction( function(pause) {
	if (Meteor.userId()) {
		this.render('votes');
	} else {
		this.next();
	}},
	{
		only: ['home']
	}
);