import * as React from 'react';
import { FC } from 'react';
import {
  Create,
  CreateProps,
  SimpleForm,
} from 'react-admin';

import LifestyleRecommendationForm from './LifestyleRecommendationForm';

export const styles = {
  price: { width: '7em' },
  width: { width: '7em' },
  height: { width: '7em' },
  stock: { width: '7em' },
  widthFormGroup: { display: 'inline-block' },
  heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const LifestyleRecommendationCreate: FC<CreateProps> = (props) => (
  <Create title="Create Lifestyle Recommendation" {...props}>
    <SimpleForm>
      <LifestyleRecommendationForm />
    </SimpleForm>
  </Create>
);

export default LifestyleRecommendationCreate;
