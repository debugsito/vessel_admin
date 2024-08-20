import React from 'react';
import {
  ReferenceInput, SelectInput, TextInput, required,
} from 'react-admin';

const SubgoalGeneralForm = () => (
  <>
    <TextInput autoFocus source="name" fullWidth validate={required()} />
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

export default SubgoalGeneralForm;
