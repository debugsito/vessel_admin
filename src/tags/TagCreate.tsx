import * as React from 'react';
import { FC } from 'react';
import {
  Create,
  CreateProps,
  SimpleForm,
} from 'react-admin';
import TagForm from './TagForm';

const TagCreate: FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TagForm />
    </SimpleForm>
  </Create>
);

export default TagCreate;
