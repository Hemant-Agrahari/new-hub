// write validation field wise and alfabetical order
const email = {
  invalidEmail: 'Please enter a valid email address (e.g., name@example.com).',
  require: 'Please enter your email address.',
}

const message = {
  max: 'Message should not exceed 250 characters.',
  min: 'Message should have at least 3 characters.',
  require: 'Message is required.',
}

const mobile = {
  integer: 'A phone number cannot contain decimals.',
  positive: 'A phone number cannot start with a negative sign.',
  require: 'Please enter your phone number.',
  typeError: 'Please enter a valid phone number.',
}

const name = {
  require: 'Please enter your name.',
}

const password = {
  match:
    'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
  max: 'Password is too long - should not more than 15 chars.',
  min: 'Password is too short - should be 6 chars minimum.',
  require: 'Please enter a password.',
}

const subject = {
  require: 'Please select a subject.',
}

const termsConditions = {
  require: 'You need to accept the terms and conditions.',
}

export const validationMsg = {
  email: email,
  mobile: mobile,
  message: message,
  name: name,
  password: password,
  subject: subject,
  termsConditions: termsConditions,
}
