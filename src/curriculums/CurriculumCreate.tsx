import * as React from 'react';
import { FC } from 'react';
import {
  Create,
  CreateProps,
  SimpleForm,
} from 'react-admin';

import CurriculumForm from './CurriculumForm';

export const styles = {
  price: { width: '7em' },
  width: { width: '7em' },
  height: { width: '7em' },
  stock: { width: '7em' },
  widthFormGroup: { display: 'inline-block' },
  heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const transform = (data: any) => data;

const CurriculumCreate: FC<CreateProps> = (props) => (
  <Create title="Create Curriculum" {...props} transform={transform}>
    <SimpleForm>
      <CurriculumForm />
    </SimpleForm>
  </Create>
);

export default CurriculumCreate;
