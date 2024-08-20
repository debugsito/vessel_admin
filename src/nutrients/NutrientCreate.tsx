/* eslint-disable array-callback-return */
import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import {
  NumberInput,
  required,
  SimpleForm,
  SelectInput,
  useRedirect,
  useNotify,
  Create,
  CreateProps,
  GetListParams,
  useDataProvider,
} from 'react-admin';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const NutrientCreate: FC<CreateProps> = (props) => {
  const nutrientNames: any = {
    Magnesium: 'Magnesium',
    B7: 'VitaminB7',
    // "": "VitaminB12",
    B9: 'VitaminB9',
    'Vitamin C': 'VitaminC',
    // "": "Tryptophan"
  };

  const [reagents, setReagents]: any = useState([]);
  const notify = useNotify();
  let localReagents: any = [];
  const dataProvider = useDataProvider();
  const params: GetListParams = { pagination: { page: 1, perPage: 99 }, filter: null, sort: { field: 'name', order: 'DESC' } };
  useEffect(() => {
    dataProvider.getList('reagent', params)
      .then(({ data }: any) => {
        const tempReagents: any = [];
        data.map((reagent: any) => {
          // eslint-disable-next-line no-prototype-builtins
          if (nutrientNames.hasOwnProperty(reagent?.name)) tempReagents.push(reagent);
        });
        localReagents = [...tempReagents];
        setReagents([...tempReagents]);
      })
      .catch(() => {
        notify('Failed to load reagents', 'error');
      });
  }, []);

  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const redirect = useRedirect();

  const transform = (data: any) => {
    // eslint-disable-next-line array-callback-return
    localReagents.map((r: any) => {
      if (data.reagent_id === r.id) data.name = nutrientNames[r?.name];
    });
    data.food_id = parseInt(`${queryParams.food_id}`, 10);
    return data;
  };

  useEffect(() => {
    if (!queryParams.food_id) {
      redirect('/food');
      notify('Food id is required.', 'error');
    }
  }, []);

  const handleSuccess = () => {
    if (queryParams.food_id) redirect(`/food/${queryParams.food_id}/1`);
    notify('Created successfully.');
  };

  return (
    <Create {...props} transform={transform} onSuccess={handleSuccess}>
      <SimpleForm>
        {/* <ReferenceInput fullWidth label="Reagent"
        source="reagent_id" reference="reagent" validate={[required()]}>
        </ReferenceInput> */}
        <SelectInput
          fullWidth
          source="reagent_id"
          optionText="name"
          choices={reagents}
        />
        <NumberInput
          source="quantity"
          onWheel={(event: any) => event.target.blur()}
          fullWidth
          validate={required()}
        />
        <NumberInput
          source="serving_grams"
          onWheel={(event: any) => event.target.blur()}
          disabled
          defaultValue={100}
          fullWidth
          validate={required()}
        />

      </SimpleForm>
    </Create>
  );
};

export default NutrientCreate;
