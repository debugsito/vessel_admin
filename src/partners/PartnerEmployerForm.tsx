import React from 'react';
import {
  TextInput,
  email,
} from 'react-admin';

const validateEmail = email();

const Form = () => (
  // eslint-disable-next-line react/prop-types
  /* eslint-disable @typescript-eslint/naming-convention */
  <>
    <TextInput
      autoFocus
      source="email"
      fullWidth
      validate={validateEmail}
    />
  </>
);
export default Form;
