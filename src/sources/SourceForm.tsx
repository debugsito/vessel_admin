import * as React from 'react';
import {
  TextInput,
  required,
  ReferenceInput,
  SelectInput,
} from 'react-admin';
import ImageInputUpload from '../components/ImageInputUpload';

const SourceForm = ({ image }: any) => (
  <>
    <ImageInputUpload image={image} source="image_url" />
    <TextInput
      autoFocus
      source="title"
      fullWidth
    />
    <TextInput
      source="description"
      fullWidth
      multiline
    />
    <TextInput
      source="author"
      fullWidth
      multiline
    />
    <TextInput
      source="source_url"
      fullWidth
      multiline
      validate={required()}
    />
    <ReferenceInput
      fullWidth
      label="Reagent"
      source="reagent_id"
      reference="reagent"
    >
      <SelectInput
        fullWidth
        optionText="name"
      />
    </ReferenceInput>
    <ReferenceInput
      fullWidth
      label="Tip"
      source="tip_id"
      reference="tip"
    >
      <SelectInput
        fullWidth
        optionText="title"
      />
    </ReferenceInput>
  </>
);

export default SourceForm;
