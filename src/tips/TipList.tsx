import * as React from 'react';
import {
  Datagrid,
  Filter,
  ImageField,
  List,
  ReferenceInput,
  TextField,
  TextInput,
  ReferenceField,
} from 'react-admin';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  min_100: {
    minWidth: '100px',
  },
  min_180: {
    minWidth: '180px',
  },
  tip_image: {
    width: '70px',
    height: '70px',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      margin: '0',
      padding: '6px',
      boxSizing: 'border-box',
    },
  },
}));
const ContactField = ({ source, record }: any) => (
  <span>
    {`${record[source] ? record[source].first_name : ''} ${
      record[source] ? record[source].last_name : ''
    }`}
  </span>
);

const TipFilter = (props: any) => (
  <Filter {...props}>
    <TextInput
      label="Search by title or description..."
      source="search"
      alwaysOn
    />
    <ReferenceInput label="Goal" source="main_goal_id" reference="goal">
      <TextInput source="name" />
    </ReferenceInput>
  </Filter>
);
const TipList = (props: any) => {
  const classes = useStyles();
  return (
    <>
      <List {...props} bulkActionButtons filters={<TipFilter />}>
        <Datagrid rowClick="edit">
          <TextField sortable source="tip_id" />
          <ImageField
            className={classes.tip_image}
            sortable={false}
            source="image_url"
          />
          <TextField sortable source="title" />
          <TextField sortable source="frequency" />
          <ReferenceField label="Goal" source="main_goal_id" reference="goal">
            <TextField source="name" />
          </ReferenceField>
          <ContactField sortable source="contact" />
        </Datagrid>
      </List>
    </>
  );
};

export default TipList;
