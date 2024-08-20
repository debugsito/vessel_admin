import * as React from 'react';
import {
  Datagrid,
  List,
  TextField,
  NumberField,
} from 'react-admin';

const KudosList = (props: any) => {
  const postRowStyle = () => ({
    height: '35px',
  });

  return (
    <>
      <List
        title="Kudos"
        {...props}
        bulkActionButtons={false}
      >
        <Datagrid rowStyle={postRowStyle} rowClick="edit">
          <NumberField sortable source="id" />
          <TextField sortable source="title" />
          <TextField sortable source="description" />
          <TextField sortable source="button_title" />
          <NumberField sortable source="day" />
          <NumberField sortable source="min_complete_percentage" />
        </Datagrid>
      </List>
    </>
  );
};

export default KudosList;
