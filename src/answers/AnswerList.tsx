import * as React from 'react';
import {
  BooleanField,
  Datagrid,
  ImageField,
  List,
  TextField,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  question_image: {
    width: '70px',
    height: '70px',
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.12)',
    borderRadius: 4,
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      margin: '0',
      padding: '6px',
      boxSizing: 'border-box',
    },
  },
}));

const AnswerList = (props: any) => {
  const classes = useStyles();

  return (
    <>
      <List {...props} bulkActionButtons={false}>
        <Datagrid rowClick="edit">
          <ImageField sortable={false} className={classes.question_image} source="image" />
          <TextField sortable={false} source="primary_text" />
          <TextField sortable={false} source="secondary_text" />
          <BooleanField sortable={false} source="is_incorrect" />
        </Datagrid>
      </List>
    </>
  );
};

export default AnswerList;
