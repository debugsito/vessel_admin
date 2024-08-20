import React, { FC } from 'react';

import {
  EditProps,
  Edit,
  SimpleForm,
} from 'react-admin';

import PlanForm from './PlanForm';

const PlanEdit: FC<EditProps> = (props) => {
  const transform = (data: any) => {
    delete data.id;
    return data;
  };
  return (
    <Edit title="Edit Plan" {...props} mutationMode="pessimistic" transform={transform}>
      <SimpleForm>
        <PlanForm />
      </SimpleForm>
    </Edit>
  );
};

export default PlanEdit;
