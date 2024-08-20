import * as React from 'react';
import { FC } from 'react';
import {
  Create,
  NumberInput,
  TextInput,
  required,
  CreateProps,
  SimpleForm,
  ArrayInput,
  SimpleFormIterator,
  ReferenceInput,
  SelectInput,
  useRedirect,
  useNotify,
} from 'react-admin';

const PriceCreate: FC<CreateProps> = (props) => {
  const redirect = useRedirect();
  const notify = useNotify();

  const handleSuccess = () => {
    redirect('/product');
    notify('Created successfully.');
  };

  return (
    <Create {...props} onSuccess={handleSuccess}>
      <SimpleForm>
        <ArrayInput source="prices">
          <SimpleFormIterator>
            <ReferenceInput
              fullWidth
              label="Product"
              source="product_id"
              reference="product"
              perPage={99}
            >
              <SelectInput validate={required()} fullwidth optionText="title" />
            </ReferenceInput>
            <TextInput
              label="Currency"
              source="currency"
              fullWidth
              validate={required()}
            />
            <NumberInput
              label="Price"
              source="price"
              onWheel={(event: any) => event.target.blur()}
              fullWidth
              validate={required()}
            />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Create>
  );
};

export default PriceCreate;
