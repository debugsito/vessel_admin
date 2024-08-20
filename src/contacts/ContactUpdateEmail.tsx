import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import {
  CircularProgress,
} from '@material-ui/core';
import axios from 'axios';
import { useEditController, useNotify } from 'react-admin';

const API_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles(() => createStyles({
  w100: {
    width: '100%',
  },
  'mt-3': {
    marginTop: '15px',
  },
}));

interface State {
  email: string;
}

const UpdateEmail = (props: any) => {
  const { record } = useEditController(props);
  const classes = useStyles();
  // eslint-disable-next-line no-useless-escape
  const emailRegex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const notify = useNotify();
  const [values, setValues] = useState({
    email: '',
  });

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(() => {
      setValid(emailRegex.test(event.target.value));
      return ({ ...values, [prop]: event.target.value });
    });
  };

  useEffect(() => {
    if (record?.email) {
      setValues({ email: record.email });
    }
  }, [record]);

  const handleEmailUpdate = () => {
    setLoading(true);
    const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}` };
    axios.post(`${API_URL}/contact/${record?.id}/update-email`, {
      email: values.email,
    }, { headers })
      .then(
        () => {
          notify('Updated successfully!');
          setValid(false);
        },
        (err) => {
          if (err.response?.data?.message) notify(`${err.response?.data?.message}`, 'error');
          else notify('Couldn\'t update', 'error');
        },
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <TextField id="filled-basic" label="Email address" variant="filled" className={classes.w100} value={values.email} onChange={handleChange('email')} />
      <Button variant="contained" color="primary" className={classes['mt-3']} disabled={!valid || loading} onClick={handleEmailUpdate}>
        {loading && (
        <CircularProgress
          size={25}
          thickness={2}
        />
        )}
        Update
      </Button>
    </div>
  );
};

export default React.memo(UpdateEmail);
