import * as React from 'react';
import {
  TextInput,
  required,
  SelectInput,
} from 'react-admin';

const ReagentLotForm = ({ reagents }: any) => (
  <>
    <TextInput
      autoFocus
      source="display_name"
      fullWidth
      validate={required()}
    />
    <SelectInput validate={required()} choices={reagents} fullWidth label="Reagent" source="reagent_id" />

    <TextInput
      source="manufacturer"
      multiline
      fullWidth
    />
    <TextInput
      autoFocus
      source="part_number"
      fullWidth
      validate={required()}
    />
    <TextInput
      autoFocus
      source="lot_number"
      fullWidth
      validate={required()}
    />

    <SelectInput
      source="reagent_type"
      style={{ width: '100%' }}
      choices={[
        { id: 'Colorimetric', name: 'Colorimetric' },
        { id: 'LFA', name: 'LFA' },
      ]}
    />
    <TextInput
      autoFocus
      source="revision"
      fullWidth
      validate={required()}
    />
    <SelectInput
      source="status"
      style={{ width: '100%' }}
      choices={[
        { id: 'ready', name: 'ready' },
        { id: 'invalid', name: 'invalid' },
      ]}
    />
  </>
);

export default ReagentLotForm;
