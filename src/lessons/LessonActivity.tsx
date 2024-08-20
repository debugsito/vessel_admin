/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import arrayMutators from 'final-form-arrays';
import { withTypes } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogContent,
  Button,
  CardActions,
} from '@material-ui/core';
import {
  useEditController,
  useNotify,
  useRefresh,
  NumberInput,
} from 'react-admin';
import axios from 'axios';
import DeleteButton from '../components/DeleteButton';
import CreateLessonQuestion from './CreateLessonQuestion';

const API_URL = process.env.REACT_APP_API_URL;

const LessonActivity = (props: any) => {
  const { loaded, record } = useEditController(props);
  const refresh = useRefresh();
  const notify = useNotify();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fullActivities, setFullActivities]: any = useState({});
  const [lessonActivities, setLessonActivity]: any = useState({});

  const getActivities = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
    if (record && record.question_ids) {
      Object.keys(record.question_ids).forEach(async (index) => {
        const mapQuestionId = record.question_ids[index];

        const { data: axiosActivities } = await axios.get(
          `${API_URL}/question/${mapQuestionId}`,
          { headers },
        );

        const tempFullActivities = fullActivities;
        tempFullActivities[mapQuestionId] = axiosActivities;
        setFullActivities(tempFullActivities);

        axios
          .get(`${API_URL}/lesson/${record.id}/question/${mapQuestionId}`, {
            headers,
          })
          .then((data: any) => {
            const tempLessonActivity = data.data;
            const tempActivities = lessonActivities;
            tempActivities[mapQuestionId] = tempLessonActivity;
            setLessonActivity(tempActivities);
          })
          .catch((error) => {
            console.log(error);
            notify(
              `Failed to get Lesson Lesson with id:${mapQuestionId}`,
              'error',
            );
          });
      });
    }
  };

  const useStyles = makeStyles((theme) => ({
    hint: {
      marginTop: '1em',
      display: 'flex',
      justifyContent: 'center',
      color: theme.palette.grey[500],
    },
    form: {
      padding: '0 1em 1em 1em',
    },
    input: {
      marginBottom: '20px',
    },
    actions: {
      padding: '0 1em 1em 1em',
    },
  }));
  const classes = useStyles();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const validate = (values: FormValues) => {
    const errors: FormValues = {};
    return errors;
  };
  interface FormValues {
    tagData?: any;
  }
  const { Form } = withTypes<FormValues>();

  const handleSubmit = (values: FormValues) => {
    const formValues: any = values;
    const axiosValues = {
      question_sequence: formValues.sequence_id,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
    const successMessage = 'Updated successfully';
    const method = 'PUT';
    // const url = `${API_URL}/lesson/${record?.id}/question/${questionId}`;
    // axios
    //   .request({
    //     method,
    //     url,
    //     data: axiosValues,
    //     headers,
    //   })
    //   .then(() => {
    //     notify(successMessage);
    //     setQuestionUpdate(!questionUpdate);
    //   })
    //   .catch((error: any) => {
    //     notify(error?.response?.data?.message ?? "something went wrong");
    //   })
    //   .finally(() => {
    //     getActivities();
    //   });
    setDialogOpen(false);
  };

  const refreshLessonActivity = () => {
    refresh();
    getActivities();
  };

  useEffect(() => {
    if (loaded) {
      getActivities();
    }
  }, []);

  // useEffect(() => {
  //   getActivities();
  // }, [questionUpdate]);

  return (
    <>
      <TableContainer>
        <Table aria-label="Activities table">
          <TableHead>
            <TableRow>
              <TableCell>Question Id</TableCell>
              <TableCell>Text</TableCell>
              <TableCell>Question Sequence</TableCell>
              <TableCell>Question Type</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loaded
              && record
              && record.questions
              && lessonActivities
              && fullActivities
              && Object.entries(lessonActivities)
                .sort(
                  (a: any, b: any) => a[1].question_sequence - b[1].question_sequence,
                )
                .map(([key, lessonQuestion]: any) => (
                  <TableRow key={key}>
                    <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                      <Link
                        to={`/question/${lessonQuestion?.question_id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        {lessonQuestion?.question_id}
                        {' '}
                      </Link>
                    </TableCell>
                    <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                      {fullActivities[lessonQuestion?.question_id]?.text}
                    </TableCell>
                    <TableCell
                      style={{ paddingTop: 5, paddingBottom: 5 }}
                      onClick={() => {
                        setDialogOpen(true);
                        // setQuestionId(lessonQuestion?.question_id);
                      }}
                    >
                      <div className="lesson-question-sequence-number">
                        {lessonQuestion?.question_sequence}
                      </div>
                    </TableCell>
                    <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                      {fullActivities[lessonQuestion?.question_id]?.type}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ paddingTop: 5, paddingBottom: 5 }}
                    >
                      <DeleteButton
                        url={`lesson/${record.id}/question`}
                        id={lessonQuestion?.question_id}
                        onDelete={refresh}
                      />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <CreateLessonQuestion
        record={lessonActivities}
        lesson_id={record && record.id}
        onCreate={refreshLessonActivity}
      />
      <br />
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="customized-dialog-title"
      >
        <DialogContent>
          <Form
            onSubmit={handleSubmit}
            validate={validate}
            mutators={{ ...arrayMutators }}
            // eslint-disable-next-line @typescript-eslint/no-shadow
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} noValidate>
                <div>
                  <div className={classes.form}>
                    <div className={classes.input}>
                      <NumberInput source="sequence_id" label="Sequence Id" />
                    </div>
                  </div>
                  <CardActions className={classes.actions}>
                    <Button
                      type="button"
                      color="primary"
                      onClick={() => setDialogOpen(false)}
                      fullWidth
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      type="button"
                      color="primary"
                      onClick={handleSubmit}
                      fullWidth
                    >
                      Save
                    </Button>
                  </CardActions>
                </div>
              </form>
            )}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LessonActivity;
