import * as React from 'react';
import { FC } from 'react';
import {
  Create,
  CreateProps,
  SimpleForm,
} from 'react-admin';

import LessonForm from './LessonForm';

export const styles = {
  price: { width: '7em' },
  width: { width: '7em' },
  height: { width: '7em' },
  stock: { width: '7em' },
  widthFormGroup: { display: 'inline-block' },
  heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const transform = (data: any) => data;

const LessonCreate: FC<CreateProps> = (props) => (
  <Create title="Create Lesson" {...props} transform={transform}>
    <SimpleForm>
      <LessonForm />
    </SimpleForm>
  </Create>
);

export default LessonCreate;
