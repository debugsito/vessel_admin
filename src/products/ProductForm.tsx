import React, { useState, useEffect } from 'react';

import {
  TextInput,
  required,
  BooleanInput,
  SelectInput,
} from 'react-admin';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ImageInput from '../components/ImageInput';
import UploadDialog from '../components/UploadDialog';

export const styles = {
  itemImage: {
    display: 'flex',
    gap: '15px',
    alignItems: 'flex-end',
    width: 'max-content',
    '& img': {
      width: 180,
    },
  },
};
const useStyles = makeStyles(styles);

const ProductForm = ({ image }: any) => {
  const [itemImageURL, setItemImageURL] = useState('');
  const classes = useStyles();
  useEffect(() => {
    setItemImageURL(image);
  }, [image]);

  const handleImageUpload = (url: string) => {
    setItemImageURL(url);
  };

  return (
    <>
      <Card style={{ width: '100%', marginBottom: 15 }}>
        <CardContent>
          <Typography style={{ marginBottom: 15 }}>
            Product Image
          </Typography>
          <div className={classes.itemImage}>
            <img src={itemImageURL} alt="" />
            <UploadDialog upload={handleImageUpload} />
          </div>
          <ImageInput url={itemImageURL} source="image_url" />
        </CardContent>
      </Card>
      <TextInput
        source="title"
        fullWidth
        validate={required()}
      />
      <SelectInput
        source="product_type"
        fullWidth
        validate={required()}
        choices={[
          { id: 'SUPPLEMENT', name: 'SUPPLEMENT' },
          { id: 'WELLNESS_CARD', name: 'WELLNESS_CARD' },
          { id: 'REPLACEMENT_CARD', name: 'REPLACEMENT_CARD' },
          { id: 'WELLNESS_CARD_REFILL', name: 'WELLNESS_CARD_REFILL' },
        ]}
      />
      <TextInput
        source="shopify_product_id"
        fullWidth
        validate={required()}
      />
      <TextInput
        source="shopify_variant_id"
        fullWidth
        validate={required()}
      />
      <TextInput
        source="unit"
        fullWidth
        validate={required()}
      />
      <SelectInput
        source="quantity"
        fullWidth
        validate={required()}
        choices={[
          { id: 1, name: '1' },
          { id: 4, name: '4' },
          { id: 30, name: '30' },
        ]}
      />
      <SelectInput
        source="commitment_month"
        fullWidth
        validate={required()}
        choices={[
          { id: 1, name: '1' },
          { id: 6, name: '6' },
          { id: 12, name: '12' },
        ]}
      />
      <BooleanInput
        source="is_active"
        fullWidth
        validate={required()}
      />
    </>
  );
};

export default ProductForm;
