import * as React from 'react';
import { FC } from 'react';
import {
  EditProps,
  Edit,
  FormTab,
  TabbedForm,
  useNotify,
} from 'react-admin';
import TagForm from './TagForm';
import TagGoals from './TagGoals';
import TagTips from './TagTips';

const TagEdit: FC<EditProps> = (props) => {
  const transform = (data: any) => {
    delete data.id;
    delete data.tag_tips;
    delete data.tag_goals;
    return data;
  };

  const notify = useNotify();
  const handleSuccess = () => {
    notify('Updated successfully.');
  };

  return (
    <Edit actions={<></>} {...props} onSuccess={handleSuccess} mutationMode="pessimistic" transform={transform}>
      <TabbedForm>
        <FormTab label="General Information">
          <br />
          <TagForm />
        </FormTab>
        <FormTab label="Tips">
          <br />
          <TagTips {...props} />
        </FormTab>
        <FormTab label="Goals">
          <br />
          <TagGoals {...props} />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default TagEdit;
