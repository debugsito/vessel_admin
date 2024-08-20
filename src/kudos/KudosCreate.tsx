import * as React from 'react';
import { FC } from 'react';
import {
  Create,
  CreateProps,
  SimpleForm,
} from 'react-admin';

import KudosForm from './KudosForm';

export const styles = {
  price: { width: '7em' },
  width: { width: '7em' },
  height: { width: '7em' },
  stock: { width: '7em' },
  widthFormGroup: { display: 'inline-block' },
  heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const transform = (data: any) => {
  function removeNulls(obj: any) {
    Object.entries(obj).forEach(([key, value]) => {
      if (value === null || value === undefined || key === 'id') {
        delete obj[key];
      }
    });
  }
  removeNulls(data);
  return data;
};

const KudosCreate: FC<CreateProps> = (props) => (
  <Create title="Create Kudos" {...props} transform={transform}>
    <SimpleForm>
      <KudosForm />
    </SimpleForm>
  </Create>
);

export default KudosCreate;
