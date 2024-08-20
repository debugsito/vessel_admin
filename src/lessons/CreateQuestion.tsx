import * as React from 'react';
import { FC, useState, useEffect } from 'react';
import {
  EditProps,
  useEditController,
  useNotify,
  useRefresh,
} from 'react-admin';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import EditLessonQuestionAnswers from './EditLessonQuestionAnswers';
import CreateLessonQuestionAnswers from './CreateLessonQuestionAnswers';

const API_URL = process.env.REACT_APP_API_URL;

const CreateQuestion: FC<EditProps> = (props) => {
  const [fullQuestions, setFullQuestions]: any = useState({});
  const [lessonQuestions, setLessonQuestions]: any = useState({});
  const [addQuestionToggle, setAddQuestionToggle]: any = useState(false);
  const [expanded, setExpanded] = useState('');
  const handleChange = (panel: string) => {
    if (panel === expanded) setExpanded('');
    else setExpanded(panel);
  };
  const { record, loaded }: any = useEditController(props);

  const refresh = useRefresh();

  const notify = useNotify();

  const getQuestions = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
    if (record && record && record.question_ids) {
      Object.keys(record.question_ids).forEach(async (index) => {
        const questionId = record.question_ids[index];

        const { data: axiosQuestions } = await axios.get(
          `${API_URL}/question/${questionId}`,
          { headers },
        );

        const tempFullQuestions = fullQuestions;
        tempFullQuestions[questionId] = axiosQuestions;
        setFullQuestions(tempFullQuestions);

        axios
          .get(`${API_URL}/lesson/${record.id}/question/${questionId}`, {
            headers,
          })
          .then((data: any) => {
            const tempLessonQuestions = data.data;
            const tempQuestions = lessonQuestions;
            tempQuestions[questionId] = tempLessonQuestions;
            setLessonQuestions(tempQuestions);
          })
          .catch((error) => {
            console.log(error);
            notify(
              `Failed to get Lesson Lesson with id:${questionId}`,
              'error',
            );
          });
      });
    }
  };

  const toggleAddQuestion = (value: any) => {
    setAddQuestionToggle(value);
    if (!value) {
      refresh();
      getQuestions();
    }
  };

  useEffect(() => {
    if (loaded) {
      getQuestions();
    }
  }, [loaded, props]);
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
          Questions
        </AccordionSummary>
        {loaded
          && record
          && record.questions
          && lessonQuestions
          && fullQuestions
          && Object.entries(lessonQuestions)
            .sort(([, a]: any, [, b]: any) => (a.question_sequence > b.question_sequence ? 1 : -1))
            .map(([key, lessonQuestion]: any) => {
              const question = fullQuestions[key];
              const propLessonQuestion = {
                ...props,
                lessonQuestion,
                question,
              };
              return (
                <AccordionDetails key={key} style={{ flexDirection: 'column' }}>
                  <EditLessonQuestionAnswers
                    toggleAddQuestion={toggleAddQuestion}
                    {...propLessonQuestion}
                  />
                </AccordionDetails>
              );
            })}
      </Accordion>
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={() => toggleAddQuestion(true)}
      >
        Add Question
      </Button>
      {addQuestionToggle ? (
        <CreateLessonQuestionAnswers
          toggleAddQuestion={toggleAddQuestion}
          {...props}
        />
      ) : null}
    </>
  );
};

export default CreateQuestion;
