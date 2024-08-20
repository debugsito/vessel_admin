import * as React from 'react';
import { FC } from 'react';
import {
  Create,
  TextInput,
  required,
  CreateProps,
  SimpleForm,
} from 'react-admin';

export const styles = {
  price: { width: '7em' },
  width: { width: '7em' },
  height: { width: '7em' },
  stock: { width: '7em' },
  widthFormGroup: { display: 'inline-block' },
  heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const SurveyCreate: FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput
        autoFocus
        source="name"
        fullWidth
        validate={required()}
      />
    </SimpleForm>
  </Create>
);

export default SurveyCreate;
