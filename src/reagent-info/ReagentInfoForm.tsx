import * as React from 'react';
import {
  TextInput,
  required,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
} from 'react-admin';
import ImageInputUpload from '../components/ImageInputUpload';

const ReagentInfoForm = ({ image }: any) => (
  <>
    <ImageInputUpload image={image} source="coming_soon_image" />
    <TextInput
      autoFocus
      source="title"
      fullWidth
      validate={required()}
    />
    <TextInput
      source="description"
      label="Text"
      multiline
      fullWidth
      validate={required()}
    />
    <ArrayInput source="coming_soon_tag_items">
      <SimpleFormIterator>
        <TextInput source="" label="Tag" />
      </SimpleFormIterator>
    </ArrayInput>
    <SelectInput
      source="info_type"
      style={{ width: '100%' }}
      validate={required()}
      choices={[
        { id: 'INTERACTIONS_WITH_MEDICATIONS', name: 'INTERACTIONS_WITH_MEDICATIONS' },
        { id: 'COMING_SOON', name: 'COMING_SOON' },
        { id: 'AFTER_TEST_REAGENT_RESULTS', name: 'AFTER_TEST_REAGENT_RESULTS' },
        { id: 'AFTER_TEST_BENEFITS', name: 'AFTER_TEST_BENEFITS' },
        { id: 'AFTER_TEST_OPTIMIZE', name: 'AFTER_TEST_OPTIMIZE' },
        { id: 'AFTER_TEST_RECOMMEND', name: 'AFTER_TEST_RECOMMEND' },
        { id: 'AFTER_TEST_EDUCATION', name: 'AFTER_TEST_EDUCATION' },
        { id: 'AFTER_TEST_TRANSITION', name: 'AFTER_TEST_TRANSITION' },
        { id: 'REAGENT_PAGE_OVERVIEW', name: 'REAGENT_PAGE_OVERVIEW' },
        { id: 'REAGENT_PAGE_INTERPRET', name: 'REAGENT_PAGE_INTERPRET' },
        { id: 'REAGENT_PAGE_WHY', name: 'REAGENT_PAGE_WHY' },
        { id: 'REAGENT_PAGE_TIPS', name: 'REAGENT_PAGE_TIPS' },
        { id: 'REAGENT_PAGE_RANGE', name: 'REAGENT_PAGE_RANGE' },
      ]}
    />
  </>
);

export default ReagentInfoForm;
