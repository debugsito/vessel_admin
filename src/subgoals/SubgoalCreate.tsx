import * as React from 'react';
import { FC } from 'react';
import { Create, CreateProps, SimpleForm } from 'react-admin';
import SubgoalGeneralForm from './SubgoalForm';

export const styles = {
  price: { width: '7em' },
  width: { width: '7em' },
  height: { width: '7em' },
  stock: { width: '7em' },
  widthFormGroup: { display: 'inline-block' },
  heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const SubgoalCreate: FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <SubgoalGeneralForm />
    </SimpleForm>
  </Create>
);

export default SubgoalCreate;
