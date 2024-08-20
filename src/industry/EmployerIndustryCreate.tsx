import * as React from 'react';
import { FC } from 'react';
import {
  Create,
  CreateProps,
  SimpleForm,
} from 'react-admin';
import EmployerIndustryForm from './EmployerIndustryForm';

const transform = (data: any) => data;

const EmployerIndustryCreate: FC<CreateProps> = (props) => (
  <Create title="Create Industry" {...props} transform={transform}>
    <SimpleForm redirect="list">
      <EmployerIndustryForm />
    </SimpleForm>
  </Create>
);

export default EmployerIndustryCreate;
