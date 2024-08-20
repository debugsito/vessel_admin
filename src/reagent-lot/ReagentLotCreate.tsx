import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import {
  Create,
  CreateProps,
  GetListParams,
  SaveButton,
  SimpleForm,
  Toolbar,
  useDataProvider,
  useNotify,
} from 'react-admin';
import ReagentLotForm from './ReagentLotForm';

const EditToolbar = (props: any) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);
const ReagentLotCreate: FC<CreateProps> = (props) => {
  const dataProvider = useDataProvider();
  const [reagents, setReagents] = useState([]);
  const notify = useNotify();
  const params: GetListParams = { pagination: { page: 1, perPage: 99 }, filter: { show_inactive: true }, sort: { field: 'name', order: 'DESC' } };

  useEffect(() => {
    dataProvider.getList('reagent', params)
      .then(({ data }: any) => {
        setReagents(data);
      })
      .catch(() => {
        notify('Failed to load reagents', 'error');
      });
  }, []);

  return (
    <Create {...props}>
      <SimpleForm toolbar={<EditToolbar />}>
        <ReagentLotForm reagents={reagents} />
      </SimpleForm>
    </Create>
  );
};

export default ReagentLotCreate;
