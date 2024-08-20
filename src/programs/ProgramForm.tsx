import React, { useState, useEffect } from 'react';
import {
  ArrayInput,
  CheckboxGroupInput,
  TextInput,
  required,
  ReferenceInput,
  SelectInput,
  AutocompleteInput,
  NumberInput,
  SimpleFormIterator,
} from 'react-admin';
import { useFormState } from 'react-final-form';

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

const optionRenderer = (choice: any) => {
  if (!choice) {
    return '';
  }
  return `${choice.first_name} ${choice.last_name} (${choice.email})`;
};

const planRenderer = (choice: any) => {
  if (!choice) {
    return '';
  }
  return `${choice.id} - ${choice?.tip?.title}`;
};

const handleContactReviewers = (data: any) => data;

const handlePlans = (data: any) => data.id;

const formatDifficulty = (data: String) => {
  if (data.length > 1) {
    data = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
  }
  return data;
};

const getPlanIdOptions = () => {
  const { values } = useFormState();
  const record = values;
  let choices = [];
  if (typeof record.plans !== 'undefined') {
    choices = record?.plans.map((plan: any, index: any) => {
      let planName = '';
      let planId = null;
      if (typeof plan !== 'undefined') {
        if (typeof plan?.tip?.title !== 'undefined') {
          planName = `${plan.id} - ${plan?.tip?.title}`;
          planId = plan.id;
        }
        if (Number.isInteger(plan)) {
          planId = plan;
        }
        return {
          key: index,
          id: planId,
          name: planName,
        };
      }
      return {
        key: index,
        id: planId,
        name: planName,
      };
    });
  }
  return choices;
};

const Form = (props: any) => {
  // eslint-disable-next-line react/prop-types
  /* eslint-disable @typescript-eslint/naming-convention */
  const {
    record: { image_url },
  }: any = props;
  const image = image_url;

  /* eslint-disable @typescript-eslint/naming-convention */
  const classes = useStyles();
  const [itemImageURL, setItemImageURL] = useState('');
  useEffect(() => {
    setItemImageURL(image);
  }, [image]);

  const minimumLetters = (val: any) => val.trim().length > 3;

  const handleImageUpload = (url: string) => {
    setItemImageURL(url);
  };

  const choices = getPlanIdOptions();

  return (
    <>
      <Card style={{ width: '100%', marginBottom: 15 }}>
        <CardContent>
          <Typography style={{ marginBottom: 15 }}>Program Image</Typography>
          <div className={classes.itemImage}>
            <img src={itemImageURL} alt="" />
            <UploadDialog upload={handleImageUpload} />
          </div>
          <ImageInput url={itemImageURL} source="image_url" />
        </CardContent>
      </Card>
      <TextInput autoFocus source="title" fullWidth validate={required()} />
      <TextInput
        multiline
        autoFocus
        source="description"
        fullWidth
        validate={required()}
      />
      <SelectInput
        source="difficulty"
        style={{ width: '100%' }}
        choices={[
          { id: 'Hard', name: 'Hard' },
          { id: 'Med', name: 'Medium' },
          { id: 'Easy', name: 'Easy' },
        ]}
        validate={required()}
        format={formatDifficulty}
      />
      <NumberInput
        autoFocus
        source="time_per_day"
        onWheel={(event: any) => event.target.blur()}
        fullWidth
      />
      <ReferenceInput
        fullWidth
        label="Main Goal"
        source="main_goal_id"
        validate={required()}
        reference="goal"
      >
        <SelectInput fullWidth optionText="name" />
      </ReferenceInput>

      <ReferenceInput
        fullWidth
        label="Contact"
        source="contact_id"
        reference="contacts"
        filterToQuery={(searchText) => ({ search: searchText })}
        validate={required()}
      >
        <AutocompleteInput
          optionText={optionRenderer}
          shouldRenderSuggestions={minimumLetters}
        />
      </ReferenceInput>

      <ArrayInput source="reviewed_contact_ids" parse={handleContactReviewers}>
        <SimpleFormIterator>
          <ReferenceInput
            fullWidth
            label="Reviewer Contact"
            source=""
            reference="contacts"
            filterToQuery={(searchText) => ({ search: searchText })}
            initialValue={[]}
          >
            <AutocompleteInput
              optionText={optionRenderer}
              resettable
              clearAlwaysVisible
              shouldRenderSuggestions={minimumLetters}
            />
          </ReferenceInput>
          {' '}
        </SimpleFormIterator>
      </ArrayInput>

      <ArrayInput source="plans" parse={handlePlans}>
        <SimpleFormIterator>
          <ReferenceInput
            fullWidth
            label="Plans"
            source=""
            reference="plan"
            filterToQuery={(searchText) => ({ title: searchText })}
            enableGetChoices={(q: any) => q.length >= 2}
          >
            <AutocompleteInput
              optionText={planRenderer}
              resettable
              clearAlwaysVisible
              shouldRenderSuggestions={minimumLetters}
            />
          </ReferenceInput>
        </SimpleFormIterator>
      </ArrayInput>
      <h4> Schedule Builder</h4>
      <NumberInput
        autoFocus
        source="duration_days"
        onWheel={(event: any) => event.target.blur()}
        fullWidth
        validate={required()}
      />
      <ArrayInput source="schedule" parse={handlePlans}>
        <SimpleFormIterator>
          <CheckboxGroupInput
            source="plan_ids"
            choices={choices}
            optionText="name"
            optionValue="id"
          />
        </SimpleFormIterator>
      </ArrayInput>
      {}
    </>
  );
};

export default Form;
