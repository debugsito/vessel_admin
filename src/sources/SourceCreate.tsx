import * as React from 'react';
import { FC } from 'react';
import {
  Create,
  CreateProps,
  SimpleForm,
} from 'react-admin';
import SourceForm from './SourceForm';

const SourceCreate: FC<CreateProps> = (props) => {
  const transform = (data: any) => {
    if (!data.image_url) delete data.image_url;
    return data;
  };

  return (
    <Create {...props} transform={transform}>
      <SimpleForm>
        <SourceForm />
      </SimpleForm>
    </Create>
  );
};

export default SourceCreate;
