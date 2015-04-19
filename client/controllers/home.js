Template.home.helpers({
	userCount: function() {
		return Meteor.users.find().count();
	},
	countdown: function() {
		var today = moment(Session.get('countdown').toString());
		var start = moment("06/01/2015");
		days = start.diff(today, 'days');
		hours = start.diff(today, 'hours') - (days * 24);
		minutes = start.diff(today, 'minutes') - (start.diff(today, 'hours') * 60);
		seconds = start.diff(today, 'seconds') - (start.diff(today, 'minutes') * 60);
		return {days: days, hours: hours, minutes: minutes, seconds: seconds}
	}
});