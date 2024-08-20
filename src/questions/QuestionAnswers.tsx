import React, { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { useNotify } from 'react-admin';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { CircularProgress } from '@material-ui/core';
import SingleQuestionAnswer from './SingleQuestionAnswer';

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

const QuestionAnswers = (props: any) => {
  let { id } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  if (id === null) {
    id = useParams();
  }

  const classes = useStyles();
  const notify = useNotify();
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dialogOpen, setDialogOpen] = useState(false);
  const [answers, setAnswers]: any = useState([]);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  };
  const listAnswers = () => {
    axios
      .get(`${API_URL}/question/${id}/answer`, { headers })
      .then(
        (res: any) => {
          setAnswers(res?.data?.answers);
        },
        (err) => {
          if (err.response?.data?.message) {
            notify(err.response?.data?.message, 'error');
          } else {
            notify('Failed to load answers', 'error');
          }
        },
      )
      .finally(() => setLoading(false));
  };

  const location = useLocation();
  useEffect(() => {
    setLoading(true);
    listAnswers();
  }, [location]);

  const handleAnswerUpdate = () => {
    listAnswers();
  };

  const handleAnswerDelete = (answerId: any) => {
    const tempAnswers = answers.filter((a: any) => a.answer_id !== answerId);
    setAnswers([...tempAnswers]);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* <Link to={`/question/${id}/`}
      className={classes.textDecorationNone} style={{width: 200, marginTop: 20}}>
      <Button fullWidth component="button" color="primary" variant="contained">
          Back To Question
      </Button>
      </Link> */}
      <TableContainer>
        <Table className={classes.table} aria-label="reagents table">
          <TableHead>
            <TableRow>
              <TableCell>Answer</TableCell>
              <TableCell align="center">Correct</TableCell>
              <TableCell align="center">Sequence</TableCell>
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
            {!loading && answers.length && answers.length <= 0 && (
              <div style={{ padding: 20 }}>No answers to show.</div>
            )}
            {!loading && answers.length && answers.length >= 1
              ? answers.map((answer: any) => (
                <SingleQuestionAnswer
                  key={answer.answer.id}
                  answer={answer}
                  onUpdate={handleAnswerUpdate}
                  onDelete={handleAnswerDelete}
                  questionId={id}
                />
              ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ padding: 15 }}>
        <Link
          to={`/answer/create?question_id=${id}`}
          style={{ textDecoration: 'none' }}
        >
          <Button variant="contained" color="primary">
            Add answer
          </Button>
        </Link>
      </div>
      <Dialog open={dialogOpen} aria-labelledby="customized-dialog-title">
        <DialogTitle id="simple-dialog-title">
          Add question to survey
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {/* <SurveyCreateQuestion onClose={() => setDialogOpen(false)} /> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuestionAnswers;
