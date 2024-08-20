import React from 'react';
import { TextInput, NumberInput, required } from 'react-admin';

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
    <TextInput autoFocus source="description" fullWidth initialValue="" />
    <TextInput autoFocus source="button_title" fullWidth initialValue="" />
    <NumberInput autoFocus source="day" fullWidth initialValue={1} />
    <NumberInput
      label="Min Complete Percentag (0 < Value < 1)"
      autoFocus
      source="min_complete_percentage"
      fullWidth
      max={1}
      min={0}
      step={0.1}
      initialValue={0.5}
    />
  </>
);
export default Form;
