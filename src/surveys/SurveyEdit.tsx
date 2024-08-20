import * as React from 'react';
import { useState, FC } from 'react';

import {
  TextInput,
  required,
  EditProps,
  SimpleForm,
  Edit,
} from 'react-admin';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SurveyQuestions from './SurveyQuestions';

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
  w100: {
    width: '100%',
  },
};
const SurveyEdit: FC<EditProps> = (props) => {
  const transform = (data: any) => {
    delete data.id;
    return data;
  };

  const [expanded, setExpanded] = useState('');
  const handleChange = (panel: string) => {
    if (panel === expanded) setExpanded('');
    else setExpanded(panel);
  };

  return (
    <>
      <br />
      <Accordion expanded={expanded === 'survey-form'} onChange={() => handleChange('survey-form')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="survey-form-header"
        >
          Survey Details
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ width: '100%' }}>
            <Edit {...props} mutationMode="pessimistic" transform={transform}>
              <SimpleForm>
                <TextInput
                  autoFocus
                  source="name"
                  fullWidth
                  validate={required()}
                />
              </SimpleForm>
            </Edit>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'survey-questions'} onChange={() => handleChange('survey-questions')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="survey-questions-header"
        >
          Survey Questions
        </AccordionSummary>
        <AccordionDetails style={{ padding: 0 }}>
          <SurveyQuestions />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default SurveyEdit;
