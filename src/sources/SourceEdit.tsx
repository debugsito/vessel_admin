import * as React from 'react';
import { useState, useEffect, FC } from 'react';

import {
  EditProps,
  SimpleForm,
  Edit,
  useEditController,
} from 'react-admin';
import SourceForm from './SourceForm';

const SourceEdit: FC<EditProps> = (props) => {
  const { record, loaded }: any = useEditController(props);
  const [itemImageURL, setItemImageURL] = useState('');
  useEffect(() => {
    if (loaded) {
      setItemImageURL(record.image_url);
    }
  }, [loaded]);

  const transform = (data: any) => {
    delete data.id;
    if (!data.reagent_id) delete data.reagent_id;
    if (!data.tip_id) delete data.tip_id;
    if (!data.image_url) delete data.image_url;
    if (!data.title) data.title = '';
    if (!data.description) data.description = '';
    if (!data.author) data.author = '';
    return data;
  };
  return (
    <Edit {...props} mutationMode="pessimistic" transform={transform}>
      <SimpleForm>
        <SourceForm image={itemImageURL} />
      </SimpleForm>
    </Edit>
  );
};

export default SourceEdit;
