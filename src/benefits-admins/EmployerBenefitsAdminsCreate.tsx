import React, { FC } from 'react';
import {
  Create,
  CreateProps,
  SimpleForm,
} from 'react-admin';
import EmployerBenefitsAdminsForm from './EmployerBenefitsAdminsForm';

const transform = (data: any) => data;

const EmployerBenefitsAdminsCreate: FC<CreateProps> = (props) => (
  <Create title="Create Benefits Admins" {...props} transform={transform}>
    <SimpleForm redirect="list">
      <EmployerBenefitsAdminsForm />
    </SimpleForm>
  </Create>
);

export default EmployerBenefitsAdminsCreate;
