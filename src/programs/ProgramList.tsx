import * as React from 'react';
import {
  ArrayField,
  AutocompleteInput,
  BooleanField,
  BooleanInput,
  Datagrid,
  Filter,
  ImageField,
  List,
  NumberField,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  SingleFieldList,
  TextField,
  TextInput,
  useRedirect,
} from 'react-admin';
import Chip from '@material-ui/core/Chip';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  image: {
    width: '120px',
    height: '120px',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      margin: '0',
      padding: '6px',
      boxSizing: 'border-box',
    },
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  listrow: {
    height: '35px',
  },
}));

const VesselChip = (data: any) => {
  const redirect = useRedirect();
  const { record } = data;
  const handlePlanClick = () => {
    redirect(`/plan/${record.id}`);
  };
  return (
    <Chip
      label={record.id}
      color="default"
      onClick={(e) => {
        e.stopPropagation();
        handlePlanClick();
      }}
    />
  );
};

const optionRenderer = (choice: any) => {
  if (!choice) {
    return '';
  }
  return `${choice.first_name} ${choice.last_name} (${choice.email})`;
};

const ProgramFilter = (props: any) => (
  <Filter {...props}>
    <TextInput label="Search" source="title" />
    <BooleanInput label="Active" source="is_active" />
    <SelectInput
      source="difficulty"
      style={{ width: '100%' }}
      choices={[
        { id: 'Hard', name: 'Hard' },
        { id: 'Med', name: 'Medium' },
        { id: 'Easy', name: 'Easy' },
      ]}
    />
    <NumberInput label="Duration" source="duration_days" />
    <ReferenceInput
      fullWidth
      label="Contact"
      source="contact_id"
      reference="contacts"
      filterToQuery={(searchText) => ({ search: searchText })}
    >
      <AutocompleteInput optionText={optionRenderer} />
    </ReferenceInput>
  </Filter>
);
const ContactField = ({ record }: any) => <span>{`${record ? record.first_name : ''} ${record ? record.last_name : ''}`}</span>;

const ProgramList = (props: any) => {
  const classes = useStyles();

  const postRowStyle = () => ({
    height: '35px',
  });

  return (
    <>
      <List
        title="Programs"
        {...props}
        bulkActionButtons={false}
        filters={<ProgramFilter />}
      >
        <Datagrid rowStyle={postRowStyle} rowClick="edit">
          <NumberField sortable source="id" />
          <ImageField
            className={classes.image}
            sortable={false}
            source="image_url"
          />
          <TextField sortable source="title" />
          <BooleanField sortable source="is_active" />
          <ReferenceField
            fullWidth
            label="Contact"
            source="contact_id"
            reference="contacts"
          >
            <ContactField sortable source="" />
          </ReferenceField>
          <NumberField sortable source="duration_days" />
          <ReferenceField label="Main Goal" source="main_goal_id" reference="goal">
            <TextField source="name" />
          </ReferenceField>
          <TextField sortable={false} source="reviewed_contact_ids" />
          <TextField source="difficulty" />
          <ArrayField sortable={false} source="plans">
            <SingleFieldList className={classes.root} linkType={false}>
              <VesselChip source="id" />
            </SingleFieldList>
          </ArrayField>
          <TextField sortable source="total_likes" />
        </Datagrid>
      </List>
    </>
  );
};

export default ProgramList;
