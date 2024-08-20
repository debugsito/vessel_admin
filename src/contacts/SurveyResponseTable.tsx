import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { Title, useDataProvider, useNotify } from 'react-admin';
import { useParams } from 'react-router';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import VesselDateField from '../components/VesselDateField';

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: '#000',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

const SurveyResponseTable = ({ responses, loading }: any) => {
  const { id }: any = useParams();
  const classes = useStyles();
  const [contact, setContact]: any = useState(null);
  const notify = useNotify();

  const dataProvider = useDataProvider();
  const params: any = { id };
  const loadContactData = () => {
    dataProvider.getOne('contacts', params)
      .then(({ data }: any) => {
        setContact(data);
      })
      .catch(() => {
        notify('Failed to load contact', 'error');
      });
  };

  useEffect(() => {
    loadContactData();
  }, []);

  return (
    <>
      <Title title="Survey Responses" />
      <div style={{ paddingTop: 15 }}>
        <Link to={`/contacts/${id}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Go back to
            {' '}
            {contact?.email}
          </Button>
        </Link>
      </div>
      <Paper style={{ marginTop: 15 }}>
        <TableContainer>
          <Table style={{ width: '100%' }} aria-label="survey table">
            <TableHead>
              <TableRow>
                <TableCell>Question</TableCell>
                <TableCell align="center">Answer primary text</TableCell>
                <TableCell align="center">Answer secondary text</TableCell>
                <TableCell align="center">Correct answer</TableCell>
                <TableCell>Answer text</TableCell>
                <TableCell>Insert date (UTC)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && (
              <CircularProgress
                size={25}
                thickness={2}
                style={{ padding: 20 }}
              />
              )}
              {!loading && responses.length <= 0
              && <div style={{ padding: 20 }}>No data to show.</div>}
              {responses.map((response: any) => (
                <TableRow key={`${response.question_id}_${response.answer_id}`}>
                  <TableCell>
                    <Link to={`/question/${response.question_id}`} className={classes.link}>
                      {response.question.text}
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    <Link to={`/answer/${response.answer_id}`} className={classes.link}>
                      {response.answer?.primary_text}
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    <Link to={`/answer/${response.answer_id}`} className={classes.link}>
                      {response.answer?.secondary_text}
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    {response.answer && !response.answer?.is_incorrect && <CheckIcon />}
                    {response.answer && response.answer?.is_incorrect && <CloseIcon />}
                  </TableCell>
                  <TableCell>
                    {response.answer_text}
                  </TableCell>
                  <TableCell>
                    <VesselDateField date={response.insert_date} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default React.memo(SurveyResponseTable);
