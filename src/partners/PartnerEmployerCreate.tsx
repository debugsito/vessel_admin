import * as React from 'react';
import { FC } from 'react';
import {
  Create,
  CreateProps,
  SimpleForm,
} from 'react-admin';
import PartnerEmployerForm from './PartnerEmployerForm';

const transform = (data: any) => data;

const PartnerEmployerCreate: FC<CreateProps> = (props) => (
  <Create title="Create Employee Benefits Employer" {...props} transform={transform}>
    <SimpleForm redirect="list">
      <PartnerEmployerForm />
    </SimpleForm>
  </Create>
);

export default PartnerEmployerCreate;
