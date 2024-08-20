import React from 'react';
import {
  NumberInput,
  TextInput,
  required,
  number,
  minValue,
  minLength,
} from 'react-admin';

const validateEmployerName = [required(), minLength(1)];
const validateNumberOfEmployees = [
  required(),
  number(),
  minValue(1),
];
const validateIndustryId = [
  required(),
  number(),
  minValue(1),
];

const Form = () => (
  // eslint-disable-next-line react/prop-types
  /* eslint-disable @typescript-eslint/naming-convention */
  <>
    <TextInput
      autoFocus
      source="name"
      label="Employer Name"
      fullWidth
      validate={validateEmployerName}
    />
    <NumberInput
      autoFocus
      source="number_of_employees"
      label="Num Of Employees"
      fullWidth
      validate={validateNumberOfEmployees}
    />
    <NumberInput
      autoFocus
      source="industry_id"
      label="Industry ID"
      fullWidth
      validate={validateIndustryId}
    />
  </>
);
export default Form;
