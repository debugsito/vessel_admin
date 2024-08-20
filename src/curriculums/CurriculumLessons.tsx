/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import arrayMutators from 'final-form-arrays';
import { makeStyles } from '@material-ui/core/styles';

import {
  Button,
  CardActions,
  Dialog,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import {
  NumberInput,
  useEditController,
  useNotify,
  useRefresh,
} from 'react-admin';
import axios from 'axios';
import { withTypes } from 'react-final-form';
import DeleteButton from '../components/DeleteButton';
import CreateCurriculumLesson from './CreateCurriculumLesson';

const API_URL = process.env.REACT_APP_API_URL;

const CurriculumLessons = (props: any) => {
  const { loaded, record } = useEditController(props);
  const refresh = useRefresh();
  const notify = useNotify();
  const [fullLessons, setFullLessons]: any = useState({});
  const [curriculumLessons, setCurriculumLessons]: any = useState({});
  const [combinedLessons, setCombinedLessons]: any = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [lessonId, setLessonId]: any = useState();
  const [lessonUpdate, setLessonUpdate]: any = useState(false);

  // This function matches lessons with the correct curriculum they are associated with
  // then returns a new object containing the lesson and curriculum information
  const completeLessonInformation = () => {
    const tempArray: any = [];
    if (
      fullLessons
      && Array.isArray(fullLessons)
      && curriculumLessons
      && Array.isArray(curriculumLessons)
    ) {
      const lessonsCompleteInformation = fullLessons?.map(
        (fullLesson: any, index: any) => {
          const curriculumItem = curriculumLessons.find((item: any) => {
            if (Number(item.lesson_id) === Number(fullLesson.id)) {
              const combinedObject = { ...item, fullLesson };
              tempArray.push(combinedObject);
              return true;
            }
            return false;
          });
          console.log(tempArray);
          setCombinedLessons([...tempArray]);
          return fullLesson;
        },
      );
    }
  };

  const getLessons = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
    const tempFullLessons: any = [];
    const tempClessons: any = [];
    if (record) {
      Object.keys(record.lessons).forEach(async (key) => {
        const lesson = record.lessons[key];
        const { data: axiosLessons } = await axios.get(
          `${API_URL}/lesson/${lesson?.lesson_id}`,
          { headers },
        );
        tempFullLessons.push(axiosLessons);
        setFullLessons([...tempFullLessons]);

        axios
          .get(
            `${API_URL}/curriculum/${record.id}/lesson/${lesson?.lesson_id}`,
            {
              headers,
            },
          )
          .then((data: any) => {
            const tempCurriculumLessons = data.data;
            tempClessons.push(tempCurriculumLessons);
            setCurriculumLessons([...tempClessons]);
          })
          .catch((error) => {
            if (
              error?.response?.data?.message
              !== 'Association for Curriculum and Lesson with these ids does not exist.'
            ) {
              notify(
                `Failed to get Curriculum Lesson with id:${lesson.lessonId}`,
                'error',
              );
            }
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
      day: formValues.day,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
    const successMessage = 'Updated successfully';
    const method = 'PUT';
    const url = `${API_URL}/curriculum/${record?.id}/lesson/${lessonId}`;
    axios
      .request({
        method,
        url,
        data: axiosValues,
        headers,
      })
      .then(() => {
        notify(successMessage);
        setLessonUpdate(!lessonUpdate);
      })
      .catch((error: any) => {
        notify(error?.response?.data?.message ?? 'something went wrong');
      })
      .finally(() => {
        getLessons();
      });
    setDialogOpen(false);
  };

  useEffect(() => {
    if (loaded) {
      getLessons();
    }
  }, [record]);

  useEffect(() => {
    if (loaded) {
      completeLessonInformation();
    }
  }, [curriculumLessons]);

  return (
    <>
      <TableContainer>
        <Table aria-label="Lessons table">
          <TableHead>
            <TableRow>
              <TableCell>Lesson Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Lesson Day</TableCell>
              <TableCell>Rank</TableCell>

              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loaded
              && record
              && record.lessons
              && combinedLessons
              && combinedLessons.length > 0
              && combinedLessons
                .sort((a: any, b: any) => a.fullLesson.id - b.fullLesson.id)
                .map((lesson: any, index: any) => {
                  const deleteUrl = `curriculum/${record.id}/lesson`;
                  return (
                    <TableRow key={lesson?.fullLesson?.id}>
                      <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                        <Link
                          to={`/lesson/${lesson?.fullLesson?.id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          {lesson?.fullLesson?.id}
                          {' '}
                        </Link>
                      </TableCell>
                      <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                        {lesson?.fullLesson?.title}
                      </TableCell>
                      <TableCell
                        style={{ paddingTop: 5, paddingBottom: 5 }}
                        onClick={() => {
                          setDialogOpen(true);
                          setLessonId(lesson?.fullLesson?.id);
                        }}
                      >
                        {lesson?.day ?? 'N/A'}
                      </TableCell>
                      <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                        {lesson?.fullLesson?.rank ?? 'N/A'}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ paddingTop: 5, paddingBottom: 5 }}
                      >
                        <DeleteButton
                          url={deleteUrl}
                          id={lesson.fullLesson.id}
                          onDelete={refresh}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <CreateCurriculumLesson
        record={curriculumLessons}
        curriculum_id={record && record.id}
        onCreate={refresh}
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
                      <NumberInput source="day" label="Lesson Day" />
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

export default CurriculumLessons;
