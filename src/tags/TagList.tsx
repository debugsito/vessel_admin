import * as React from 'react';
import {
  BooleanField,
  Datagrid,
  List,
  TextField,
} from 'react-admin';

const GoalList = (props: any) => (
  <>
    <List pagination={false} {...props} bulkActionButtons={false} sort={false}>
      <Datagrid rowClick="edit">
        <TextField sortable={false} source="title" />
        <BooleanField sortable={false} style={{ display: 'flex', justifyContent: 'center' }} textAlign="center" source="is_active" />
      </Datagrid>
    </List>
  </>
);

export default GoalList;
