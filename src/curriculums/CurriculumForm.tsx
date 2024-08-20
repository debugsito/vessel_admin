import React from 'react';
import {
  ReferenceInput,
  SelectInput,
  TextInput,
  required,
} from 'react-admin';

export const styles = {
  price: { width: '7em' },
  width: { width: '7em' },
  height: { width: '7em' },
  stock: { width: '7em' },
  widthFormGroup: { display: 'inline-block' },
  heightFormGroup: { display: 'inline-block', marginLeft: 32 },
  itemImage: {
    display: 'flex',
    gap: '15px',
    alignItems: 'flex-end',
    width: 'max-content',
    '& img': {
      width: 180,
    },
  },
};

const Form = () => (
  // eslint-disable-next-line react/prop-types
  /* eslint-disable @typescript-eslint/naming-convention */
  <>
    <TextInput autoFocus source="title" fullWidth validate={required()} />
    <ReferenceInput
      fullWidth
      label="Goal"
      source="goal_id"
      reference="goal"
      perPage={99}
    >
      <SelectInput fullwidth optionText="name" />
    </ReferenceInput>
  </>
);
export default Form;
