import * as React from 'react';
import {
  Datagrid,
  Filter,
  List,
  NumberField,
  Pagination,
  TextField,
  TextInput,
} from 'react-admin';

const PostPagination = (props: any) => (
  <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100, 200]} {...props} />
);

const LessonFilter = (props: any) => (
  <Filter {...props}>
    <TextInput
      label="Search by title or internal title..."
      style={{ minWidth: 250 }}
      source="search"
      alwaysOn
    />
  </Filter>
);
const LessonList = (props: any) => {
  const postRowStyle = () => ({
    height: '35px',
  });

  return (
    <>
      <List
        title="Lessons"
        {...props}
        bulkActionButtons={false}
        pagination={<PostPagination />}
        perPage={10}
        filters={<LessonFilter />}
      >
        <Datagrid rowStyle={postRowStyle} rowClick="edit">
          <NumberField source="id" />
          <TextField sortable source="title" />
          <TextField sortable source="internal_title" />
          <NumberField sortable source="duration" />
          <TextField sortable source="description" />
        </Datagrid>
      </List>
    </>
  );
};

export default LessonList;
