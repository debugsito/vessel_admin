import * as React from 'react';
import {
  Datagrid,
  List,
  TextField,
  ImageField,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
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
}));

const LifestyleRecommendationList = (props: any) => {
  const classes = useStyles();

  return (
    <>
      <List title="Lifestyle Recommendations" {...props} bulkActionButtons={false}>
        <Datagrid rowClick="edit">
          <ImageField className={classes.image} sortable={false} source="image_url" />
          <TextField sortable={false} source="activity_name" />
          <TextField sortable={false} source="description" />
        </Datagrid>
      </List>
    </>
  );
};

export default LifestyleRecommendationList;
