import * as React from 'react';
import { useState } from 'react';
import { Field, withTypes } from 'react-final-form';

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CircularProgress,
  TextField,
} from '@material-ui/core';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';

import LockIcon from '@material-ui/icons/Lock';
import {
  Notification, useTranslate, useNotify,
} from 'react-admin';
import { ThemeProvider } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { lightTheme } from './themes';

const API_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.background.default,
    backgroundSize: 'cover',
  },
  card: {
    minWidth: 300,
    marginTop: '6em',
  },
  avatar: {
    margin: '1em',
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    backgroundColor: theme.palette.secondary.main,
  },
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
    marginTop: '1em',
  },
  actions: {
    padding: '0 1em 1em 1em',
  },
}));

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

interface FormValues {
  email?: string;
}

const { Form } = withTypes<FormValues>();

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const translate = useTranslate();
  const classes = useStyles();
  const notify = useNotify();

  const handleSubmit = (values: FormValues) => {
    setLoading(true);
    axios.post(`${API_URL}/auth/forgot-password`, {
      email: values.email,
    })
      .then(
        (res: any) => {
          if (res.data?.message) notify(res.data?.message);
        },
        (err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        },
      )
      .finally(() => {
        setLoading(false);
      });
  };

  // eslint-disable-next-line no-useless-escape
  const regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const validate = (values: FormValues) => {
    const errors: FormValues = {};
    if (!regex.test(`${values.email}`)) {
      errors.email = 'Email address not valid';
    }
    if (!values.email) {
      errors.email = translate('ra.validation.required');
    }
    return errors;
  };

  return (
    <Form
      onSubmit={handleSubmit}
      validate={validate}
      // eslint-disable-next-line @typescript-eslint/no-shadow
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate>
          <div className={classes.main}>
            <Card className={classes.card}>
              <div className={classes.avatar}>
                <Avatar className={classes.icon}>
                  <LockIcon />
                </Avatar>
              </div>
              <div className={classes.form}>
                <div className={classes.input}>
                  <Field
                    autoFocus
                    name="email"
                    // @ts-ignore
                    component={renderInput}
                    label="Email address"
                    disabled={loading}
                  />
                </div>
              </div>
              <CardActions className={classes.actions}>
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
                  Reset Password
                </Button>
              </CardActions>
              <CardActions className={classes.actions}>
                <Link to="/login" style={{ width: '100%' }}>
                  <Button fullWidth component="button">
                    Back To Login
                  </Button>
                </Link>
              </CardActions>
            </Card>
            <Notification />
          </div>
        </form>
      )}
    />
  );
};

const ResetPasswordWithTheme = (props: any) => (
  <ThemeProvider theme={createMuiTheme(lightTheme)}>
    <ResetPassword {...props} />
  </ThemeProvider>
);

export default ResetPasswordWithTheme;
