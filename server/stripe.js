var secret = Meteor.settings.private.stripe.testSecretKey;
var cost = Meteor.settings.public.cost;
var Stripe = Meteor.npmRequire('stripe')(secret);
var Future = Npm.require('fibers/future');

Meteor.methods({
	stripeChargeCard: function(stripeToken, email) {
		var stripeCharge = new Future();

		Stripe.charges.create({
			amount: cost,
			currency: 'cad',
			source: stripeToken,
			description: email
		}, function(error,charge) {
			if (error) {
				stripeCharge.return(error);
  		} else {
  			stripeCharge.return(charge);
  		}
		});

		return stripeCharge.wait();
	},

	stripeCreateToken: function(card) {
		var stripeToken = new Future();
		Stripe.tokens.create({card: card}, function(error, response) {
			if (error) {
				stripeToken.throw(error);
			} else {
				stripeToken.return(response.id);
			}
		});

		return stripeToken.wait();
	}
});