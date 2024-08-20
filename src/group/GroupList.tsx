import * as React from 'react';
import {
  Datagrid,
  List,
  TextField,
  NumberField,
} from 'react-admin';

const GroupList = (props: any) => {
  const postRowStyle = () => ({
    height: '35px',
  });

  return (
    <>
      <List
        title="Group"
        {...props}
        bulkActionButtons={false}
      >
        <Datagrid rowStyle={postRowStyle} rowClick="edit">
          <NumberField sortable source="id" />
          <TextField sortable source="title" />
        </Datagrid>
      </List>
    </>
  );
};

export default GroupList;
