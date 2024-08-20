import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  SimpleForm, Create, useEditController, useNotify,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import LessonQuestionForm from './LessonQuestionForm';
import QuestionAnswers from '../questions/QuestionAnswers';

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
const API_URL = process.env.REACT_APP_API_URL;

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

const CreateLessonQuestionAnswers = (props: any) => {
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
    if (!data.type) delete data.type;
    if (!data.tip_ids) {
      data.tip_ids = [];
    }
    delete data.id;
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
  const initialQuestionProp = {
    basePath: '/question',
    resource: 'question',
    id: '0',
    record: {
      text: '',
      type: '',
      placeholder_text: '',
      image: '',
      tip_image: '',
      tip_text: '',
      image_alignment: '',
      tip_image_alignment: '',
      layout: '',
      success_heading: '',
      success_text: '',
      is_skippable: false,
      tip_ids: [],
    },
  };
  const { record, loaded }: any = useEditController(props);
  const [itemImageURL, setItemImageURL] = useState('');
  const [showAnswers, setShowAnswers] = useState(false);

  const [questionId, setQuestionId] = useState(0);

  useEffect(() => {
    if (loaded) {
      setItemImageURL(record?.image);
    }
  }, [loaded]);

  const [expanded, setExpanded] = useState('');
  const classes = useStyles();
  const handleChange = (panel: string) => {
    if (panel === expanded) setExpanded('');
    else setExpanded(panel);
  };

  const notify = useNotify();

  const associateLessonQuestion = (newQuestionId: any) => {
    console.log('association Props', props);
    const newSequence = props?.record?.question_ids
      ? props.record.question_ids.length + 1
      : 1;
    const data: any = {
      question_id: newQuestionId,
      lesson_id: Number(props.id),
      question_sequence: newSequence,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
    axios
      .post(`${API_URL}/lesson/question`, data, { headers })
      .then(() => {
        notify('Question Associated with Lesson Successfully.');
      })
      .catch((error) => {
        console.log(error);
        notify('Failed to create lesson to question association', 'error');
      });
  };

  const handleQuestionSuccess = (data: any) => {
    console.log(data);
    const {
      data: { id: successQuestionId },
    } = data;
    setQuestionId(successQuestionId);
    associateLessonQuestion(successQuestionId);
    setShowAnswers(true);
    props.toggleAddQuestion();
    notify('Created Question Successfully.');
  };

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
          New Page
        </AccordionSummary>
        {loaded ? (
          <AccordionDetails>
            <Create
              {...initialQuestionProp}
              className={classes.w100}
              transform={transform}
              onSuccess={handleQuestionSuccess}
            >
              <SimpleForm>
                <LessonQuestionForm image={itemImageURL} />
              </SimpleForm>
            </Create>
          </AccordionDetails>
        ) : null}
      </Accordion>
      {showAnswers ? (
        <Accordion
          expanded={expanded === 'question-answers'}
          onChange={() => handleChange('question-answers')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id="question-answers-header"
          >
            Answers
          </AccordionSummary>

          <AccordionDetails style={{ padding: 0 }}>
            {loaded ? <QuestionAnswers id={questionId} /> : null}
          </AccordionDetails>
        </Accordion>
      ) : null}
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={() => props.toggleAddQuestion(false)}
      >
        Done
      </Button>
    </>
  );
};

export default CreateLessonQuestionAnswers;
