import * as React from 'react';
import {
  ArrayField,
  BooleanField,
  BooleanInput,
  Datagrid,
  Filter,
  List,
  NumberField,
  NumberInput,
  SingleFieldList,
  TextField,
  TextInput,
  useRedirect,
} from 'react-admin';
import Chip from '@material-ui/core/Chip';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  image: {
    width: '120px',
    height: '120px',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      margin: '0',
      padding: '6px',
      boxSizing: 'border-box',
    },
  },
  min_180: {
    minWidth: '180px',
  },
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

  const { record } = data;
  const handleGoalClick = () => {
    redirect(`/goal/${record.id}`);
  };
  return (
    <Chip
      label={record.name}
      color="default"
      onClick={(e) => {
        e.stopPropagation();
        handleGoalClick();
      }}
    />
  );
};

const PlanFilter = (props: any) => (
  <Filter {...props}>
    <TextInput label="Search" source="title" />
    <BooleanInput
      label="Program Template"
      source="is_program_template"
      alwaysOn
    />
    <NumberInput label="Tip Id" source="tip_id" />
    <NumberInput label="Food Id" source="food_id" />
    <NumberInput label="Contact Id" source="contact_id" />

    <NumberInput
      label="Reagent Lifestyle Recommendation Id"
      source="reagent_lifestyle_recommendation_id"
    />
  </Filter>
);

const PlanList = (props: any) => {
  const classes = useStyles();

  return (
    <>
      <List
        title="Plans"
        {...props}
        bulkActionButtons={false}
        filters={<PlanFilter />}
      >
        <Datagrid rowClick="edit">
          <TextField sortable source="id" />
          <BooleanField sortable source="is_program_template" />
          <BooleanField sortable source="is_supplements" />
          <TextField sortable source="contact_id" />
          <TextField sortable source="tip.title" />
          <NumberField sortable source="food_id" />
          <NumberField sortable source="reagent_lifestyle_recommendation_id" />
          <ArrayField sortable={false} source="goals">
            <SingleFieldList className={classes.root} linkType={false}>
              <VesselChip source="name" />
            </SingleFieldList>
          </ArrayField>
          <TextField sortable source="day_of_week" />
          <TextField sortable source="total_likes" />
        </Datagrid>
      </List>
    </>
  );
};

export default PlanList;
