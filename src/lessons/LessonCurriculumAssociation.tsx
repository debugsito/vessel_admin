/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { withTypes } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import {
  Button,
  CardActions,
  CircularProgress,
  Dialog,
  DialogContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  useNotify,
  ReferenceInput,
  SelectInput,
  NumberInput,
  useEditController,
  useRefresh,
} from 'react-admin';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

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

interface FormValues {
  tagData?: any;
}

const { Form } = withTypes<FormValues>();

const LessonsCurriculumAssociation = (props: any) => {
  const {
    record: { id },
  }: any = props;
  const [loading, setLoading]: any = useState(false);
  const [lessonCurriculums, setLessonCurriculums]: any = useState([]);
  const closeDialog = () => {};
  const classes = useStyles();
  const notify = useNotify();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { record, loaded }: any = useEditController(props);
  const refresh = useRefresh();

  const getCurriculums = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
    const method = 'GET';
    const curriculums: any = [];
    if (record && record.curriculums) {
      record.curriculums.map((curriculum: any) => {
        const curriculumID = curriculum.curriculum_id;
        const url = `${baseUrl}/curriculum/${curriculumID}`;
        axios
          .request({
            method,
            url,
            headers,
          })
          .then((res: any) => {
            curriculums.push(res.data);
            setLessonCurriculums([...curriculums]);
          })
          .catch((error: any) => {
            notify(error?.response?.data?.message ?? 'something went wrong');
          });
        return curriculum;
      });
    }
  };

  const getAllCurriculums = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
    let method: any = 'GET';
    let url = `${baseUrl}/curriculum`;
    axios
      .request({
        method,
        url,
        headers,
      })
      .then((result) => {
        console.log(result);
        const { curriculums } = result.data;
        method = 'POST';
        url = `${baseUrl}/curriculum/lesson`;
        for (let i = 0; i < curriculums.length; i += 1) {
          console.log(curriculums);
          const axiosValues = {
            lesson_id: id,
            curriculum_id: curriculums[i].id,
            day: record.rank ? record.rank : 1,
          };
          axios
            .request({
              method,
              url,
              data: axiosValues,
              headers,
            })
            .then(() => {})
            .catch((error: any) => {
              notify(error?.response?.data?.message ?? 'something went wrong');
            });
        }
      })
      .catch((error: any) => {
        notify(error?.response?.data?.message ?? 'something went wrong');
      });
    getCurriculums();
    refresh();
  };

  const handleSubmit = (values: FormValues) => {
    const formValues: any = values;
    const axiosValues = {
      curriculum_id: formValues.curriculum_id,
      lesson_id: id,
      day: formValues.day,
    };
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
    const successMessage = 'Associated lesson successfully';
    const method = 'POST';
    const url = `${baseUrl}/curriculum/lesson`;
    axios
      .request({
        method,
        url,
        data: axiosValues,
        headers,
      })
      .then(() => {
        notify(successMessage);
        getCurriculums();
        refresh();
        closeDialog();
      })
      .catch((error: any) => {
        notify(error?.response?.data?.message ?? 'something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (loaded) {
      getCurriculums();
    }
  }, [loaded, record]);

  const handleDeleteClick = (event: any) => {
    const curriculumId: any = event.target.id;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
    const method = 'DELETE';
    const url = `${baseUrl}/curriculum/${curriculumId}/lesson/${id}`;
    axios
      .request({
        method,
        url,
        headers,
      })
      .then(() => {
        const curriculumDeletedList = lessonCurriculums.filter((item: any) => {
          if (item.id !== Number(curriculumId)) {
            return true;
          }
          return false;
        });
        setLessonCurriculums([...curriculumDeletedList]);
      })
      .catch((error: any) => {
        notify(error?.response?.data?.message ?? 'something went wrong');
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const validate = (values: FormValues) => {
    const errors: FormValues = {};
    return errors;
  };

  return (
    <>
      {lessonCurriculums && (
        <div className="curriculum-container">
          <div className="curriculum-title">Curriculums</div>
          <div className="curriculum-inner-container">
            {lessonCurriculums
              && lessonCurriculums.map((item: any) => (
                <div
                  role="button"
                  className="category-tag"
                  id={item.id}
                  onClick={(e) => handleDeleteClick(e)}
                  aria-hidden="true"
                >
                  {item.title}
                </div>
              ))}
          </div>
        </div>
      )}
      <div>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={() => setDialogOpen(true)}
        >
          Add Curriculum
        </Button>
        <Button
          type="button"
          variant="contained"
          color="inherit"
          onClick={() => getAllCurriculums()}
        >
          Add All Curriculums
        </Button>
      </div>
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
                      <ReferenceInput
                        fullWidth
                        label="Curriculum"
                        source="curriculum_id"
                        reference="curriculum"
                        perPage={99}
                      >
                        <SelectInput fullwidth optionText="title" />
                      </ReferenceInput>
                      <NumberInput source="day" label="Day" />
                    </div>
                  </div>
                  <CardActions className={classes.actions}>
                    <Button
                      type="button"
                      color="primary"
                      disabled={loading}
                      onClick={() => setDialogOpen(false)}
                      fullWidth
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      type="button"
                      color="primary"
                      disabled={loading}
                      onClick={handleSubmit}
                      fullWidth
                    >
                      {loading && <CircularProgress size={25} thickness={2} />}
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

export default LessonsCurriculumAssociation;
