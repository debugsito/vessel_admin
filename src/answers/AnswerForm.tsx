import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  TextInput,
  BooleanInput,
  SelectInput,
  ReferenceInput,
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
      width: 120,
    },
  },
};
const useStyles = makeStyles(styles);

const AnswerForm = ({ image }: any) => {
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
            Answer Image
          </Typography>
          <div className={classes.itemImage}>
            <img src={itemImageURL} alt="" />
            <UploadDialog upload={handleImageUpload} />
          </div>
          <ImageInput url={itemImageURL} source="image" />
        </CardContent>
      </Card>
      <TextInput
        autoFocus
        source="primary_text"
        fullWidth
        multiline
      />
      <TextInput
        source="secondary_text"
        multiline
        fullWidth
      />
      <BooleanInput source="is_incorrect" />
      <ReferenceInput fullWidth label="Chained Survey" source="chained_survey_id" reference="survey">
        <SelectInput fullWidth optionText="name" />
      </ReferenceInput>
    </>
  );
};

export default AnswerForm;
