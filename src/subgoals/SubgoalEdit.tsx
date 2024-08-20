import * as React from 'react';
import { FC } from 'react';
import {
  EditProps, Edit, FormTab, TabbedForm,
} from 'react-admin';
import SubgoalGeneralForm from './SubgoalForm';

export const styles = {
  price: { width: '7em' },
  width: { width: '7em' },
  height: { width: '7em' },
  stock: { width: '7em' },
  widthFormGroup: { display: 'inline-block' },
  heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const SubgoalEdit: FC<EditProps> = (props) => (
  <Edit
    actions={<></>}
    {...props}
    mutationMode="pessimistic"
  >
    <TabbedForm>
      <FormTab label="General Information">
        <SubgoalGeneralForm />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default SubgoalEdit;
