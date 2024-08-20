import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import {
  EditProps,
  SimpleForm,
  Edit,
  useNotify,
  GetListParams,
  useDataProvider,
} from 'react-admin';
import ReagentLotForm from './ReagentLotForm';

const ReagentLotEdit: FC<EditProps> = (props) => {
  const dataProvider = useDataProvider();
  const [reagents, setReagents] = useState([]);
  const params: GetListParams = { pagination: { page: 1, perPage: 99 }, filter: { show_inactive: true }, sort: { field: 'name', order: 'DESC' } };

  const notify = useNotify();
  useEffect(() => {
    dataProvider.getList('reagent', params)
      .then(({ data }: any) => {
        setReagents(data);
      })
      .catch(() => {
        notify('Failed to load reagents', 'error');
      });
  }, []);

  const transform: any = (data: any) => {
    delete data.id;
    delete data.reagent;

    if (!data.manufacturer) delete data.manufacturer;
    if (!data.reagent_type) delete data.reagent_type;
    if (!data.status) delete data.status;
    return data;
  };

  return (
    <Edit {...props} mutationMode="pessimistic" transform={transform}>
      <SimpleForm>
        <ReagentLotForm reagents={reagents} />
      </SimpleForm>
    </Edit>
  );
};

export default ReagentLotEdit;
