import React, { FC } from 'react';

import { EditProps, Edit, SimpleForm } from 'react-admin';

import EssentialForm from './EssentialForm';

const EssentialEdit: FC<EditProps> = (props) => {
  const transform = (data: any) => {
    if (!data.link_url) {
      delete data.link_url;
    }
    if (!data.link_text) {
      delete data.link_text;
    }
    if (!data.description) {
      delete data.description;
    }
    delete data.essential_record;
    delete data.id;
    delete data.insert_date;
    return data;
  };
  return (
    <Edit
      title="Edit Essential"
      {...props}
      mutationMode="pessimistic"
      transform={transform}
    >
      <SimpleForm>
        <EssentialForm />
      </SimpleForm>
    </Edit>
  );
};

export default EssentialEdit;
