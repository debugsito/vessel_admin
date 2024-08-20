import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { Field, withTypes } from 'react-final-form';

import {
  Button,
  CardActions,
  CircularProgress,
  TextField,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  useNotify,
  composeValidators,
  GetListParams,
  useDataProvider,
} from 'react-admin';
import axios from 'axios';

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
  reagent_bucket_id?: number;
  lifestyle_recommendation_id?: number;
  quantity?: number;
  unit?: string;
  multiple?: number;
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

const BucketRecommendationForm = ({
  closeDialog,
  onSubmit,
  bucketId,
  recommendation,
}: any) => {
  const [loading, setLoading]: any = useState(false);
  const [recommendations, setRecommendations]: any = useState([]);
  const classes = useStyles();
  const notify = useNotify();
  const dataProvider = useDataProvider();

  const params: GetListParams = {
    pagination: { page: 1, perPage: 99 },
    filter: null,
    sort: { field: 'name', order: 'DESC' },
  };
  useEffect(() => {
    dataProvider
      .getList('lifestyle-recommendation', params)
      .then(({ data }: any) => {
        setRecommendations(data);
      })
      .catch(() => {
        notify('Failed to load recommendations', 'error');
      });
  }, []);
  const handleSubmit = (values: FormValues) => {
    setLoading(true);

    let formValues: any = { ...values };

    const intKeys = ['quantity', 'lifestyle_recommendation_id'];
    intKeys.forEach((key) => {
      formValues[key] = parseInt(formValues[key], 10);
    });

    formValues = { ...formValues, reagent_bucket_id: bucketId };
    if (recommendation) formValues = { ...formValues, id: recommendation.id };

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
    const method = recommendation ? 'PUT' : 'POST';
    const url = recommendation
      ? `${API_URL}/reagent-lifestyle-recommendation/${recommendation.id}`
      : `${API_URL}/reagent-lifestyle-recommendation`;
    const successMessage = recommendation
      ? 'Updated successfully'
      : 'Created successfully';
    axios
      .request({
        method,
        url,
        data: formValues,
        headers,
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
    if (recommendation) {
      const { id, ...initialValues }: any = {
        ...recommendation,
      };
      delete initialValues.activity_name;
      Object.keys(initialValues).forEach((key) => {
        initialValues[key] = `${initialValues[key]}`;
      });
      return initialValues;
    }
    return {};
  }, []);

  const validate = () => {
    const errors: FormValues = {};
    return errors;
  };

  const required = (value: any) => (value ? undefined : 'Required');
  const integer = (value: any) => (/^\d+$/.test(value) ? undefined : 'Invalid entry');
  const float = (value: any) => {
    if (!value) return undefined;
    return /^([0-9]+([.][0-9]+)?|[.][0-9]+)$/.test(value)
      ? undefined
      : 'Invalid entry';
  };

  return (
    <Form
      onSubmit={handleSubmit}
      validate={validate}
      initialValues={getInitialValues}
      // eslint-disable-next-line @typescript-eslint/no-shadow
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <div className={classes.form}>
              <div className={classes.input}>
                <Field
                  name="lifestyle_recommendation_id"
                  // @ts-ignore
                  component={renderInput}
                  label="Lifestyle Recommendation"
                  validate={composeValidators(required, integer)}
                  disabled={loading}
                  select
                >
                  {recommendations.map((option: any) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.activity_name}
                    </MenuItem>
                  ))}
                </Field>
              </div>
              <div className={classes.input}>
                <Field
                  name="quantity"
                  // @ts-ignore
                  component={renderInput}
                  label="Quantity"
                  validate={composeValidators(required, float)}
                  disabled={loading}
                />
              </div>
              <div className={classes.input}>
                <Field
                  name="unit"
                  // @ts-ignore
                  component={renderInput}
                  label="Unit"
                  disabled={loading}
                  validate={composeValidators(required)}
                />
              </div>
              <div className={classes.input}>
                <Field
                  name="multiple"
                  // @ts-ignore
                  component={renderInput}
                  label="Multiple"
                  disabled={loading}
                  validate={composeValidators(required)}
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
                {loading && <CircularProgress size={25} thickness={2} />}
                Save
              </Button>
            </CardActions>
          </div>
        </form>
      )}
    />
  );
};

export default React.memo(BucketRecommendationForm);
