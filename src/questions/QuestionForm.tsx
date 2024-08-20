import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  TextInput,
  required,
  BooleanInput,
  RadioButtonGroupInput,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
// @ts-ignore
import MarkdownInput from 'ra-input-markdown';
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
  layoutsContainer: {
    '& .MuiButtonBase-root': {
      display: 'none',
    },
    '& .MuiFormControlLabel-root': {
      paddingTop: 20,
      paddingRight: 10,
      paddingLeft: 10,
      alignItems: 'flex-start',
    },
    '& .MuiTypography-root img': {
      border: '3px solid transparent',
    },
    '& .Mui-checked + .MuiTypography-root img': {
      border: '3px solid #000000',
    },
  },
};
const useStyles = makeStyles(styles);

const QuestionForm = ({ image, tipImage }: any) => {
  const [itemImageURL, setItemImageURL] = useState('');
  const [tipImageURL, setTipImageURL] = useState('');
  const classes = useStyles();

  useEffect(() => {
    setItemImageURL(image ?? '');
    setTipImageURL(tipImage ?? '');
  }, [tipImage, image]);

  const handleImageUpload = (url: string) => {
    setItemImageURL(url);
  };

  const OptionRenderer = ({ record }: any) => {
    const { id, name } = record;
    return (
      <Tooltip title={id} aria-label={id}>
        <img
          style={{ width: 100 }}
          src={`assets/images/layouts/${name}`}
          alt=""
        />
      </Tooltip>
    );
  };

  return (
    <>
      <Card style={{ width: '100%', marginBottom: 15 }}>
        <CardContent>
          <Typography style={{ marginBottom: 15 }}>Question Image</Typography>
          <div className={classes.itemImage}>
            {itemImageURL !== '' && <img src={itemImageURL} alt="" />}
            <UploadDialog upload={handleImageUpload} />
          </div>
          <ImageInput url={itemImageURL} source="image" />
        </CardContent>
      </Card>
      <RadioButtonGroupInput
        source="image_alignment"
        choices={[
          { id: 'CENTER', name: 'CENTER' },
          { id: 'LEFT', name: 'LEFT' },
          { id: 'RIGHT', name: 'RIGHT' },
        ]}
      />

      <RadioButtonGroupInput
        className={classes.layoutsContainer}
        source="layout"
        optionText={<OptionRenderer />}
        choices={[
          { id: 'LAYOUT1', name: 'layout_1.png' },
          { id: 'LAYOUT2', name: 'layout_2.png' },
          { id: 'LAYOUT3', name: 'layout_3.png' },
          { id: 'LAYOUT4', name: 'layout_4.png' },
        ]}
      />
      <Card style={{ width: '100%', marginBottom: 15 }}>
        <CardContent>
          <Typography style={{ marginBottom: 15 }}>Tip Image</Typography>
          <div className={classes.itemImage}>
            {tipImageURL !== '' && <img src={tipImageURL} alt="" />}
            <UploadDialog upload={(url: string) => setTipImageURL(url)} />
          </div>
          <ImageInput url={tipImageURL} source="tip_image" />
        </CardContent>
      </Card>
      <RadioButtonGroupInput
        source="tip_image_alignment"
        choices={[
          { id: 'CENTER', name: 'CENTER' },
          { id: 'LEFT', name: 'LEFT' },
          { id: 'RIGHT', name: 'RIGHT' },
        ]}
      />
      <RadioButtonGroupInput
        source="type"
        choices={[
          { id: 'INPUT', name: 'INPUT' },
          { id: 'QUIZ', name: 'QUIZ' },
          { id: 'SURVEY', name: 'SURVEY' },
          { id: 'READONLY', name: 'READONLY' },
        ]}
      />
      <MarkdownInput
        autoFocus
        multiline
        fullWidth
        validate={required()}
        source="text"
      />
      <TextInput
        autoFocus
        source="internal_title"
        label="Header Text"
        fullWidth
      />

      <TextInput source="tip_text" multiline fullWidth />
      <TextInput source="success_heading" multiline fullWidth />
      <TextInput source="success_text" multiline fullWidth />
      <TextInput source="placeholder_text" multiline fullWidth />
      <BooleanInput source="is_skippable" fullWidth />
    </>
  );
};

export default QuestionForm;
