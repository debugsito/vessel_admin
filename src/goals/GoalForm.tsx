import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextInput, required } from 'react-admin';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
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
    marginBottom: 20,
    width: 'max-content',
    '& img': {
      width: 180,
    },
  },
};
const useStyles = makeStyles(styles);

const GoalGeneralForm = ({ largeImage, mediumImage, smallImage }: any) => {
  const [itemLargeImageURL, setItemLargeImageURL] = useState('');
  const [itemMediumImageURL, setItemMediumImageURL] = useState('');
  const [itemSmallImageURL, setItemSmallImageURL] = useState('');
  const classes = useStyles();
  useEffect(() => {
    if (largeImage) setItemLargeImageURL(largeImage);
    if (mediumImage) setItemMediumImageURL(mediumImage);
    if (smallImage) setItemSmallImageURL(smallImage);
  }, [largeImage, mediumImage, smallImage]);

  const handleLargeImageUpload = (url: string) => {
    setItemLargeImageURL(url);
  };

  const handleMediumImageUpload = (url: string) => {
    setItemMediumImageURL(url);
  };

  const handleSmallImageUpload = (url: string) => {
    setItemSmallImageURL(url);
  };

  return (
    <>
      <TextInput
        autoFocus
        source="name"
        fullWidth
        validate={required()}
      />
      <Card style={{ width: '100%', marginBottom: 15 }}>
        <CardContent>
          <Typography style={{ marginBottom: 15 }}>
            Large Image
          </Typography>
          <div className={classes.itemImage}>
            <img src={itemLargeImageURL} alt="" />
            <UploadDialog upload={handleLargeImageUpload} />
          </div>
          <ImageInput url={itemLargeImageURL} source="image_large_url" />
        </CardContent>
      </Card>
      <Card style={{ width: '100%', marginBottom: 15 }}>
        <CardContent>
          <Typography style={{ marginBottom: 15 }}>
            Medium Image
          </Typography>
          <div className={classes.itemImage}>
            <img src={itemMediumImageURL} alt="" />
            <UploadDialog upload={handleMediumImageUpload} />
          </div>
          <ImageInput url={itemMediumImageURL} source="image_medium_url" />
        </CardContent>
      </Card>
      <Card style={{ width: '100%', marginBottom: 15 }}>
        <CardContent>
          <Typography style={{ marginBottom: 15 }}>
            Small Image
          </Typography>
          <div className={classes.itemImage}>
            <img src={itemSmallImageURL} alt="" />
            <UploadDialog upload={handleSmallImageUpload} />
          </div>
          <ImageInput url={itemSmallImageURL} source="image_small_url" />
        </CardContent>
      </Card>
    </>
  );
};

export default GoalGeneralForm;
