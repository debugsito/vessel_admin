import * as React from 'react';
import { useState, useEffect, FC } from 'react';

import {
  EditProps,
  Edit,
  useEditController,
  TabbedForm,
  FormTab,
  useNotify,
} from 'react-admin';

import {
  FoodAllergiesForm, FoodDietsForm, FoodGeneralForm,
} from './FoodForm';
import FoodNutrients from './FoodNutrients';

const FoodEdit: FC<EditProps> = (props) => {
  const [itemImageURL, setItemImageURL] = useState('');
  const { record, loaded } : any = useEditController(props);
  useEffect(() => {
    if (loaded) setItemImageURL(record?.image_url);
  }, [loaded]);

  const notify = useNotify();
  const handleSuccess = () => {
    notify('Food updated successfully.');
  };

  const transform = (data: any) => {
    delete data.nutrients;
    delete data.goals;
    if (!data.food_categories) data.food_categories = [];
    Object.keys(data).forEach((key) => {
      if (data[key] === null) delete data[key];
    });
    return data;
  };

  return (
    <>
      <br />
      <br />
      <Edit {...props} actions={<></>} mutationMode="pessimistic" transform={transform} onSuccess={handleSuccess}>
        <TabbedForm>
          <FormTab label="General Information">
            <br />
            <FoodGeneralForm image={itemImageURL} />
          </FormTab>
          <FormTab label="Nutrients">
            <FoodNutrients {...props} />
          </FormTab>
          <FormTab label="Allergies">
            <FoodAllergiesForm />
          </FormTab>
          <FormTab label="Diets">
            <FoodDietsForm />
          </FormTab>
        </TabbedForm>
      </Edit>
    </>
  );
};

export default FoodEdit;
