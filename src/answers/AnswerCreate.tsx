import * as React from 'react';
import { FC } from 'react';
import {
  Create,
  CreateProps,
  SimpleForm,
  useDataProvider,
  useNotify,
  useRedirect,
} from 'react-admin';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import AnswerForm from './AnswerForm';

const AnswerCreate: FC<CreateProps> = (props) => {
  const redirect = useRedirect();
  const notify = useNotify();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const dataProvider = useDataProvider();
  console.log(props);

  const handleSuccess = ({ data }: any) => {
    if (!queryParams.question_id) return;
    const params: any = { data: { answer_id: data.id }, previousData: {} };
    dataProvider.create(`question/${queryParams.question_id}/answer`, params)
      .then(() => {
        console.log(queryParams.question_id);
        redirect(`/question/${queryParams.question_id}`);
        notify('Added successfully.');
      })
      .catch(() => {
        notify('Failed to assign answer to question', 'error');
      });
  };

  return (
    <Create {...props} onSuccess={handleSuccess}>
      <SimpleForm>
        <AnswerForm />
      </SimpleForm>
    </Create>
  );
};

export default AnswerCreate;
