import React, { FC } from 'react';

import {
  EditProps,
  Edit,
  SimpleForm,
} from 'react-admin';

import LifestyleRecommendationForm from './LifestyleRecommendationForm';

const LifestyleRecommendationEdit: FC<EditProps> = (props) => {
  const transform = (data: any) => {
    delete data.id;
    delete data.description;
    delete data.extra_images;
    delete data.likes_count;
    delete data.total_likes;
    delete data.dislikes_count;
    return data;
  };
  return (
    <Edit title="Edit Lifestyle Recommendation" {...props} mutationMode="pessimistic" transform={transform}>
      <SimpleForm>
        <LifestyleRecommendationForm />
      </SimpleForm>
    </Edit>
  );
};

export default LifestyleRecommendationEdit;
