import React, { FC } from 'react';

import {
  EditProps, Edit, TabbedForm, FormTab,
} from 'react-admin';

import LessonForm from './LessonForm';
import LessonQuestions from './LessonQuestion';
import CreateQuestion from './CreateQuestion';
import LessonsCurriculumAssociation from './LessonCurriculumAssociation';

const LessonEdit: FC<EditProps> = (props) => {
  const transform = (data: any) => {
    const removeKeys = [
      'is_in_use',
      'created_at',
      'updated_at',
      'updated_by',
      'question_count',
      'question_ids',
      'curriculums',
      'questions',
      'completed',
      'like_status',
      'total_likes',
    ];

    Object.keys(data).forEach((key) => {
      if (removeKeys.includes(key)) {
        delete data[key];
      }
    });
    if (!data.internal_title) {
      delete data.internal_title;
    }
    if (!data.duration) {
      delete data.duration;
    }
    if (!data.image_url) {
      delete data.image_url;
    }

    if (!data.link_url) {
      delete data.link_url;
    }
    if (!data.link_text) {
      delete data.link_text;
    }
    if (!data.description) {
      delete data.description;
    }
    delete data.curriculum_record;
    delete data.id;
    delete data.insert_date;
    return data;
  };
  return (
    <Edit
      title="Edit Lesson"
      {...props}
      mutationMode="pessimistic"
      transform={transform}
    >
      <TabbedForm>
        <FormTab label="Lesson">
          <LessonForm {...props} />
          <LessonsCurriculumAssociation {...props} />
          <CreateQuestion {...props} />
        </FormTab>
        <FormTab label="Questions">
          <LessonQuestions {...props} />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default LessonEdit;
