Template.signup.events({
  'submit form': function(e) {
    e.preventDefault();
  }
});

Template.signup.rendered = function() {
  $('#application-signup').validate({
    rules: {
      fullname: {
        required: true
      },
      address: {
        required: true
      },
      postalCode: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 6
      },
      creditcard: {
        creditcard: true, 
        required: true
      },
      expMo: {
        required: true
      },
      expYr: {
        required: true
      },
      cvc: {
        required: true
      }
    },
    messages: {
      fullname: {
        required: "Please enter your name."
      },
      address: {
        required: "Please enter your shipping address."
      },
      postalCode: {
        required: "Please enter your postal code."
      },
      email: {
        required: "Please enter your email address.",
        email: "Please enter a valid email."
      },
      password: {
        required: "Please enter a password.",
        minlength: "Password must be at least 6 characters."
      },
      creditcard: {
        creditcard: "Please enter a valid credit card.",
        required: 'Required.'
      },
      expMo: {
        required: "Required."
      },
      expYr: {
        required: "Required."
      },
      cvc: {
        required: "Required."
      }
    },
    submitHandler: function() {
      var user = {
        name: $('[name="fullname"]').val(),
        emailAddress: $('[name="email"]').val(),
        shippingAddress: $('[name="address"]').val(),
        postalCode: $('[name="postalCode"]').val(),
        password: $('[name="password"]').val(),
        card: {
          number: $('[name="creditcard"]').val(),
          exp_month: $('[name="expMo"]').val(),
          exp_year: $('[name="expYr"]').val(),
          cvc: $('[name="cvc"]').val()
        }
      }

      Meteor.call('signupUser', user, function(error, response) {
        if (error) {
          $('#error-message').text(error.reason);
          $('#error-messages').show();
          $("html, body").animate({
            scrollTop:0
          },"slow");
        } else {
          if (response.error) {
            $('#error-message').text(response.message)
            $('#error-messages').show();
            $("html, body").animate({
              scrollTop:0
            },"slow");
          } else {
            Meteor.loginWithPassword(user.emailAddress, user.password, function(error) {
              if (error) {
                alert(error.reason);
              } else {
                Router.go('/votes');
              }
            });
          }
        }
      });
    }
  });
}