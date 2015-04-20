Template.votes.helpers({
	roasters: function() {
		return InitialRoasters.find();
	},
	voted: function() {
		if (UserVote.findOne({userId: Meteor.userId()})) {
			return true
		} else {
			return false
		}
	}
});

Template.roaster.helpers({
	voted: function() {
		if (UserVote.findOne({userId: Meteor.userId()})) {
			return true
		} else {
			return false
		}
	}
});

Template.roaster.events({
	'click .vote': function() {
		Meteor.call('voteForRoaster', this._id);
	}
})