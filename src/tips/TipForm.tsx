import * as React from 'react';
import {
  TextInput,
  required,
  ReferenceInput,
  AutocompleteInput,
  SelectInput,
  NumberInput,
} from 'react-admin';
import ImageInputUpload from '../components/ImageInputUpload';

const optionRenderer = (choice: any) => {
  if (!choice) {
    return '';
  }
  return `${choice.first_name} ${choice.last_name} (${choice.email})`;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TipForm = ({ image, showContactForm }: any) => (
  <>
    <ImageInputUpload image={image} source="image_url" />
    <TextInput
      autoFocus
      source="title"
      fullWidth
      validate={required()}
    />
    <TextInput
      autoFocus
      source="frequency"
      fullWidth
      validate={required()}
    />
    <TextInput
      multiline
      autoFocus
      source="description"
      fullWidth
    />
    <NumberInput
      source="time_per_day"
      onWheel={(event: any) => event.target.blur()}
      disabled
      defaultValue={5}
      fullWidth
    />
    <ReferenceInput fullWidth label="Main Goal" source="main_goal_id" validate={required()} reference="goal">
      <SelectInput fullWidth optionText="name" />
    </ReferenceInput>

    <ReferenceInput
      fullWidth
      label="Contact"
      source="contact_id"
      reference="contacts"
      filterToQuery={(searchText) => ({ search: searchText })}
    >
      <AutocompleteInput optionText={optionRenderer} />
    </ReferenceInput>
  </>
);

export default TipForm;
