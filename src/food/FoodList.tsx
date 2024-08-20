import * as React from 'react';
import {
  Datagrid,
  Filter,
  ImageField,
  List,
  SelectArrayInput,
  TextField,
  TextInput,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  min_100: {
    minWidth: '100px',
  },
  min_180: {
    minWidth: '180px',
  },
  food_image: {
    width: '70px',
    height: '70px',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      margin: '0',
      padding: '6px',
      boxSizing: 'border-box',
    },
  },
}));

const FoodFilter = (props: any) => {
  const classes = useStyles();
  return (
    <Filter {...props}>
      <TextInput label="Search" source="food_title" alwaysOn />
      <SelectArrayInput
        alwaysOn
        className={classes.min_100}
        source="diets"
        choices={[
          { id: 'vegetarian', name: 'vegetarian' },
          { id: 'vegan', name: 'vegan' },
          { id: 'lowSugar', name: 'lowSugar' },
          { id: 'lowCalorie', name: 'lowCalorie' },
          { id: 'lowCarb', name: 'lowCarb' },
        ]}
      />
      <SelectArrayInput
        alwaysOn
        className={classes.min_180}
        source="food_categories"
        choices={[
          { id: 'vegetables', name: 'vegetables' },
          { id: 'fruit', name: 'fruit' },
          { id: 'meat/fish', name: 'meat/fish' },
          { id: 'nuts', name: 'nuts' },
        ]}
      />
      <SelectArrayInput
        alwaysOn
        className={classes.min_180}
        source="allergies"
        choices={[
          { id: 'peanuts', name: 'peanuts' },
          { id: 'soybeans', name: 'soybeans' },
          { id: 'milk', name: 'milk' },
          { id: 'wheat', name: 'wheat' },
          { id: 'seeds', name: 'seeds' },
          { id: 'curstacean', name: 'curstacean' },
          { id: 'gluten', name: 'gluten' },
          { id: 'treeNuts', name: 'treeNuts' },
          { id: 'fish', name: 'fish' },
          { id: 'eggs', name: 'eggs' },
        ]}
      />
    </Filter>
  );
};

const FoodList = (props: any) => {
  const classes = useStyles();

  return (
    <>
      <List {...props} bulkActionButtons={false} filters={<FoodFilter />} sort={false}>
        <Datagrid rowClick="edit">
          <ImageField className={classes.food_image} sortable={false} source="image_url" />
          <TextField sortable={false} source="food_title" />
          <TextField sortable={false} source="popularity" />
          <TextField sortable={false} source="nutrient_Magnesium" label="Magnesium" />
          <TextField sortable={false} source="nutrient_VitaminB7" label="Vitamin B7" />
          <TextField sortable={false} source="nutrient_VitaminB9" label="Vitamin B9" />
          <TextField sortable={false} source="serving_grams" />
          <TextField sortable={false} source="serving_quantity" />
          <TextField sortable={false} source="serving_unit" />
        </Datagrid>
      </List>
    </>
  );
};

export default FoodList;
