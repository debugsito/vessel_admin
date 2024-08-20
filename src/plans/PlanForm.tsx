import React from 'react';
import {
  ArrayInput,
  BooleanInput,
  TextInput,
  required,
  ReferenceInput,
  SelectInput,
  AutocompleteInput,
  NumberInput,
  SimpleFormIterator,
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

const optionRenderer = (choice: any) => {
  if (!choice) {
    return '';
  }
  return `${choice.first_name} ${choice.last_name} (${choice.email})`;
};

const Form = () => (
  // eslint-disable-next-line react/prop-types
  // eslint-disable-next-line @typescript-eslint/naming-convention

  // const dataProvider = useDataProvider();

  // const notify = useNotify();

  // const onSuccess = () => {
  //   notify('Program added');
  //   redirect('/program');
  //   refresh();
  // };

  // const params: GetListParams = {
  //   pagination: { page: 1, perPage: 99 },
  //   filter: null,
  //   sort: { field: 'name', order: 'DESC' },
  // };

  <>
    <ReferenceInput
      fullWidth
      label="Contact"
      source="contact_id"
      reference="contacts"
      filterToQuery={(searchText) => ({ search: searchText })}
    >
      <AutocompleteInput optionText={optionRenderer} />
    </ReferenceInput>
    <ReferenceInput
      fullWidth
      label="Tip Id"
      source="tip_id"
      reference="tip"
      filterToQuery={(searchText) => ({ title: searchText })}
    >
      <AutocompleteInput optionText="title" resettable clearAlwaysVisible />
    </ReferenceInput>
    <ReferenceInput
      fullWidth
      label="Food Id"
      source="food_id"
      reference="food"
      filterToQuery={(searchText) => ({ food_title: searchText })}
    >
      <AutocompleteInput optionText="food_title" resettable clearAlwaysVisible />
    </ReferenceInput>

    <NumberInput
      autoFocus
      source="reagent_lifestyle_recommendation_id"
      onWheel={(event: any) => event.target.blur()}
      fullWidth
    />

    <ArrayInput source="day_of_week">
      <SimpleFormIterator>
        <SelectInput
          source=""
          style={{ width: '100%' }}
          choices={[
            { id: 0, name: 'Monday' },
            { id: 1, name: 'Tuesday' },
            { id: 2, name: 'Wednesday' },
            { id: 3, name: 'Thursday' },
            { id: 4, name: 'Friday' },
            { id: 5, name: 'Saturday' },
            { id: 6, name: 'Sunday' },
          ]}
          validate={required()}
        />
      </SimpleFormIterator>
    </ArrayInput>

    <TextInput label="Time of Day" helperText="Format as HH:MM:SS" source="time_of_day" />

    <ReferenceInput
      fullWidth
      label="Program Id"
      source="program_id"
      reference="program"
      filterToQuery={(searchText) => ({ title: searchText })}
    >
      <AutocompleteInput optionText="title" resettable clearAlwaysVisible />
    </ReferenceInput>

    <BooleanInput source="is_program_template" />

  </>
);
export default Form;
