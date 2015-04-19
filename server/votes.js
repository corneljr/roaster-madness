Meteor.methods({
	voteForRoaster: function(roasterId) {
		//check whether user has voted for a roaster yet
		if (UserVote.findOne({userId: Meteor.userId()})) {
			throw new Meteor.Error('not-authorized');
		} else {
			//increment vote count and save user vote
			InitialRoasters.update(roasterId, {$inc: {votes: 1}});
			UserVote.insert({userId: Meteor.userId(), roasterId: roasterId});
		}
	}
});