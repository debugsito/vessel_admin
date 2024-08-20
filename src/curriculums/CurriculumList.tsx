import * as React from 'react';
import {
  BooleanField,
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from 'react-admin';

const CurriculumList = (props: any) => {
  const postRowStyle = () => ({
    height: '35px',
  });

  return (
    <>
      <List title="Curriculums" {...props} bulkActionButtons={false}>
        <Datagrid rowStyle={postRowStyle} rowClick="edit">
          <NumberField source="id" />
          <TextField sortable source="title" />
          <ReferenceField label="Main Goal" source="goal_id" reference="goal">
            <TextField source="name" />
          </ReferenceField>
          <BooleanField
            sortable={false}
            style={{ display: 'flex', justifyContent: 'center' }}
            textAlign="center"
            source="is_active"
          />
        </Datagrid>
      </List>
    </>
  );
};

export default CurriculumList;
