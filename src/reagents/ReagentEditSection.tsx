import React, { useState, useEffect } from 'react';

import {
  NumberInput,
  TextInput,
  required,
  SimpleForm,
  Edit,
  SelectInput,
  useEditController,
  useNotify,
  GetListParams,
  useDataProvider,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

export const styles = {
  w100: { width: '100%' },
};

const useStyles = makeStyles(styles);

const ReagentEditSection = (props: any) => {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const { record, loaded }: any = useEditController(props);

  useEffect(() => {
    if (loaded) {
      setTitle(`${record?.name}`);
    }
  }, [loaded]);

  const notify = useNotify();
  const handleSuccess = () => {
    notify('Reagent updated successfully.');
  };

  const transform = (data: any) => {
    if (!data.reagent_type) delete data.reagent_type;
    if (!data.supplement_id) delete data.supplement_id;
    delete data.id;
    delete data.buckets;
    delete data.info;
    return data;
  };

  const [supplements, setSupplements] = useState([]);
  const [supplementsLoading, setSupplementsLoading] = useState(true);
  const dataProvider = useDataProvider();
  const params: GetListParams = { pagination: { page: 1, perPage: 99 }, filter: null, sort: { field: 'name', order: 'DESC' } };
  useEffect(() => {
    dataProvider.getList('supplement', params)
      .then(({ data }: any) => {
        setSupplements(data);
      })
      .catch((error) => {
        notify('Failed to load supplements', error);
      })
      .finally(() => setSupplementsLoading(false));
  }, []);

  return (
    <div className={classes.w100}>
      <Edit title={title} {...props} mutationMode="pessimistic" transform={transform} onSuccess={handleSuccess}>
        <SimpleForm>
          <TextInput
            autoFocus
            source="name"
            fullWidth
            validate={required()}
          />
          <TextInput
            autoFocus
            source="unit"
            fullWidth
            validate={required()}
          />
          <TextInput
            autoFocus
            source="consumption_unit"
            fullWidth
            validate={required()}
          />
          <NumberInput
            autoFocus
            source="recommended_daily_allowance"
            onWheel={(event: any) => event.target.blur()}
            fullWidth
            validate={required()}
          />
          <SelectInput
            style={{ width: '100%' }}
            source="reagent_type"
            validate={required()}
            choices={[
              { name: 'Colorimetric', id: 'Colorimetric' },
              { name: 'LFA', id: 'LFA' },
            ]}
          />
          <SelectInput
            style={{ width: '100%' }}
            source="state"
            validate={required()}
            choices={[
              { name: 'ACTIVE', id: 'ACTIVE' },
              { name: 'COMING_SOON', id: 'COMING_SOON' },
              { name: 'INACTIVE', id: 'INACTIVE' },
            ]}
          />
          {supplementsLoading && <LinearProgress />}
          {!supplementsLoading && <SelectInput fullWidth choices={supplements} label="Supplement" optionText="name" source="supplement_id" />}
        </SimpleForm>
      </Edit>
    </div>
  );
};

export default React.memo(ReagentEditSection);
