import React, { useState, useEffect } from 'react';

import {
  NumberInput,
  SelectInput,
  TextInput,
  required,
  SimpleFormIterator,
  ArrayInput,
  BooleanInput,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import UploadDialog from '../components/UploadDialog';
import ImageInput from '../components/ImageInput';

export const styles = {
  price: { width: '7em' },
  width: { width: '7em' },
  height: { width: '7em' },
  stock: { width: '7em' },
  widthFormGroup: { display: 'inline-block' },
  heightFormGroup: { display: 'inline-block', marginLeft: 32 },
  itemImage: {
    display: 'flex',
    gap: '15px',
    alignItems: 'flex-end',
    marginBottom: 20,
    width: 'max-content',
    '& img': {
      width: 180,
    },
  },
};

const useStyles = makeStyles(styles);

export const FoodGeneralForm = ({ image }: any) => {
  const classes = useStyles();
  const [itemImageURL, setItemImageURL] = useState('');

  const handleImageUpload = (url: string) => {
    setItemImageURL(url);
  };

  useEffect(() => {
    if (image) {
      setItemImageURL(image);
    }
  }, [image]);

  return (
    <>
      <div className={classes.itemImage}>
        <img src={itemImageURL} alt="" />
        <UploadDialog upload={handleImageUpload} />
      </div>
      <ImageInput url={itemImageURL} source="image_url" />

      <TextInput
        autoFocus
        source="food_title"
        fullWidth
        validate={required()}
      />
      <NumberInput
        source="serving_grams"
        onWheel={(event: any) => event.target.blur()}
        fullWidth
        validate={required()}
      />
      <NumberInput
        source="serving_quantity"
        onWheel={(event: any) => event.target.blur()}
        fullWidth
        validate={required()}
      />
      <TextInput
        source="serving_unit"
        fullWidth
        validate={required()}
      />
      <NumberInput
        source="popularity"
        onWheel={(event: any) => event.target.blur()}
        fullWidth
        validate={required()}
      />
      <NumberInput
        source="usda_ndb_number"
        fullWidth
        validate={required()}
      />
      <ArrayInput source="food_categories">
        <SimpleFormIterator>
          <SelectInput
            source=""
            optionText="name"
            optionValue="id"
            choices={[
              { id: 'vegetables', name: 'vegetables' },
              { id: 'fruit', name: 'fruit' },
              { id: 'meat/fish', name: 'meat/fish' },
              { id: 'nuts', name: 'nuts' },
            ]}
          />
        </SimpleFormIterator>
      </ArrayInput>
    </>
  );
};

export const FoodNutrientsForm = () => (
  <>
    ...
  </>
);

export const FoodAllergiesForm = () => (
  <>
    <BooleanInput label="allergy_milk" source="allergy_milk" />
    <BooleanInput label="allergy_eggs" source="allergy_eggs" />
    <BooleanInput label="allergy_fish" source="allergy_fish" />
    <BooleanInput label="allergy_curstacean" source="allergy_curstacean" />
    <BooleanInput label="allergy_treeNuts" source="allergy_treeNuts" />
    <BooleanInput label="allergy_peanuts" source="allergy_peanuts" />
    <BooleanInput label="allergy_wheat" source="allergy_wheat" />
    <BooleanInput label="allergy_soybeans" source="allergy_soybeans" />
    <BooleanInput label="allergy_gluten" source="allergy_gluten" />
    <BooleanInput label="allergy_seeds" source="allergy_seeds" />
  </>
);

export const FoodDietsForm = () => (
  <>
    <BooleanInput label="diet_keto" source="diet_keto" />
    <BooleanInput label="diet_lowCalorie" source="diet_lowCalorie" />
    <BooleanInput label="diet_lowCarb" source="diet_lowCarb" />
    <BooleanInput label="diet_lowFat" source="diet_lowFat" />
    <BooleanInput label="diet_lowSugar" source="diet_lowSugar" />
    <BooleanInput label="diet_paleo" source="diet_paleo" />
  </>
);
