/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import { useState, useEffect } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useNotify } from 'react-admin';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles({
  chipEditable: {
    minWidth: 60,
    '&, *': {
      cursor: 'text',
    },
  },
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
});

const roundValue = (value: any) => {
  const returnedValue = typeof (value) === 'number' ? value.toFixed(2) : value;
  return returnedValue;
};

const SingleReagent = ({ reagent, contactId } : any) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editedProperty, setEditedProperty] = useState('');
  const [value, setValue] = useState(0);
  const [localReagent, setLocalReagent] = useState({
    score_id: 0, score: 0, value: 0, reagent_type: '', name: '', unit: '', label: '',
  });
  const notify = useNotify();

  const openScoreDialog = () => {
    setEditedProperty('reagent_score');
    setValue(localReagent.score);
    setDialogOpen(true);
  };

  const openValueDialog = () => {
    setEditedProperty('reagent_value');
    setValue(roundValue(localReagent.value));
    setDialogOpen(true);
  };

  const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}` };
  const updateScore = () => {
    setLoading(true);
    const payload: any = {
      contact_id: parseInt(contactId, 10),
    };
    payload[`${editedProperty}`] = parseFloat(`${value}`);

    axios.put(`${API_URL}/scores/${localReagent.score_id}`, payload, { headers })
      .then(
        (res: any) => {
          if (res.data?.contact_id) {
            const { reagent_value, reagent_score }: any = res.data;
            setLocalReagent({
              ...localReagent,
              value: roundValue(reagent_value),
              score: roundValue(reagent_score),
            });
            setDialogOpen(false);
          }
        },
        (err) => {
          if (err.response?.data?.message) {
            notify(err.response?.data?.message, 'error');
          } else {
            notify('Couldn\'t update', 'error');
          }
        },
      )
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (reagent) setLocalReagent({ ...reagent });
  }, []);

  return (
    <>
      <TableRow>
        <TableCell>
          {localReagent?.name}
        </TableCell>
        <TableCell>
          {localReagent?.reagent_type}
        </TableCell>
        <TableCell align="center">
          <Chip size="small" className={classes.chipEditable} label={roundValue(localReagent?.score)} onClick={openScoreDialog} />
        </TableCell>
        <TableCell align="center">
          <Chip size="small" className={classes.chipEditable} label={roundValue(localReagent?.value)} onClick={openValueDialog} />
        </TableCell>
        <TableCell align="center">
          {localReagent?.unit}
        </TableCell>
        <TableCell align="center">
          {localReagent?.label}
        </TableCell>
      </TableRow>
      <Dialog open={dialogOpen} aria-labelledby="customized-dialog-title">
        <DialogTitle id="simple-dialog-title">
          Update reagent
          {' '}
          {editedProperty === 'reagent_score' ? 'score' : 'value'}
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <input type="number" className={classes.w100} onChange={(e: any) => setValue(e.target.value)} value={value} />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button variant="outlined" onClick={() => setDialogOpen(false)} disabled={loading} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={updateScore} disabled={loading} color="primary">
            {loading && (
            <CircularProgress
              size={25}
              thickness={2}
            />
            )}
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>

  );
};

export default React.memo(SingleReagent);
