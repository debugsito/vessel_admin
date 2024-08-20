import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useNotify } from 'react-admin';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { CircularProgress } from '@material-ui/core';
import SurveyCreateQuestion from './SurveyCreateQuestion';

import SignleSurveyQuestion from './SignleSurveyQuestion';

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

const SurveyQuestions = () => {
  const { id }: any = useParams();

  const classes = useStyles();
  const notify = useNotify();
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [questions, setQuestions]: any = useState([]);
  const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}` };

  const listQuestions = () => {
    axios.get(`${API_URL}/survey/${id}/question`, { headers })
      .then(
        (res: any) => {
          setQuestions(res?.data?.questions);
        },
        (err) => {
          if (err.response?.data?.message) {
            notify(err.response?.data?.message, 'error');
          } else {
            notify('Failed to load questions', 'error');
          }
        },
      )
      .finally(() => setLoading(false));
  };

  const location = useLocation();
  useEffect(() => {
    setLoading(true);
    listQuestions();
  }, [location]);

  const handleQuestionUpdate = () => {
    listQuestions();
  };

  const handleQuestionDelete = (questionId: any) => {
    const tempQuestions = questions.filter((q: any) => q.question_id !== questionId);
    setQuestions([...tempQuestions]);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* <Link to={`/survey/${id}`} className={classes.textDecorationNone}
        style={{width: 200, marginTop: 20}}>
        <Button fullWidth component="button" color="primary" variant="contained">
          Back To Survey
        </Button>
        </Link> */}
      <TableContainer>
        <Table className={classes.table} aria-label="reagents table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Question text</TableCell>
              <TableCell align="center">Layout</TableCell>
              <TableCell align="center">Question sequence</TableCell>
              <TableCell align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
            <CircularProgress
              style={{ padding: 20 }}
              size={25}
              thickness={2}
            />
            )}
            {!loading && questions.length <= 0
              && <div style={{ padding: 20 }}>No questions to show.</div>}
            {questions.map((question: any) => (
              <SignleSurveyQuestion
                key={question.question_id}
                onDelete={handleQuestionDelete}
                onUpdate={handleQuestionUpdate}
                question={question}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <div style={{padding: 15}}>
        <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
          Add question
        </Button>
        </div> */}
      <Dialog open={dialogOpen} aria-labelledby="customized-dialog-title">
        <DialogTitle id="simple-dialog-title">Add question to survey</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <SurveyCreateQuestion onClose={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default React.memo(SurveyQuestions);
