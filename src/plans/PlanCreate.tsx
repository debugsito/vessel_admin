import * as React from 'react';
import { FC } from 'react';
import {
  Create,
  CreateProps,
  SimpleForm,
} from 'react-admin';

import PlanForm from './PlanForm';

export const styles = {
  price: { width: '7em' },
  width: { width: '7em' },
  height: { width: '7em' },
  stock: { width: '7em' },
  widthFormGroup: { display: 'inline-block' },
  heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const PlanCreate: FC<CreateProps> = (props) => {
  const transform = (data: any) => {
    delete data.id;
    delete data.contact_id;
    return data;
  };

  return (
    <Create title="Create Plan" {...props} transform={transform}>
      <SimpleForm>
        <PlanForm />
      </SimpleForm>
    </Create>
  );
};

export default PlanCreate;
