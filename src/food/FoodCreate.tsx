import * as React from 'react';
import { FC } from 'react';
import {
  Create,
  CreateProps,
  FormTab,
  TabbedForm,
} from 'react-admin';
import {
  FoodAllergiesForm, FoodDietsForm, FoodGeneralForm,
} from './FoodForm';

const FoodCreate: FC<CreateProps> = (props) => (
  <>
    <br />
    <br />
    <Create {...props}>
      <TabbedForm>
        <FormTab label="General Information">
          <FoodGeneralForm />
        </FormTab>
        <FormTab label="Allergies">
          <FoodAllergiesForm />
        </FormTab>
        <FormTab label="Diets">
          <FoodDietsForm />
        </FormTab>
      </TabbedForm>
    </Create>
  </>
);

export default FoodCreate;
