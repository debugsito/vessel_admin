/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import { useState, useEffect, FC } from 'react';

import {
  AutocompleteInput, BooleanInput, CheckboxGroupInput, DateInput, Edit,
  EditProps, NumberInput, ReferenceArrayInput, required, SelectArrayInput,
  SelectInput, SimpleForm, TextInput, useEditController, useNotify,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import ImageInput from '../components/ImageInput';
import UploadDialog from '../components/UploadDialog';
import TimeZones from './TimeZones';

export const styles = {
  itemImage: {
    display: 'flex',
    gap: '15px',
    alignItems: 'flex-end',
    marginBottom: 20,
    width: 'max-content',
    '& img': {
      width: 180,
    },
  },
};
const useStyles = makeStyles(styles);

const ContactEditForm: FC<EditProps> = (props) => {
  const notify = useNotify();
  const handleSuccess = () => {
    notify('Contact updated successfully.');
  };

  const [contactFullName, setContactFullName] = useState('');
  const { record, loaded }: any = useEditController(props);
  const [itemImageURL, setItemImageURL] = useState('');

  const handleImageUpload = (url: string) => {
    setItemImageURL(url);
  };

  useEffect(() => {
    if (loaded) {
      setContactFullName(`${record?.first_name}${record?.first_name ? ' ' : ''}${record?.last_name}`);
      setItemImageURL(record?.image_url);
    }
  }, [loaded]);

  const transform = (data: any) => {
    const {
      first_name,
      last_name,
      gender,
      height,
      weight,
      description,
      birth_date,
      time_zone,
      occupation,
      location_description,
      is_verified,
      roles,
      image_url,
      goals,
    } = data;
    data = {
      first_name,
      last_name,
      gender,
      height,
      weight,
      description,
      birth_date,
      time_zone,
      occupation,
      location_description,
      is_verified,
      roles,
      image_url,
      goals,
    };
    if (!data.height) data.height = 0;
    if (!data.weight) data.weight = 0;
    if (!data.birth_date) delete data.birth_date;
    if (!data.time_zone) delete data.time_zone;
    if (!data.occupation) data.occupation = '';
    if (!data.location_description) data.location_description = '';
    if (!data.is_verified) data.is_verified = false;
    if (!data.roles) data.roles = [];
    if (!data.image_url) data.image_url = '';
    if (!data.goals) data.goals = [];
    if (!data.description) data.description = '';
    // delete data.image_url;
    return data;
  };
  const classes = useStyles();

  return (
    <>
      <Edit title={contactFullName} {...props} transform={transform} onSuccess={handleSuccess} mutationMode="pessimistic">
        <SimpleForm>

          <div className={classes.itemImage}>
            <img src={itemImageURL} alt="" />
            <UploadDialog upload={handleImageUpload} />
          </div>

          <ImageInput url={itemImageURL} source="image_url" />

          <TextInput
            autoFocus
            source="first_name"
            fullWidth
            validate={required()}
          />
          <TextInput
            source="last_name"
            fullWidth
            validate={required()}
          />
          <TextInput
            multiline
            autoFocus
            source="description"
            fullWidth
          />
          <SelectInput
            style={{ width: '100%' }}
            fullWidth
            source="gender"
            validate={required()}
            choices={[
              { id: 'm', name: 'Male' },
              { id: 'f', name: 'Female' },
              { id: 'o', name: 'Other' },
            ]}
          />
          <NumberInput
            source="height"
            onWheel={(event: any) => event.target.blur()}
            fullWidth
          />
          <NumberInput
            source="weight"
            onWheel={(event: any) => event.target.blur()}
            fullWidth
          />
          <DateInput
            source="birth_date"
            fullWidth
          />
          <TextInput
            source="occupation"
            fullWidth
          />
          <TextInput
            multiline
            source="location_description"
            fullWidth
          />
          <BooleanInput source="is_verified" />
          <AutocompleteInput style={{ width: '100%' }} fullWidth source="time_zone" choices={TimeZones} />
          <ReferenceArrayInput style={{ width: '100%' }} source="goals" reference="goal">
            <SelectArrayInput optionText="name" />
          </ReferenceArrayInput>
          <CheckboxGroupInput
            source="roles"
            choices={[
              { id: 'QUALITY_CONTROL', name: 'QUALITY_CONTROL' },
              { id: 'QUALITY_CONTROL_OPERATOR', name: 'QUALITY_CONTROL_OPERATOR' },
              { id: 'CALIBRATION_OPERATOR', name: 'CALIBRATION_OPERATOR' },
              { id: 'ADMIN', name: 'ADMIN' },
            ]}
          />
        </SimpleForm>
      </Edit>
    </>
  );
};

export default React.memo(ContactEditForm);
