import React, { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import {
  useDataProvider, useNotify,
} from 'react-admin';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';
import QuestionAddSurvey from './QuestionAddSurvey';

const API_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    width: '100%',
  },
  dialogContent: {
    width: '500px',
    maxWidth: '90vw',
    boxSizing: 'border-box',
    padding: 0,
  },
  textDecorationNone: {
    '&, *': {
      textDecoration: 'none',
    },

  },
});

const QuestionSurveys = () => {
  const { id }: any = useParams();

  const classes = useStyles();
  const notify = useNotify();
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [surveys, setSurveys]: any = useState([]);
  const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}` };

  const listSurveys = () => {
    axios.get(`${API_URL}/question/${id}/survey`, { headers })
      .then(
        (res: any) => {
          setSurveys(res?.data?.surveys);
        },
        (err) => {
          if (err.response?.data?.message) {
            notify(err.response?.data?.message, 'error');
          } else {
            notify('Failed to load surveys', 'error');
          }
        },
      )
      .finally(() => setLoading(false));
  };

  const handleSurveySubmit = () => {
    listSurveys();
  };

  const dataProvider = useDataProvider();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleConfirm = (survey_id: number) => {
    setConfirmLoading(true);
    const params: any = { id };
    dataProvider.delete(`survey/${survey_id}/question`, params)
      .then(() => {
        const updated = surveys.filter((survey: any) => survey.survey.id !== survey_id);
        setSurveys([...updated]);
      })
      .catch(() => {
        notify('Failed to delete survey', 'error');
      })
      .finally(() => setConfirmLoading(false));
  };

  const location = useLocation();
  useEffect(() => {
    setLoading(true);
    listSurveys();
  }, [location]);

  return (
    <div style={{ width: '100%' }}>
      <TableContainer>
        {loading && (
        <CircularProgress
          style={{ padding: 20 }}
          size={25}
          thickness={2}
        />
        )}
        <Table className={classes.table} aria-label="reagents table">
          <TableHead>
            <TableRow>
              <TableCell>Survey name</TableCell>
              <TableCell align="center" />
            </TableRow>
          </TableHead>
          <TableBody>

            {!loading
             && surveys.length <= 0 && <div style={{ padding: 20 }}>No questions to show.</div>}
            {surveys.map((survey: any) => (
              <TableRow key={survey.survey.id}>
                <TableCell>
                  {survey.survey.name}
                </TableCell>
                <TableCell align="center">
                  <Link to={`/survey/${survey.survey.id}`}>
                    <IconButton aria-label="delete">
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton disabled={confirmLoading} aria-label="delete" onClick={() => handleConfirm(survey.survey.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ padding: 15 }}>
        <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
          Add survey
        </Button>
      </div>
      <Dialog open={dialogOpen} aria-labelledby="customized-dialog-title">
        <DialogTitle id="simple-dialog-title">Add survey to question</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <QuestionAddSurvey onSubmit={handleSurveySubmit} onClose={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuestionSurveys;
