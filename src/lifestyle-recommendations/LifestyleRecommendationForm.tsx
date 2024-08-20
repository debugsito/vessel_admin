import React, { useState, useEffect } from 'react';
import {
  TextInput,
  required,
} from 'react-admin';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ImageInput from '../components/ImageInput';
import UploadDialog from '../components/UploadDialog';

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
    width: 'max-content',
    '& img': {
      width: 180,
    },
  },
};

const useStyles = makeStyles(styles);

const Form = (props:any) => {
  // eslint-disable-next-line react/prop-types
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { record: { image_url } }:any = props;
  const image = image_url;
  const classes = useStyles();
  const [itemImageURL, setItemImageURL] = useState('');
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
        autoFocus
        source="activity_name"
        fullWidth
        validate={required()}
      />
      <TextInput
        autoFocus
        source="description"
        fullWidth
      />
    </>
  );
};

export default Form;
