import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import {
  EditProps,
  Edit,
  useNotify,
  TabbedForm,
  FormTab,
  useEditController,
} from 'react-admin';
import TipForm from './TipForm';
import TipTags from './TipTags';
import LessonTip from './LessonTip';

const TipEdit: FC<EditProps> = (props) => {
  const transform = (data: any) => {
    delete data.total_likes;
    delete data.like_status;
    delete data.id;
    delete data.contact;
    delete data.goals;
    delete data.reagents;
    delete data.sources;
    delete data.tip_id;
    delete data.tip_tags;
    delete data.subgoal_id;
    delete data.lessons;
    delete data.time_per_day;
    delete data.time_option;
    delete data.likes_count;
    delete data.dislikes_count;
    if (!data.description) {
      data.description = '';
    }
    if (!data.image_url) delete data.image_url;
    return data;
  };
  const { record, loaded }: any = useEditController(props);
  const [itemImageURL, setItemImageURL] = useState('');
  useEffect(() => {
    if (loaded) {
      setItemImageURL(record.image_url);
    }
  }, [loaded]);
  const notify = useNotify();
  const handleSuccess = () => {
    notify('Updated successfully.');
  };

  return (
    <Edit actions={<></>} {...props} onSuccess={handleSuccess} mutationMode="pessimistic" transform={transform}>
      <TabbedForm>
        <FormTab label="General Information">
          <br />
          <TipForm image={itemImageURL} />
        </FormTab>
        <FormTab label="Tags">
          <br />
          <TipTags {...props} />
        </FormTab>
        <FormTab label="Lessons">
          <br />
          <LessonTip {...props} />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default TipEdit;
