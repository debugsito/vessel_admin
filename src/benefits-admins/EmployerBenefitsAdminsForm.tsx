import React from 'react';
import {
  TextInput,
  BooleanInput,
  required,
  minLength,
  email,
  regex,
} from 'react-admin';

const validateName = [
  required(),
  minLength(1),
];
const validateEmail = email();
const phoneNumberFormat = (num: string) => {
  const newNum = num.replace(/[-]+/g, '');
  let x;
  if (newNum.length <= 3) {
    x = newNum;
  } else if (newNum.length > 3 && newNum.length <= 6) {
    x = `${newNum.slice(0, 3)}-${newNum.slice(3, 6)}`;
  } else {
    x = `${newNum.slice(0, 3)}-${newNum.slice(3, 6)}-${newNum.slice(6, 10)}`;
  }
  return x;
};
const validatePhone = [
  required(),
  minLength(12),
  regex(/^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/, 'Must be a valid phone number such as 773-888-9876'),
];
const validatePrimaryConact = [
  required(),
];

const Form = () => (
  // eslint-disable-next-line react/prop-types
  /* eslint-disable @typescript-eslint/naming-convention */
  <>
    <TextInput
      autoFocus
      label="Last Name"
      source="last_name"
      fullWidth
      validate={validateName}
    />
    <TextInput
      autoFocus
      label="First Name"
      source="first_name"
      fullWidth
      validate={validateName}
    />
    <TextInput
      autoFocus
      label="Email"
      source="email"
      fullWidth
      validate={validateEmail}
    />
    <TextInput
      autoFocus
      parse={phoneNumberFormat}
      label="Phone"
      source="phone"
      fullWidth
      validate={validatePhone}
    />
    <BooleanInput
      autoFocus
      label="Primary Contact"
      source="is_primary_contact"
      fullWidth
      validate={validatePrimaryConact}
    />
  </>
);

export default Form;
