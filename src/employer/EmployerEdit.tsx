import React, { FC } from 'react';
import {
  EditProps, Edit, FormTab, TabbedForm,
} from 'react-admin';
import EmployerForm from './EmployerForm';
import EmployerBenefitsAdmins from './EmployerBenefitsAdmins';

const EmployerEdit: FC<EditProps> = (props) => {
  const transform = (data: any) => {
    const includeList = [
      'name',
      'number_of_employees',
      'industry_id',
    ];
    Object.keys(data).forEach((key) => {
      if (includeList.indexOf(key) === -1) {
        delete data[key];
      }
    });
    return data;
  };

  return (
    <Edit
      title="Edit Employer"
      {...props}
      mutationMode="pessimistic"
      transform={transform}
    >
      <TabbedForm>
        <FormTab label="General">
          <EmployerForm />
        </FormTab>
        <FormTab label="Benefits Admins">
          <EmployerBenefitsAdmins {...props} />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default EmployerEdit;
