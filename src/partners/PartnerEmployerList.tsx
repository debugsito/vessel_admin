import * as React from 'react';
import {
  Datagrid,
  Filter,
  List,
  TextField,
  TextInput,
  DateField,
  CardActions,
} from 'react-admin';

const BendAdminFilter = (props: any) => (
  <Filter {...props}>
    <TextInput
      label="Search by email or name..."
      style={{ minWidth: 250 }}
      source="search"
      alwaysOn
    />
  </Filter>
);

const PartnerEmployerList = (props: any) => {
  const postRowStyle = () => ({
    height: '35px',
  });

  const NoneActions = () => (
    <CardActions />
  );

  return (
    <>
      <List
        title="Employee Benefits"
        {...props}
        bulkActionButtons={false}
        actions={<NoneActions />}
        filters={<BendAdminFilter />}
      >
        <Datagrid rowStyle={postRowStyle} rowClick="edit">
          <TextField source="id" label="ID" />
          <TextField source="email" />
          <TextField source="first_name" label="First Name" />
          <TextField source="last_name" label="Last Name" />
          <DateField source="last_login" label="Last Login" />
          <DateField source="insert_date" label="Created At" />
        </Datagrid>
      </List>
    </>
  );
};

export default PartnerEmployerList;
