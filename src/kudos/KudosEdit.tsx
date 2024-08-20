import React, { FC } from 'react';

import { EditProps, Edit, SimpleForm } from 'react-admin';

import KudosForm from './KudosForm';

const KudosEdit: FC<EditProps> = (props) => {
  const transform = (data: any) => {
    function removeNulls(obj: any) {
      Object.entries(obj).forEach(([key, value]) => {
        if (value === null || value === undefined || key === 'id') {
          delete obj[key];
        }
      });
    }
    removeNulls(data);
    return data;
  };
  return (
    <Edit
      title="Edit Kudos"
      {...props}
      mutationMode="pessimistic"
      transform={transform}
    >
      <SimpleForm>
        <KudosForm />
      </SimpleForm>
    </Edit>
  );
};

export default KudosEdit;
