import * as React from 'react';
import {
  Datagrid,
  List,
  Filter,
  TextInput,
  NumberField,
  TextField,
  BooleanField,
  DateField,
} from 'react-admin';

const BenefitsAdminsFilter = (props: any) => (
  <Filter {...props}>
    <TextInput
      label="Search by email or name..."
      style={{ minWidth: 250 }}
      source="search"
      alwaysOn
    />
  </Filter>
);

const EmployerBenefitsAdminsList = (props: any) => {
  const postRowStyle = () => ({
    height: '35px',
  });

  return (
    <>
      <List
        title="Benefits Admins"
        {...props}
        bulkActionButtons={false}
        filters={<BenefitsAdminsFilter />}
      >
        <Datagrid rowStyle={postRowStyle} rowClick="edit">
          <NumberField source="id" label="ID" />
          <TextField sortable source="first_name" label="First Name" />
          <TextField sortable source="last_name" label="Last Name" />
          <TextField sortable source="email" />
          <TextField sortable source="phone" />
          <BooleanField sortable source="is_primary_contact" label="Primary Contact" />
          <DateField sortable source="created_at" label="Created At" />
          <DateField sortable source="updated_at" label="Updated At" />
        </Datagrid>
      </List>
    </>
  );
};

export default EmployerBenefitsAdminsList;
