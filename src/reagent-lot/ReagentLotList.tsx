import * as React from 'react';
import {
  Datagrid,
  List,
  TextField,
} from 'react-admin';

const ReagentLotList = (props: any) => (
  <>
    <List pagination={false} {...props} bulkActionButtons={false}>
      <Datagrid rowClick="edit">
        <TextField sortable={false} source="display_name" />
        <TextField sortable={false} source="reagent.name" />
        <TextField sortable={false} source="manufacturer" />
        <TextField sortable={false} source="part_number" />
        <TextField sortable={false} source="lot_number" />
        <TextField sortable={false} source="reagent_type" />
        <TextField sortable={false} source="revision" />
        <TextField sortable={false} source="status" />
      </Datagrid>
    </List>
  </>
);

export default ReagentLotList;
