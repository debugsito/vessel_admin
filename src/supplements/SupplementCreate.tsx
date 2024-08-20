import * as React from 'react';
import { FC, useState, useEffect } from 'react';
import {
  Create,
  NumberInput,
  TextInput,
  required,
  CreateProps,
  SimpleForm,
  BooleanInput,
  SelectInput,
  useNotify,
  useRefresh,
  useRedirect,
  SimpleFormIterator,
  ArrayInput,
  useDataProvider,
  GetListParams,
} from 'react-admin';

export const styles = {
  price: { width: '7em' },
  width: { width: '7em' },
  height: { width: '7em' },
  stock: { width: '7em' },
  widthFormGroup: { display: 'inline-block' },
  heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const SupplementCreate: FC<CreateProps> = (props) => {
  const dataProvider = useDataProvider();
  const [goals, setGoals] = useState([]);
  const [supplements, setSupplements] = useState([]);
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = () => {
    notify('Supplement added');
    redirect('/supplement');
    refresh();
  };

  const params: GetListParams = { pagination: { page: 1, perPage: 99 }, filter: null, sort: { field: 'name', order: 'DESC' } };
  useEffect(() => {
    dataProvider.getList('goal', params)
      .then(({ data }: any) => {
        setGoals(data);
      })
      .catch((error) => {
        notify('Failed to load goals', error);
      });
    dataProvider.getList('supplement', params)
      .then(({ data }: any) => {
        setSupplements(data);
      })
      .catch((error) => {
        notify('Failed to load supplements', error);
      });
  }, []);

  const transform = (data: any) => {
    if (!data.supplement_association) data.supplement_association = [];
    if (!data.goals) data.goals = [];
    if (!data.is_multivitamin) data.is_multivitamin = false;
    return data;
  };

  return (
    <Create {...props} onSuccess={onSuccess} transform={transform}>
      <SimpleForm>
        <TextInput
          autoFocus
          source="name"
          fullWidth
          validate={required()}
        />
        <NumberInput
          autoFocus
          source="dosage"
          onWheel={(event: any) => event.target.blur()}
          fullWidth
          validate={required()}
        />
        <TextInput
          autoFocus
          source="dosage_unit"
          fullWidth
          validate={required()}
        />
        <NumberInput
          autoFocus
          source="volume"
          onWheel={(event: any) => event.target.blur()}
          fullWidth
          validate={required()}
        />
        <NumberInput
          autoFocus
          source="price"
          onWheel={(event: any) => event.target.blur()}
          fullWidth
          validate={required()}
        />
        <TextInput
          multiline
          autoFocus
          source="description"
          fullWidth
        />
        <TextInput
          multiline
          autoFocus
          source="warning_description"
          fullWidth
        />
        <BooleanInput
          source="is_multivitamin"
          fullWidth
        />
        <ArrayInput source="supplement_association">
          <SimpleFormIterator>
            <SelectInput fullWidth choices={supplements} validate={required()} label="Supplement" optionText="name" source="id" />
            <SelectInput
              validate={required()}
              choices={[
                { id: 'EXCLUSION', name: 'EXCLUSION' },
                { id: 'SUGGESTION', name: 'SUGGESTION' },
              ]}
              fullWidth
              label="Association Type"
              source="association_type"
            />
          </SimpleFormIterator>
        </ArrayInput>
        <ArrayInput source="goals">
          <SimpleFormIterator>
            <SelectInput validate={required()} choices={goals} fullWidth label="Goal" source="goal_id" />
            <NumberInput onWheel={(event: any) => event.target.blur()} validate={required()} source="impact" fullWidth label="Impact" />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Create>
  );
};

export default SupplementCreate;
