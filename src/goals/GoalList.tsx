import * as React from 'react';
import {
  Datagrid,
  List,
  TextField,
} from 'react-admin';

const GoalList = (props: any) => (
  <>
    <List pagination={false} {...props} bulkActionButtons={false}>
      <Datagrid rowClick="edit">
        <TextField sortable={false} source="name" />
      </Datagrid>
    </List>
  </>
);

export default GoalList;
