import * as React from 'react';
import {
  Datagrid,
  Filter,
  List,
  SelectInput,
  TextField,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  min_180: {
    minWidth: '180px',
  },
}));

const ReagentFilter = (props: any) => {
  const classes = useStyles();
  return (
    <Filter {...props}>
      <SelectInput
        alwaysOn
        className={classes.min_180}
        label="Filter"
        source="show_inactive"
        choices={[
          { id: 1, name: 'Show inactive' },
        ]}
      />

    </Filter>
  );
};

const ReagentList = (props: any) => (
  <>
    <List pagination={false} {...props} bulkActionButtons={false} filters={<ReagentFilter />}>
      <Datagrid rowClick="show">
        <TextField sortable={false} source="name" />
        <TextField sortable={false} source="reagent_type" />
        <TextField sortable={false} source="unit" />
        <TextField sortable={false} source="consumption_unit" />
        <TextField sortable={false} source="recommended_daily_allowance" />
        <TextField sortable={false} source="state" />
      </Datagrid>
    </List>
  </>
);

export default ReagentList;
