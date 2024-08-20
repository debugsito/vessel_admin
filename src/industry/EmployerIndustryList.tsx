import * as React from 'react';
import {
  Datagrid,
  List,
  Filter,
  TextInput,
  NumberField,
  TextField,
  DateField,
} from 'react-admin';

const IndustryFilter = (props: any) => (
  <Filter {...props}>
    <TextInput
      label="Search by title or code..."
      style={{ minWidth: 250 }}
      source="search"
      alwaysOn
    />
  </Filter>
);

const EmployerIndustryList = (props: any) => {
  const postRowStyle = () => ({
    height: '35px',
  });

  return (
    <>
      <List
        title="Industry"
        {...props}
        bulkActionButtons={false}
        filters={<IndustryFilter />}
      >
        <Datagrid rowStyle={postRowStyle} rowClick="edit">
          <NumberField source="id" label="ID" />
          <TextField sortable source="code" />
          <TextField sortable source="title" />
          <DateField sortable source="created_at" label="Created At" />
          <DateField sortable source="updated_at" label="Updated At" />
        </Datagrid>
      </List>
    </>
  );
};

export default EmployerIndustryList;
