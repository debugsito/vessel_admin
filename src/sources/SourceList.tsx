import * as React from 'react';
import {
  Datagrid,
  List,
  TextField,
  UrlField,
} from 'react-admin';

const SourceList = (props: any) => (
  <>
    <List {...props} bulkActionButtons={false} sort={false}>
      <Datagrid rowClick="edit">
        <TextField sortable={false} source="title" />
        <TextField sortable={false} source="author" />
        <TextField sortable={false} source="description" />
        <TextField source="tip_id" />
        <UrlField sortable={false} source="source_url" />
      </Datagrid>
    </List>
  </>
);

export default SourceList;
