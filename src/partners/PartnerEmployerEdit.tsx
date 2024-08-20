import React, { FC } from 'react';
import {
  EditProps,
  Edit,
  TabbedForm,
  FormTab,
  CardActions,
} from 'react-admin';
import PartnerEmployer from './PartnerEmployer';

const PartnerEmployerEdit: FC<EditProps> = (props) => {
  const transform = (data: any) => {
    const includeList = ['code', 'title'];
    Object.keys(data).forEach((key) => {
      if (includeList.indexOf(key) === -1) {
        delete data[key];
      }
    });
    return data;
  };

  const NoneActions = () => (
    <CardActions />
  );

  return (
    <Edit
      title="Edit Employee Benefits"
      {...props}
      mutationMode="pessimistic"
      transform={transform}
    >
      <TabbedForm toolbar={<NoneActions />}>
        <FormTab label="Employee Benefits">
          <PartnerEmployer {...props} />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default PartnerEmployerEdit;
