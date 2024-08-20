import * as React from 'react';
import { FC } from 'react';
import {
  NumberInput,
  required,
  EditProps,
  SimpleForm,
  Edit,
  ReferenceInput,
  SelectInput,
  useRedirect,
  useNotify,
} from 'react-admin';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const NutrientEdit: FC<EditProps> = (props) => {
  const transform = (data: any) => {
    delete data.id;
    delete data.name;
    delete data.serving_grams;
    delete data.food_id;
    return data;
  };

  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const redirect = useRedirect();
  const notify = useNotify();

  const handleSuccess = () => {
    if (queryParams.food_id) redirect(`/food/${queryParams.food_id}/1`);
    notify('Updated successfully.');
  };

  return (
    <Edit {...props} mutationMode="pessimistic" transform={transform} onSuccess={handleSuccess}>
      <SimpleForm>
        <NumberInput
          autoFocus
          source="quantity"
          onWheel={(event: any) => event.target.blur()}
          fullWidth
          validate={required()}
        />
        <ReferenceInput fullWidth label="Reagent" source="reagent_id" reference="reagent" validate={[required()]}>
          <SelectInput fullWidth optionText="name" />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
};

export default NutrientEdit;
