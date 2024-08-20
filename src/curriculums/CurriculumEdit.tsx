import React, { FC } from 'react';

import {
  EditProps, Edit, FormTab, TabbedForm,
} from 'react-admin';

import CurriculumForm from './CurriculumForm';
import CurriculumLessons from './CurriculumLessons';

const CurriculumEdit: FC<EditProps> = (props) => {
  const transform = (data: any) => {
    const includeList = ['goal_id', 'title'];
    Object.keys(data).forEach((key) => {
      if (includeList.indexOf(key) === -1) {
        delete data[key];
      }
    });
    return data;
  };
  return (
    <Edit
      title="Edit Curriculum"
      {...props}
      mutationMode="pessimistic"
      transform={transform}
    >
      <TabbedForm>
        <FormTab label="Curriculum">
          <CurriculumForm />
        </FormTab>
        <FormTab label="Lessons">
          <CurriculumLessons {...props} />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default CurriculumEdit;
