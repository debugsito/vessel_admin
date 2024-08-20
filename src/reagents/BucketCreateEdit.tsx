/* eslint-disable no-restricted-globals */
import * as React from 'react';
import { useState, useMemo } from 'react';
import { Field, withTypes } from 'react-final-form';

import {
  Button,
  CardActions,
  CircularProgress,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNotify, composeValidators } from 'react-admin';

import axios from 'axios';
import InputAdornment from '@material-ui/core/InputAdornment';

const API_URL = process.env.REACT_APP_API_URL;

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
  color?: string,
  score?: string,
  high_value?: string,
  low_value?: string,
  label?: string
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

const BucketCreateEdit = ({
  closeDialog, onSubmit, reagentId, bucket, reagentUnit,
} : any) => {
  const [loading, setLoading] : any = useState(false);

  const classes = useStyles();
  const notify = useNotify();

  const handleSubmit = (values: FormValues) => {
    setLoading(true);
    const formValues: any = { ...values };

    // eslint-disable-next-line no-prototype-builtins
    if (formValues.hasOwnProperty('lifestyle_recommendations')) {
      delete formValues.lifestyle_recommendations;
    }

    const floatKeys = ['score', 'low_value', 'high_value', 'reported_value', 'supplement_rda_multiplier', 'food_rda_multiplier'];
    floatKeys.forEach((key) => {
      formValues[key] = parseFloat(formValues[key]);
    });
    formValues.reagent_id = parseInt(formValues.reagent_id, 10);

    if (isNaN(formValues.supplement_rda_multiplier)) delete formValues.supplement_rda_multiplier;
    if (isNaN(formValues.food_rda_multiplier)) delete formValues.food_rda_multiplier;
    if (isNaN(formValues.high_value)) delete formValues.high_value;
    if (isNaN(formValues.score)) delete formValues.score;

    const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}` };
    const method = bucket ? 'PUT' : 'POST';
    const url = bucket ? `${API_URL}/reagent/${reagentId}/bucket/${bucket.id}` : `${API_URL}/reagent/${reagentId}/bucket`;
    const successMessage = bucket ? 'Updated successfully' : 'Created successfully';
    axios.request({
      method, url, data: formValues, headers,
    })
      .then(
        (res: any) => {
          notify(successMessage);
          onSubmit(res.data);
          closeDialog();
        },
        () => {
          notify('Something went wrong');
        },
      )
      .finally(() => {
        setLoading(false);
      });
  };

  const getInitialValues = useMemo(() => {
    if (bucket) {
      const { id, ...initialValues }: any = {
        ...bucket,
      };
      Object.keys(initialValues).forEach((key) => {
        initialValues[key] = `${initialValues[key]}`;
      });
      return initialValues;
    }
    return {};
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const validate = (values: FormValues) => {
    const errors: FormValues = {};
    return errors;
  };

  const isColor = (strColor: any) => {
    const regex = /^#[0-9a-fA-F]{8}$|#[0-9a-fA-F]{6}$|#[0-9a-fA-F]{4}$|#[0-9a-fA-F]{3}$/;
    return regex.test(strColor);
  };

  const required = (value: any) => (value ? undefined : 'Required');
  const float = (value: any) => {
    if (!value) return undefined;
    return (/^([0-9]+([.][0-9]+)?|[.][0-9]+)$/).test(value) ? undefined : 'Invalid entry';
  };
  const score = (value: any) => {
    if (!value) return undefined;
    return !isNaN(parseFloat(value)) && parseFloat(value) <= 1 ? undefined : 'Invalid entry';
  };

  return (
    <Form
      onSubmit={handleSubmit}
      validate={validate}
      initialValues={getInitialValues}
      // eslint-disable-next-line @typescript-eslint/no-shadow
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <div className={classes.form}>
              <div className={classes.input}>
                <Field
                  autoFocus
                  name="color"
                                    // @ts-ignore
                  component={renderInput}
                  label="Color (#RRGGBBAA)"
                  disabled={loading}
                  validate={required}
                  InputProps={{
                    endAdornment: <InputAdornment position="end"><span style={{ width: 20, height: 20, backgroundColor: isColor(values.color) ? values.color : '#fff' }} /></InputAdornment>,
                  }}
                />
              </div>
              <div className={classes.input}>
                <Field
                  name="score"
                                    // @ts-ignore
                  component={renderInput}
                  label="Score (0-1)"
                  validate={composeValidators(float, score)}
                  disabled={loading}
                />
              </div>
              <div className={classes.input}>
                <Field
                  name="high_value"
                                    // @ts-ignore
                  component={renderInput}
                  label="High Value"
                  disabled={loading}
                  validate={composeValidators(float)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">{reagentUnit}</InputAdornment>,
                  }}
                />
              </div>
              <div className={classes.input}>
                <Field
                  name="low_value"
                                    // @ts-ignore
                  component={renderInput}
                  label="Low Value"
                  disabled={loading}
                  validate={composeValidators(required, float)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">{reagentUnit}</InputAdornment>,
                  }}
                />
              </div>
              <div className={classes.input}>
                <Field
                  name="reported_value"
                                    // @ts-ignore
                  component={renderInput}
                  label="reported_value"
                  disabled={loading}
                  validate={composeValidators(required, float)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">{reagentUnit}</InputAdornment>,
                  }}
                />
              </div>
              <div className={classes.input}>
                <Field
                  name="supplement_rda_multiplier"
                                    // @ts-ignore
                  component={renderInput}
                  label="supplement_rda_multiplier"
                  disabled={loading}
                  validate={composeValidators(float)}
                />
              </div>
              <div className={classes.input}>
                <Field
                  name="food_rda_multiplier"
                                    // @ts-ignore
                  component={renderInput}
                  label="food_rda_multiplier"
                  disabled={loading}
                  validate={composeValidators(float)}
                />
              </div>
              <div className={classes.input}>
                <Field
                  autoFocus
                  name="label"
                                    // @ts-ignore
                  component={renderInput}
                  label="Label"
                  disabled={loading}
                />
              </div>
            </div>
            <CardActions className={classes.actions}>
              <Button
                type="button"
                color="primary"
                disabled={loading}
                onClick={() => closeDialog()}
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

export default BucketCreateEdit;
