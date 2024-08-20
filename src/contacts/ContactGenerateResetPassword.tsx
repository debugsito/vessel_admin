import * as React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import {
  CircularProgress,
} from '@material-ui/core';
import axios from 'axios';
import { useEditController, useNotify } from 'react-admin';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import copy from 'copy-to-clipboard';

const API_URL = process.env.REACT_APP_API_URL;
const useStyles = makeStyles(() => createStyles({
  w100: {
    width: '100%',
    boxSizing: 'border-box',
    border: '0',
    padding: '10px 20px',
    backgroundColor: '#fbf3eb',
  },
  dialogContent: {
    width: '500px',
    maxWidth: '90vw',
    boxSizing: 'border-box',
  },
  'mt-3': {
    marginTop: '15px',
  },
  dialogActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '20px',
    paddingBottom: '20px',
  },
}));

const ContactGenerateResetPassword = (props: any) => {
  const { record } = useEditController(props);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [resetUrl, setResetUrl] = useState('');
  const urlRef: any = React.useRef(null);
  const notify = useNotify();

  const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}` };
  const handleEmailUpdate = () => {
    setLoading(true);
    axios.post(`${API_URL}/auth/forgot-password/token`, {
      email: record?.email,
    }, { headers })
      .then(
        (res: any) => {
          if (res.data.reset_url) {
            setResetUrl(res.data.reset_url);
            setDialogOpen(true);
          }
        },

      )
      .finally(() => {
        setLoading(false);
      });
  };

  const copyResetUrl = () => {
    copy(resetUrl);
    notify('Copied to clipboard!');
  };

  const selectUrl = () => {
    urlRef.current.select();
  };

  return (
    <div>
      {!record && (
      <CircularProgress
        size={25}
        thickness={2}
      />
      )}
      {record && (
      <>
        <Button variant="contained" color="primary" disabled={loading} onClick={handleEmailUpdate}>
          {loading && (
          <CircularProgress
            size={25}
            thickness={2}
          />
          )}
          Request a reset link
        </Button>
        <Dialog open={dialogOpen} aria-labelledby="customized-dialog-title">
          <DialogTitle id="simple-dialog-title">Copy reset link</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <input type="text" onClick={selectUrl} ref={urlRef} className={classes.w100} value={resetUrl} readOnly />
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Button variant="outlined" onClick={() => setDialogOpen(false)} color="primary">
              Close
            </Button>
            <Button variant="contained" onClick={copyResetUrl} color="primary">
              Copy URL
            </Button>
          </DialogActions>
        </Dialog>
      </>
      )}
    </div>
  );
};

export default React.memo(ContactGenerateResetPassword);
