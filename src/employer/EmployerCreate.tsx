import * as React from 'react';
import { FC } from 'react';
import {
  Create,
  CreateProps,
  SimpleForm,
} from 'react-admin';
import EmployerForm from './EmployerForm';

const transform = (data: any) => data;

const EmployerCreate: FC<CreateProps> = (props) => (
  <Create title="Create Employer" {...props} transform={transform}>
    <SimpleForm redirect="list">
      <EmployerForm />
    </SimpleForm>
  </Create>
);

export default EmployerCreate;
