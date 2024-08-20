import * as React from 'react';
import { FC } from 'react';
import {
  EditProps,
  SimpleForm,
  Edit,
  useNotify,
  useRedirect,
  Toolbar,
  SaveButton,
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

const ReagentInfoEdit: FC<EditProps> = (props) => {
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
    if (!data.coming_soon_image) delete data.coming_soon_image;
    delete data.reagent_id;
    delete data.id;

    // eslint-disable-next-line consistent-return
    return data;
  };

  const handleSuccess = () => {
    if (!queryParams.reagent_id) return;
    redirect(`/reagent/${queryParams.reagent_id}`);
    notify('Updated successfully.');
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const EditToolbar = (props: any) => (
    <Toolbar {...props}>
      <SaveButton />
    </Toolbar>
  );

  return (
    <Edit {...props} mutationMode="pessimistic" transform={transform} onSuccess={handleSuccess}>
      <SimpleForm toolbar={<EditToolbar />}>
        <ReagentInfoForm />
      </SimpleForm>
    </Edit>
  );
};

export default ReagentInfoEdit;
