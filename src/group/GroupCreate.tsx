import * as React from 'react';
import { FC } from 'react';
import {
  Create,
  CreateProps,
  SimpleForm,
} from 'react-admin';

import GroupForm from './GroupForm';

export const styles = {
  price: { width: '7em' },
  width: { width: '7em' },
  height: { width: '7em' },
  stock: { width: '7em' },
  widthFormGroup: { display: 'inline-block' },
  heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const transform = (data: any) => data;

const GroupCreate: FC<CreateProps> = (props) => (
  <Create title="Create Group" {...props} transform={transform}>
    <SimpleForm>
      <GroupForm />
    </SimpleForm>
  </Create>
);

export default GroupCreate;
