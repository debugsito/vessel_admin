import * as React from 'react';
import { FC } from 'react';
import { Create, CreateProps, SimpleForm } from 'react-admin';
import QuestionForm from './QuestionForm';

export const styles = {
  price: { width: '7em' },
  width: { width: '7em' },
  height: { width: '7em' },
  stock: { width: '7em' },
  widthFormGroup: { display: 'inline-block' },
  heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const validURL = (str: any) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' // protocol
      + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
      + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
      + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
      + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
      + '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(str);
};

const QuestionCreate: FC<CreateProps> = (props) => {
  const transform = (data: any) => {
    if (!data.image || !validURL(data.image)) delete data.image;
    if (!data.tip_image || !validURL(data.tip_image)) delete data.tip_image;
    if (!data.tip_ids) {
      data.tip_ids = [];
    }

    return data;
  };
  return (
    <Create {...props} transform={transform}>
      <SimpleForm>
        <QuestionForm />
      </SimpleForm>
    </Create>
  );
};

export default QuestionCreate;
