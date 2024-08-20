import * as React from 'react';
import { FC } from 'react';
import {
  TextInput,
  EditProps,
  SimpleForm,
  Edit,
  DateTimeInput,
  Toolbar,
  SaveButton,
} from 'react-admin';

const CardEditToolbar = (props: any) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

const WellnessCardEdit: FC<EditProps> = (props) => {
  const transform = (data: any) => {
    delete data.id;
    delete data.uuid;
    if (data.insert_date && typeof (data.insert_date) === 'object') {
      const correctedDateTime = `${data.insert_date.toLocaleString()} Z`;
      const date = new Date(correctedDateTime).toISOString();
      data.insert_date = date;
    }
    if (data.update_date && typeof (data.update_date) === 'object') {
      const correctedDateTime = `${data.update_date.toLocaleString()} Z`;
      const date = new Date(correctedDateTime).toISOString();
      data.update_date = date;
    }
    return data;
  };
  return (
    <Edit {...props} mutationMode="pessimistic" transform={transform} onSuccess={() => null}>
      <SimpleForm toolbar={<CardEditToolbar />}>
        <TextInput
          autoFocus
          source="version"
          fullWidth
        />
        <DateTimeInput
          source="insert_date"
          fullWidth
        />
        <DateTimeInput
          source="update_date"
          fullWidth
        />
        <TextInput
          source="wellness_card_batch_id"
          fullWidth
        />
        <TextInput
          source="station"
          fullWidth
        />
        <TextInput
          source="calibration_mode"
          fullWidth
        />
        <TextInput
          source="orca_sheet_name"
          fullWidth
        />
        <TextInput
          source="orca_row_id"
          fullWidth
        />
        <TextInput
          source="orca_user_email"
          fullWidth
        />
      </SimpleForm>
    </Edit>
  );
};

export default WellnessCardEdit;
