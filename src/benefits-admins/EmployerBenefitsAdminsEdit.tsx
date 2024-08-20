import React, { FC } from 'react';
import {
  EditProps, Edit, TabbedForm, FormTab,
} from 'react-admin';
import EmployerBenefitsAdminsForm from './EmployerBenefitsAdminsForm';

const EmployerBenefitsAdminsEdit: FC<EditProps> = (props) => {
  const transform = (data: any) => {
    const includeList = [
      'first_name',
      'last_name',
      'email',
      'phone',
      'is_primary_contact',
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
      title="Edit Benefits Admins"
      {...props}
      mutationMode="pessimistic"
      transform={transform}
    >
      <TabbedForm>
        <FormTab label="General">
          <EmployerBenefitsAdminsForm />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default EmployerBenefitsAdminsEdit;
