/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import * as React from 'react';
import {
  BooleanField,
  Datagrid,
  Filter,
  ImageField,
  List,
  Pagination,
  RichTextField,
  TextField,
  TextInput,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  question_image: {
    width: '70px',
    height: '70px',
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.12)',
    borderRadius: 4,
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

export const layouts: any = {
  LAYOUT1: 'layout_1.png',
  LAYOUT2: 'layout_2.png',
  LAYOUT3: 'layout_3.png',
  LAYOUT4: 'layout_4.png',
};
export const LayoutField = ({ source, record = {} }: any) => <img style={{ width: 80 }} src={`assets/images/layouts/${layouts[record[source]]}`} alt="" />;

LayoutField.propTypes = {
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
};

const PostPagination = (props: any) => (
  <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100, 200]} {...props} />
);

const QuestionFilter = (props: any) => (
  <Filter {...props}>
    <TextInput
      label="Search by text..."
      style={{ minWidth: 250 }}
      source="search"
      alwaysOn
    />
  </Filter>
);

const QuestionList = (props: any) => {
  const classes = useStyles();

  return (
    <>
      <List
        {...props}
        bulkActionButtons={false}
        pagination={<PostPagination />}
        perPage={10}
        filters={<QuestionFilter />}
      >
        <Datagrid rowClick="edit">
          <ImageField sortable={false} className={classes.question_image} source="image" />
          <TextField sortable={false} source="text" />
          <LayoutField source="layout" />
          <RichTextField sortable source="type" />
          <RichTextField sortable={false} source="tip_text" />
          <RichTextField sortable={false} source="success_heading" />
          <RichTextField sortable={false} source="success_text" />
          <BooleanField sortable={false} source="is_skippable" />
        </Datagrid>
      </List>
    </>
  );
};

export default QuestionList;
