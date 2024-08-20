import * as React from 'react';
import {
  BooleanField,
  Datagrid,
  Filter,
  ImageField,
  List,
  SelectInput,
  TextField,
  TextInput,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(() => ({
  min_100: {
    minWidth: '100px',
  },
  min_180: {
    minWidth: '180px',
  },
  image: {
    width: '90px',
    height: '90px',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      margin: '0',
      padding: '6px',
      boxSizing: 'border-box',
    },
  },
}));

const ProductFilter = (props: any) => {
  const classes = useStyles();
  return (
    <Filter {...props}>
      <TextInput label="Price Group" source="price_group" alwaysOn />
      <TextInput label="Contact Id" source="contact_id" alwaysOn />
      <SelectInput
        alwaysOn
        className={classes.min_180}
        source="product_type"
        choices={[
          { id: 'SUPPLEMENT', name: 'SUPPLEMENT' },
          { id: 'WELLNESS_CARD', name: 'WELLNESS_CARD' },
          { id: 'REPLACEMENT_CARD', name: 'REPLACEMENT_CARD' },
          { id: 'WELLNESS_CARD_REFILL', name: 'WELLNESS_CARD_REFILL' },
        ]}
      />

    </Filter>
  );
};

const ProductList = (props: any) => {
  const classes = useStyles();
  return (
    <>
      <div style={{ paddingTop: 15, paddingBottom: 15, marginLeft: 'auto' }}>
        <Link to="/price/create" style={{ textDecoration: 'none' }}>
          <Button startIcon={<AddIcon />} variant="contained" color="primary" style={{ minWidth: 200 }}>
            Add Prices
          </Button>
        </Link>
      </div>
      <List pagination={false} {...props} bulkActionButtons={false} filters={<ProductFilter />}>
        <Datagrid rowClick="edit">
          <ImageField className={classes.image} sortable={false} source="image_url" />
          <TextField sortable={false} source="title" />
          <TextField sortable={false} source="product_type" />
          <BooleanField sortable={false} source="is_active" />
          <TextField sortable={false} source="shopify_product_id" />
          <TextField sortable={false} source="shopify_variant_id" />
        </Datagrid>
      </List>
    </>
  );
};

export default ProductList;
