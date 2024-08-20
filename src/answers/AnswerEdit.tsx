import * as React from 'react';
import { FC, useState, useEffect } from 'react';
import {
  EditProps,
  SimpleForm,
  Edit,
  useEditController,
  useRedirect,
  useNotify,
} from 'react-admin';
import { useLocation } from 'react-router';
import queryString from 'query-string';

import AnswerForm from './AnswerForm';

const AnswerEdit: FC<EditProps> = (props) => {
  const transform = (data: any) => {
    const removeKeys = ['id', 'created_at', 'updated_at', 'updated_by'];

    Object.keys(data).forEach((key) => {
      if (removeKeys.includes(key)) {
        delete data[key];
      }
    });
    delete data.id;
    if (!data.image) delete data.image;
    if (!data.chained_survey_id) delete data.chained_survey_id;
    if (!data.secondary_text) data.secondary_text = '';
    if (!data.primary_text) data.primary_text = '';
    if (!data.is_incorrect) data.is_incorrect = false;
    return data;
  };
  const { record, loaded }: any = useEditController(props);
  const [itemImageURL, setItemImageURL] = useState('');
  useEffect(() => {
    if (loaded) {
      setItemImageURL(record.image);
    }
  }, [loaded]);

  const redirect = useRedirect();
  const notify = useNotify();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const handleSuccess = () => {
    if (queryParams.question_id && queryParams.question_id !== '') redirect(`/question/${queryParams.question_id}`);
    notify('Updated successfully.');
  };

  return (
    <Edit {...props} mutationMode="pessimistic" transform={transform} onSuccess={handleSuccess}>
      <SimpleForm>
        <AnswerForm image={itemImageURL} />
      </SimpleForm>
    </Edit>
  );
};

export default AnswerEdit;
