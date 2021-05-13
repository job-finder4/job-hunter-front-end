import {extend} from "vee-validate";
import {required, email, max, numeric, max_value} from "vee-validate/dist/rules";


extend('salary', {
  message: "salary must be number and above 10",
  validate(value, args) {
    if (value.match(/[0-9]/g) !== null) {
      return value > 10
    }
    return false
  },
})
extend('max_salary', {
  message: "max salary must be greater than min",
  validate(value, args) {
    return value >= args.min_salary;
  },
  params: ['password'],
})

extend("name", {
  validate(value, args) {
    //let startsWith=value.match;
    return isNaN(parseInt(value[0], 10))
    // return  value=== args.name;
  },
  message: "The name field should not start with number"
});
extend("name2", {
  validate(value, args) {
    var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    //let startsWith=value.match;
    return !format.test(value)
    // return  value=== args.name;
  },
  message: "The name should not contain special characters"
});

extend("required", {
  ...required,
  message: "This {_field_} field is required"
});

extend("numeric", {
  ...numeric,
  message: "{_field_} field must be a numeric"
});

extend("max_value", {
  ...max_value,
  message: "{_field_} field must be smaller than {max}"
});

extend("positive_number", {
  validate(value, args) {
    return value > 0;
  },
  message: "{_field_} field must be positive"
});

extend("max", {
  ...max,
  message: "This {_field_} field must be {length} characters or less"
});

extend("email", {
  ...email,
  message: "This {_field_} field must be a valid email"
});

extend("confirmed", {
  validate(value, args) {
    return value === args.password;
  },
  params: ['password'],
  message: "This {_field_} field confirmation does not match"
});

extend('min', {
  validate(value, args) {
    const length = value.length;

    return length >= args.min;
  },
  params: ['min'],
  message: "password length should be at least 10"
});

extend('upCase', {
  validate: value => value.match(/[A-Z]/g) !== null,
  message: "password must contain capital letter"
})
extend('number', {
  message: "{_field_} must contain number",
  validate: value => value.match(/[0-9]/g) !== null
})

extend('phone', {
  message: "not valid phone number",
  validate(value) {
    var phoneNum = /^\(?([0-0]{1})\)?[-. ]?([9-9]{1})[-. ]?([0-9]{8})$/;
    return value.match(phoneNum)
  },
})

