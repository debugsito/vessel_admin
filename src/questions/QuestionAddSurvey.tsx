import * as React from 'react';
import {
  ReferenceInput, required, SelectInput, useDataProvider, useNotify,
} from 'react-admin';
import { useState } from 'react';
import { withTypes } from 'react-final-form';
import { useParams } from 'react-router-dom';

import {
  Button,
  CardActions,
  CircularProgress,

} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  hint: {
    marginTop: '1em',
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.grey[500],
  },
  form: {
    padding: '0 1em 1em 1em',
    marginBottom: 30,
  },
  input: {
    // marginBottom: '20px',
  },
  actions: {
    padding: '0 1em 1em 1em',
  },
  w100: {
    width: '100%',
  },
}));

interface FormValues {
  survey_id?: number,
}

const { Form } = withTypes<FormValues>();

const QuestionAddSurvey = ({ onClose, onSubmit }: any) => {
  const [loading, setLoading] : any = useState(false);
  const classes = useStyles();
  const notify = useNotify();
  const dataProvider = useDataProvider();
  const { id }: any = useParams();

  const handleSubmit = (values: FormValues) => {
    setLoading(true);
    const params: any = { id: 'question', data: { question_id: parseInt(id, 10), question_sequence: 0 }, previousData: {} };
    dataProvider.create(`survey/${values.survey_id}/question`, params)
      .then(() => {
        onSubmit();
        onClose();
      })
      .catch(() => {
        notify('Failed to add survey', 'error');
      })
      .finally(() => setLoading(false));
  };

  const validate = () => {
    const errors: FormValues = {};
    return errors;
  };

  return (
    <Form
      onSubmit={handleSubmit}
      validate={validate}
      // initialValues={getInitialValues}
      // eslint-disable-next-line @typescript-eslint/no-shadow
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <div className={classes.form}>
              <div className={classes.input}>
                <ReferenceInput
                  className={classes.w100}
                  label="Survey"
                  source="survey_id"
                  reference="survey"
                  perPage={99}
                >
                  <SelectInput validate={required()} fullwidth optionText="name" />
                </ReferenceInput>
              </div>
            </div>
            <CardActions className={classes.actions}>
              <Button
                type="button"
                color="primary"
                disabled={loading}
                onClick={() => onClose()}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                disabled={loading}
                fullWidth
              >
                {loading && (
                <CircularProgress
                  size={25}
                  thickness={2}
                />
                )}
                Save
              </Button>
            </CardActions>
          </div>
        </form>
      )}
    />
  );
};

export default React.memo(QuestionAddSurvey);
