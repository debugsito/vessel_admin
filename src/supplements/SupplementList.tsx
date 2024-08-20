/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
import * as React from 'react';
import {
  ArrayField,
  Datagrid,
  Identifier,
  List,
  SingleFieldList,
  TextField,
  useRedirect,
} from 'react-admin';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const VesselChip = (data: any) => {
  const redirect = useRedirect();
  const handleGoalClick = () => {
    redirect(`/goal/${data.record.goal_id}`);
  };
  return (
    <Chip
      label={data.record.goal.name}
      color="default"
      onClick={(e) => { e.stopPropagation(); handleGoalClick(); }}
    />
  );
};

VesselChip.propTypes = {
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
};

const SupplementList = (props: any) => {
  const redirect = useRedirect();
  const handleRowClick: any = (id: Identifier, basePath: string, record: any) => {
    redirect(`/supplement/${record.id}`);
  };
  const classes = useStyles();
  return (
    <>
      <List {...props} bulkActionButtons={false}>
        <Datagrid rowClick={handleRowClick}>
          <TextField sortable={false} source="name" />
          <ArrayField sortable={false} source="goals_supplement">
            <SingleFieldList className={classes.root} linkType={false}>
              <VesselChip source="name" />
            </SingleFieldList>
          </ArrayField>
          <TextField sortable={false} source="price" />
          <TextField sortable={false} source="dosage" />
          <TextField sortable={false} source="dosage_unit" />
          <TextField sortable={false} source="volume" />
          <TextField sortable={false} source="description" />
          <TextField sortable={false} source="warning_description" />
        </Datagrid>
      </List>
    </>
  );
};

export default SupplementList;
