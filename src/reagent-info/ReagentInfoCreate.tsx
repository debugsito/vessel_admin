import * as React from 'react';
import { FC } from 'react';
import {
  Create,
  CreateProps,
  SimpleForm,
  useNotify,
  useRedirect,
} from 'react-admin';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import ReagentInfoForm from './ReagentInfoForm';

export const styles = {
  price: { width: '7em' },
  width: { width: '7em' },
  height: { width: '7em' },
  stock: { width: '7em' },
  widthFormGroup: { display: 'inline-block' },
  heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const ReagentInfoCreate: FC<CreateProps> = (props) => {
  const redirect = useRedirect();
  const notify = useNotify();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const transform: any = (data: any) => {
    if (!queryParams.reagent_id) {
      redirect(`/reagent/${queryParams.reagent_id}`);
      notify('Something went wrong.');
      return;
    }
    if (!data.coming_soon_tag_items) delete data.coming_soon_tag_items;
    data.reagent_id = parseInt(`${queryParams.reagent_id}`, 10);
    // eslint-disable-next-line consistent-return
    return data;
  };

  const handleSuccess = () => {
    if (!queryParams.reagent_id) return;
    redirect(`/reagent/${queryParams.reagent_id}`);
    notify('Added successfully.');
  };

  return (
    <Create {...props} transform={transform} onSuccess={handleSuccess}>
      <SimpleForm>
        <ReagentInfoForm />
      </SimpleForm>
    </Create>
  );
};

export default ReagentInfoCreate;
