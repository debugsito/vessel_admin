import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  SimpleForm,
  Edit,
  useEditController,
  useNotify,
  Toolbar,
  SaveButton,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import QuestionSurveys from './QuestionSurveys';
import QuestionForm from './QuestionForm';
import QuestionAnswers from './QuestionAnswers';

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
const useStyles = makeStyles(styles);

const validURL = (str: any) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' // protocol
      + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
      + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
      + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
      + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
      + '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(str);
};

const QuestionEdit = (props: any) => {
  const transform = (data: any) => {
    const removeKeys = ['id', 'created_at', 'updated_at', 'updated_by'];

    Object.keys(data).forEach((key) => {
      if (removeKeys.includes(key)) {
        delete data[key];
      }
    });

    if (!data.placeholder_text) {
      data.placeholder_text = '';
    }
    if (!data.type) delete data?.type;
    delete data?.id;
    if (!data.tip_ids) {
      data.tip_ids = [];
    }
    if (!data.internal_title) {
      delete data.internal_title;
    }
    if (!data.image || !validURL(data.image)) delete data.image;
    if (!data.tip_image || !validURL(data.tip_image)) delete data.tip_image;
    if (!data.tip_text) delete data.tip_text;
    if (!data.image_alignment) delete data.image_alignment;
    if (!data.tip_image_alignment) delete data.tip_image_alignment;
    if (!data.layout) delete data.layout;
    if (!data.success_heading) delete data.success_heading;
    if (!data.success_text) delete data.success_text;
    if (data.is_skippable === null || data.is_skippable === undefined) delete data.is_skippable;
    return data;
  };

  const { record, loaded }: any = useEditController(props);
  const [itemImageURL, setItemImageURL] = useState('');
  const [tipImageURL, setTipImageURL] = useState('');
  // const [currentQuestionProp, setCurrentQuestionProp] = useState({});

  // const updateQuestionProps = () => {
  //   const currentProps = props;
  //   currentProps.record = currentProps.question;
  //   setCurrentQuestionProp(currentProps);
  // };

  useEffect(() => {
    if (loaded) {
      setItemImageURL(record?.image);
      setTipImageURL(record?.tip_image);
      // updateQuestionProps();
    }
    // console.log("currentQuestionProp: ",currentQuestionProp);
  }, [loaded]);

  const [expanded, setExpanded] = useState('');
  const classes = useStyles();
  const handleChange = (panel: string) => {
    if (panel === expanded) setExpanded('');
    else setExpanded(panel);
  };

  const notify = useNotify();
  const handleSuccess = () => {
    notify('Updated successfully.');
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const EditToolbar = (props: any) => (
    <Toolbar {...props}>
      <SaveButton />
    </Toolbar>
  );
  return (
    <>
      <br />
      <Accordion
        expanded={expanded === 'question-form'}
        onChange={() => handleChange('question-form')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="question-form-header"
        >
          Question Details
        </AccordionSummary>
        <AccordionDetails>
          <Edit
            {...props}
            className={classes.w100}
            mutationMode="pessimistic"
            transform={transform}
            onSuccess={handleSuccess}
          >
            <SimpleForm toolbar={<EditToolbar />}>
              <QuestionForm image={itemImageURL} tipImage={tipImageURL} />
            </SimpleForm>
          </Edit>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'question-surveys'}
        onChange={() => handleChange('question-surveys')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="question-surveys-header"
        >
          Question Surveys
        </AccordionSummary>
        <AccordionDetails style={{ padding: 0 }}>
          <QuestionSurveys />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'question-answers'}
        onChange={() => handleChange('question-answers')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="question-answers-header"
        >
          Question Answers
        </AccordionSummary>
        <AccordionDetails style={{ padding: 0 }}>
          <QuestionAnswers {...props} />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default QuestionEdit;
