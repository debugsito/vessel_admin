import * as React from 'react';
import { FC } from 'react';
import {
  Create,
  CreateProps,
  SimpleForm,
} from 'react-admin';
import ProductForm from './ProductForm';

const ProductCreate: FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <ProductForm />
    </SimpleForm>
  </Create>
);

export default ProductCreate;
