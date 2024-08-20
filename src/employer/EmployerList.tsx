import * as React from 'react';
import {
  Datagrid,
  List,
  Filter,
  TextInput,
  NumberField,
  DateField,
  TextField,
} from 'react-admin';

const EmployerFilter = (props: any) => (
  <Filter {...props}>
    <TextInput
      label="Search by name or employee # ..."
      style={{ minWidth: 250 }}
      source="search"
      alwaysOn
    />
  </Filter>
);

const EmployerList = (props: any) => {
  const postRowStyle = () => ({
    height: '35px',
  });

  return (
    <>
      <List
        title="Employer"
        {...props}
        bulkActionButtons={false}
        filters={<EmployerFilter />}
      >
        <Datagrid rowStyle={postRowStyle} rowClick="edit">
          <NumberField label="ID" source="id" />
          <TextField label="Employer Name" source="name" />
          <NumberField label="Number Of Employees" source="number_of_employees" />
          <NumberField label="Industry ID" source="industry.id" />
          <NumberField label="Industry Title" source="industry.title" />
          <DateField label="Created At" sortable source="created_at" />
          <DateField label="Updated At" sortable source="updated_at" />
        </Datagrid>
      </List>
    </>
  );
};

export default EmployerList;
