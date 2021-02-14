const options = {
  messages: {
    name: {
      minlength: "Name should be at least 3 characters"
    },
    email: {
      email: "The email should be in the format: abc@domain.tld"
    },
    password: {
      pwcheck: "Password should contain a lowercase , uppercase and a digit",
      includeName: "Password cannot include First or Last Name"
    }
  },
  rules: {
    name: {
      required: true,
      minlength: 3
    },
    age: {
      required: true,
      number: true,
      min: 18
    },
    email: {
      required: true,
      email: true
    },
    password: {
      required: true,
      pwcheck: true,
      includeName: true,
      minlength: 8
    },
    _password: {
      minlength: 8,
      lowerCase: {
        depends: function (elem) {

          return hasLowerCase($("#password").val())
        }
      },
      number: true,
      min: 0
    }
  }

}