import React, { FC } from 'react';
import {
  EditProps, Edit, TabbedForm, FormTab,
} from 'react-admin';
import EmployerIndustryForm from './EmployerIndustryForm';

const EmployerIndustryEdit: FC<EditProps> = (props) => {
  const transform = (data: any) => {
    const includeList = ['code', 'title'];
    Object.keys(data).forEach((key) => {
      if (includeList.indexOf(key) === -1) {
        delete data[key];
      }
    });
    return data;
  };
  return (
    <Edit
      title="Edit Industry"
      {...props}
      mutationMode="pessimistic"
      transform={transform}
    >
      <TabbedForm>
        <FormTab label="General">
          <EmployerIndustryForm />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default EmployerIndustryEdit;
