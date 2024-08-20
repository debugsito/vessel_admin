import React from 'react';
import {
  TextInput,
  required,
  maxLength,
  minLength,
  regex,
} from 'react-admin';

const validateCode = [
  required(),
  regex(/^\d{1,6}$/, 'Must be a 6 digit code such as 191232'),
  minLength(6),
  maxLength(6),
];
const validateTitle = [
  required(),
  minLength(1),
];

const Form = () => (
  // eslint-disable-next-line react/prop-types
  /* eslint-disable @typescript-eslint/naming-convention */
  <>
    <TextInput
      autoFocus
      source="code"
      fullWidth
      validate={validateCode}
    />
    <TextInput
      autoFocus
      source="title"
      fullWidth
      validate={validateTitle}
    />
  </>
);
export default Form;
