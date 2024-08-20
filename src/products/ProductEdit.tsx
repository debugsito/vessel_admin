import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import {
  EditProps,
  Edit,
  useEditController,
  TabbedForm,
  FormTab,
} from 'react-admin';
import ProductForm from './ProductForm';
import ProductPriceForm from './ProductPriceForm';

const ProductEdit: FC<EditProps> = (props) => {
  const transform = (data: any) => {
    delete data.id;
    delete data.price;
    return data;
  };

  const { record, loaded, loading }: any = useEditController(props);
  const [itemImageURL, setItemImageURL] = useState('');
  useEffect(() => {
    if (loaded) {
      setItemImageURL(record?.image_url);
    }
  }, [loaded, loading]);

  return (
    <Edit actions={<></>} {...props} mutationMode="pessimistic" transform={transform}>
      <TabbedForm>
        <FormTab label="General Information">
          <br />
          <ProductForm image={itemImageURL} />
        </FormTab>
        <FormTab label="Price History">
          <br />
          <ProductPriceForm product={{ ...record }} />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default ProductEdit;
