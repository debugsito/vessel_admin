import * as React from 'react';
import {
  ReferenceInput, SelectInput,
} from 'react-admin';
import { useState } from 'react';
import { Field, withTypes } from 'react-final-form';

import {
  Button,
  CardActions,
  CircularProgress,
  TextField,
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
  question_id?: number,
  question_sequence?: number,
}

const { Form } = withTypes<FormValues>();

const renderInput = ({
  meta: { touched, error } = { touched: false, error: undefined },
  input: { ...inputProps },
  ...props
}) => (
  <TextField
    error={!!(touched && error)}
    helperText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
  />
);

const SurveyCreateQuestion = ({ onClose }: any) => {
  const [loading, setLoading] : any = useState(false);
  const classes = useStyles();

  const handleSubmit = () => {
    setLoading(true);
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
                  label="Question"
                  source="question_id"
                  reference="question"
                  perPage={99}
                >
                  <SelectInput fullwidth optionText="text" />
                </ReferenceInput>
              </div>
              <div className={classes.input}>
                <Field
                  name="question_sequence"
                  // @ts-ignore
                  component={renderInput}
                  label="Question Sequence"
                  // validate={composeValidators(required, integer)}
                  disabled={loading}
                />
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

export default React.memo(SurveyCreateQuestion);
