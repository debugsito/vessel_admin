import * as React from 'react';
import {
  TextInput,
  required,
  BooleanInput,
} from 'react-admin';

const TagForm = () => (
  <>
    <TextInput
      autoFocus
      source="title"
      fullWidth
      validate={required()}
    />
    <BooleanInput
      autoFocus
      source="is_active"
      fullWidth
      validate={required()}
    />
  </>
);

export default TagForm;
