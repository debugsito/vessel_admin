import * as React from 'react';
import { FC } from 'react';
import { Create, CreateProps, SimpleForm } from 'react-admin';
import GoalGeneralForm from './GoalForm';

export const styles = {
  price: { width: '7em' },
  width: { width: '7em' },
  height: { width: '7em' },
  stock: { width: '7em' },
  widthFormGroup: { display: 'inline-block' },
  heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const GoalCreate: FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <GoalGeneralForm />
    </SimpleForm>
  </Create>
);

export default GoalCreate;
