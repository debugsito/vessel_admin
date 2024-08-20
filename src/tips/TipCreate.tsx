import * as React from 'react';
import { FC } from 'react';
import {
  Create,
  CreateProps,
  SimpleForm,
} from 'react-admin';
import TipForm from './TipForm';

const TipCreate: FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TipForm showContactForm />
    </SimpleForm>
  </Create>
);

export default TipCreate;
