import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  AutocompleteArrayInput,
  TextInput,
  required,
  BooleanInput,
  RadioButtonGroupInput,
  ReferenceArrayInput,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
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

const LessonQuestionForm = ({ image }: any) => {
  const [itemImageURL, setItemImageURL] = useState('');
  const classes = useStyles();

  useEffect(() => {
    setItemImageURL(image ?? '');
  }, [image]);

  const handleImageUpload = (url: string) => {
    setItemImageURL(url);
  };

  const parseId = (value: any) => {
    console.log(value);
    if (value) {
      return value;
    }
    return value;
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
      <TextInput autoFocus multiline source="internal_title" fullWidth />
      <TextInput source="success_heading" multiline fullWidth />
      <TextInput source="success_text" multiline fullWidth />
      <TextInput source="placeholder_text" multiline fullWidth />
      <BooleanInput source="is_skippable" fullWidth />
      <ReferenceArrayInput
        multiline
        fullWidth
        label="Activities"
        source="tip_ids"
        reference="tip"
        perPage={20}
        // value={tipIds}
        sort={{ field: 'title', order: 'ASC' }}
        // onChange={(e: any) => {
        //   setTipIds(e);
        // }}
        // enableGetChoices={({ q }) => q.length >= 2}
        // filterToQuery={(searchText: any) => ({ search: searchText })}
      >
        <AutocompleteArrayInput
          filterToQuery={(searchText: any) => ({ search: searchText })}
          shouldRenderSuggestions={(val: any) => val.trim().length > 2}
          parse={parseId}
          optionText="title"
        />
      </ReferenceArrayInput>
    </>
  );
};

export default LessonQuestionForm;
