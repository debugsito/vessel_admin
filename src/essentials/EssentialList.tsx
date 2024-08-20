import * as React from 'react';
import {
  Datagrid,
  List,
  NumberField,
  TextField,
} from 'react-admin';

const EssentialList = (props: any) => {
  const postRowStyle = () => ({
    height: '35px',
  });

  return (
    <>
      <List
        title="Essentials"
        {...props}
        bulkActionButtons={false}
      >
        <Datagrid rowStyle={postRowStyle} rowClick="edit">
          <NumberField source="id" />
          <TextField sortable source="title" />
          <TextField sortable source="link_url" />
          <TextField sortable source="link_text" />
          <TextField sortable source="description" />
        </Datagrid>
      </List>
    </>
  );
};

export default EssentialList;
