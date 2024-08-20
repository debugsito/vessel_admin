import * as React from 'react';
import {
  Datagrid,
  Filter,
  List,
  TextField,
  TextInput,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  filtersContainer: {
    width: '100%',
    marginTop: 0,
    '& *': {
      width: '100%',
    },
  },
});

const CardFilter = (props: any) => {
  const classes = useStyles();
  return (
    <Filter {...props} className={classes.filtersContainer}>
      <TextInput fullWidth label="Search by uuid" source="uuid" alwaysOn />
    </Filter>
  );
};

const WellnessCardList = (props: any) => (
  <>
    <List perPage={25} {...props} bulkActionButtons={false} filters={<CardFilter />}>
      <Datagrid rowClick="edit">
        <TextField sortable={false} source="uuid" />
        <TextField sortable={false} source="version" />
        <TextField sortable={false} source="insert_date" />
        <TextField sortable={false} source="update_date" />
        <TextField sortable={false} source="wellness_card_batch_id" />
        <TextField sortable={false} source="station" />
        <TextField sortable={false} source="calibration_mode" />
        <TextField sortable={false} source="orca_sheet_name" />
        <TextField sortable={false} source="orca_row_id" />
        <TextField sortable={false} source="orca_user_email" />
      </Datagrid>
    </List>
  </>
);

export default WellnessCardList;
