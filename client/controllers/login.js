Template.login.events({
  'submit form': function(e) {
    e.preventDefault();
  }
});

Template.login.rendered = function() {
	$('#application-login').validate({
		rules: {
			emailAddress: {
				required: true,
				email: true
			},
			password: {
				required: true
			}
		},
		messages: {
			emailAddress: {
				required: 'Please enter an email address.',
				email: "Please enter a valid email."
			},
			password: {
				required: 'Please enter a password.'
			}
		},
		submitHandler: function() {
			user = {
				email: $('[name="emailAddress"]').val(),
				password: $('[name="password"]').val()
			}

			Meteor.loginWithPassword(user.email, user.password, function(error) {
				if (error) {
					alert(error.reason);
				} else {
					Router.go('/votes');
				}
			});
		}
	});
}