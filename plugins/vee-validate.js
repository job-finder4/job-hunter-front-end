import { extend } from "vee-validate";
import { required, email, max } from "vee-validate/dist/rules";

extend("name", {
  validate(value, args) {
    //let startsWith=value.match;
    return    isNaN(parseInt(value[0], 10))
    // return  value=== args.name;
  },
  message: "The name field should not start with number"
});
extend("name2", {
  validate(value, args) {
    var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    //let startsWith=value.match;
    return    !format.test(value)
    // return  value=== args.name;
  },
  message: "The name should not contain special characters"
});


extend("required", {
  ...required,
  message: "This {_field_} field is required"
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
    return  value=== args.password;
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
  message: "password must contain number",
  validate: value => value.match(/[0-9]/g) !== null
})


