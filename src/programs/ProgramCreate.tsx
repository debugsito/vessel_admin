import * as React from 'react';
import { FC } from 'react';
import {
  Create,
  CreateProps,
  SimpleForm,
} from 'react-admin';

import ProgramForm from './ProgramForm';

export const styles = {
  price: { width: '7em' },
  width: { width: '7em' },
  height: { width: '7em' },
  stock: { width: '7em' },
  widthFormGroup: { display: 'inline-block' },
  heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const transform = (data: any) => {
  data.plan_ids = data.plans;
  delete data.plans;
  return data;
};

const ProgramCreate: FC<CreateProps> = (props) => (
  <Create title="Create Program" {...props} transform={transform}>
    <SimpleForm>
      <ProgramForm />
    </SimpleForm>
  </Create>
);

export default ProgramCreate;
