import * as React from 'react';
import { FC, useState, useEffect } from 'react';
import {
  NumberInput,
  TextInput,
  required,
  EditProps,
  SimpleForm,
  Edit,
  BooleanInput,
  ArrayInput,
  SimpleFormIterator,
  SelectInput,
  useDataProvider,
  GetListParams,
  useNotify,
} from 'react-admin';

export const styles = {
  price: { width: '7em' },
  width: { width: '7em' },
  height: { width: '7em' },
  stock: { width: '7em' },
  widthFormGroup: { display: 'inline-block' },
  heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const SupplementEdit: FC<EditProps> = (props) => {
  const dataProvider = useDataProvider();
  const [goals, setGoals] = useState([]);
  const [supplements, setSupplements] = useState([]);
  const notify = useNotify();

  const transform = (data: any) => {
    if (!data.description) data.description = '';
    if (!data.warning_description) data.warning_description = '';
    if (!data.supplement_association) data.supplement_association = [];
    if (data.supplement_association) {
      data.supplement_association = data.supplement_association.map((supplement: any) => (
        { id: supplement.supplement_id_b, association_type: supplement.association_type }));
    }
    if (!data.goals_supplement) data.goals = [];
    if (data.goals_supplement) {
      data.goals = data.goals_supplement.map((goal: any) => (
        { goal_id: goal.goal_id, impact: goal.impact }));
    }
    if (data.goals_supplement) delete data.goals_supplement;
    if (!data.is_multivitamin) data.is_multivitamin = false;
    return data;
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

  return (
    <Edit {...props} mutationMode="pessimistic" transform={transform}>
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
            <SelectInput fullWidth choices={supplements} validate={required()} label="Supplement" optionText="name" source="supplement_id_b" />
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
        <ArrayInput source="goals_supplement">
          <SimpleFormIterator>
            <SelectInput validate={required()} choices={goals} fullWidth label="Goal" source="goal_id" />
            <NumberInput onWheel={(event: any) => event.target.blur()} validate={required()} source="impact" fullWidth label="Impact" />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
};

export default SupplementEdit;
