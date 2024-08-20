import * as React from 'react';
import {
  Datagrid,
  List,
  ReferenceField,
  TextField,
} from 'react-admin';

const SubgoalList = (props: any) => (
  <>
    <List pagination={false} {...props} bulkActionButtons={false}>
      <Datagrid rowClick="edit">
        <TextField sortable={false} source="name" />
        <ReferenceField label="Main Goal" source="goal_id" reference="goal">
          <TextField source="name" />
        </ReferenceField>
      </Datagrid>
    </List>
  </>
);

export default SubgoalList;
