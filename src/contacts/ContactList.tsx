import * as React from 'react';
import {
  Datagrid,
  Filter,
  List,
  TextField,
  TextInput,
  useListContext,
} from 'react-admin';
import MergeContactsButton from './MergeContactsButton';

const ContactBulkActionButtons = (props: any) => {
  const { data } = useListContext();
  return (
    <>
      <MergeContactsButton {...props} data={data} />
    </>
  );
};

const ContactFilter = (props: any) => (
  <Filter {...props}>
    <TextInput label="Search by email or name..." style={{ minWidth: 250 }} source="search" alwaysOn />
    {/* <BooleanInput label="BendAdmin" source="is_bendadmin" alwaysOn /> */}
  </Filter>
);

const ContactList = (props: any) => (
  <>
    <List {...props} sort={{ field: 'id', order: 'DESC' }} filters={<ContactFilter />} bulkActionButtons={<ContactBulkActionButtons />}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="email" />
        <TextField source="first_name" />
        <TextField source="last_name" />
        <TextField source="weight`" />
        <TextField source="height" />
        <TextField source="gender" />
        <TextField source="birth_date" />
        <TextField source="is_bendadmin" label="Is BendAdmin" />
      </Datagrid>
    </List>
  </>
);

export default ContactList;
