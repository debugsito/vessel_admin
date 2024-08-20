import * as React from 'react';
import { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import UploadDialog from './UploadDialog';
import ImageInput from './ImageInput';

export const styles = {
  itemImage: {
    display: 'flex',
    gap: '15px',
    alignItems: 'flex-end',
    width: 'max-content',
    '& img': {
      width: 120,
    },
  },
};
const useStyles = makeStyles(styles);

const ImageInputUpload = ({ image, source, imageLabel }: any) => {
  const [itemImageURL, setItemImageURL] = useState('');
  const classes = useStyles();

  useEffect(() => {
    setItemImageURL(image ?? '');
  }, [image]);

  const handleImageUpload = (url: string) => {
    setItemImageURL(url);
  };

  return (
    <Card style={{ width: '100%', marginBottom: 15 }}>
      <CardContent>
        <Typography style={{ marginBottom: 15 }}>
          {imageLabel ?? 'Image'}
        </Typography>
        <div className={classes.itemImage}>
          {itemImageURL !== '' && <img src={itemImageURL} alt="" />}
          <UploadDialog upload={handleImageUpload} />
        </div>
        <ImageInput url={itemImageURL} source={source} />
      </CardContent>
    </Card>
  );
};

export default ImageInputUpload;
