var Future = Npm.require('fibers/future')

Meteor.methods({
	signupUser: function(user) {
		console.log(user)
		check(user, {
			name: String,
			emailAddress: String,
			shippingAddress: String,
			postalCode: String,
			password: String,
			card: {
				number: String, 
				exp_month: String,
				exp_year: String,
				cvc: String
			}
		});
		var emailRegex = new RegExp(user.emailAddress, "i");
		var lookupUser = Meteor.users.findOne({"emails.address": emailRegex})

		if (!lookupUser) {
			var newUser = new Future();

			Meteor.call('stripeCreateToken', user.card, function(error, stripeToken) {
				if (error) {
					console.log(error);
				} else {
					Meteor.call('stripeChargeCard', stripeToken, user.emailAddress, function(error, charge) {
						if (error) {
							console.log(error);
						} else {

							try {

								if (charge.type == 'StripeCardError') {
									throw new Meteor.Error('stripe-card-error', charge.message)
								}

								var paidUser = Accounts.createUser({
									email: user.emailAddress,
									password: user.password,
									address: user.address,
									postalCode: user.postalCode,
									profile: {
										name: user.name
									}
								});

								newUser.return(paidUser);
							} catch(exception) {
								console.log(exception);
								newUser.return(exception);
							}
						}
					});
				}
			});

			return newUser.wait();

		} else {
			throw new Meteor.Error('customer-exists', 'Sorry, that customer email already exists!')
		}
	}
});