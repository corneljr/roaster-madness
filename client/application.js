Meteor.startup(function() {
	Session.set('countdown', new Date());

	Meteor.setInterval(function() {
		var date = new Date();
		Session.set('countdown', date);
	}, 500);
});

Template.body.events({
	"click #logout": function(event) {
		Meteor.logout(function(error) {
			if (error) {
				alert(error.reason);
			} else {
				Router.go('/');
			}
		});
	}
});