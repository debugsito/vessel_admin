import React, { FC } from 'react';

import { EditProps, Edit, SimpleForm } from 'react-admin';

import GroupForm from './GroupForm';

const GroupEdit: FC<EditProps> = (props) => {
  const transform = (data: any) => data;
  return (
    <Edit
      title="Edit Group"
      {...props}
      mutationMode="pessimistic"
      transform={transform}
    >
      <SimpleForm>
        <GroupForm />
      </SimpleForm>
    </Edit>
  );
};

export default GroupEdit;
