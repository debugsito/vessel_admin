import * as React from 'react';
import {
  Datagrid,
  List,
  TextField,
} from 'react-admin';

const SurveyList = (props: any) => (
  <>
    <List {...props} bulkActionButtons={false}>
      <Datagrid rowClick="edit">
        <TextField sortable={false} source="name" />
      </Datagrid>
    </List>
  </>
);

export default SurveyList;
