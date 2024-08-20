import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { Field, withTypes } from 'react-final-form';
import {
  composeValidators, Confirm, useDataProvider, useNotify,
} from 'react-admin';
import {
  TextField,
} from '@material-ui/core';
import { useParams, Link } from 'react-router-dom';

import { layouts } from '../questions/QuestionList';

interface FormValues {
  question_sequence?: number,
}
const { Form } = withTypes<FormValues>();

const renderInput: any = ({
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

const SignleSurveyQuestion = ({ question, onUpdate, onDelete }: any) => {
  const { id }: any = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dataProvider = useDataProvider();
  const notify = useNotify();

  const handleSubmit = (formValues: any) => {
    setDialogOpen(false);
    const params: any = { id: 'question', data: { question_sequence: parseInt(formValues.question_sequence, 10), question_id: question.question_id }, previousData: {} };
    dataProvider.update(`survey/${id}`, params)
      .then(({ data }: any) => {
        const q = { ...question, question_sequence: data.question_sequence };
        onUpdate(q);
      })
      .catch((error) => {
        notify('Failed to update question', error);
      });
  };

  const required = (value: any) => (value ? undefined : 'Required');
  const integer = (value: any) => ((/^\d+$/).test(value) ? undefined : 'Invalid entry');
  const validate = () => {
    const errors: FormValues = {};
    return errors;
  };

  const handleConfirm = () => {
    setConfirmLoading(true);
    const params: any = { id: question.question_id };
    dataProvider.delete(`survey/${id}/question`, params)
      .then(() => {
        onDelete(question.question_id);
      })
      .catch((error) => {
        notify('Failed to delete question', error);
      })
      .finally(() => setConfirmLoading(false));
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <img style={{ width: 60 }} src={question.question.image} alt="" />
        </TableCell>
        <TableCell>
          {question.question.text}
        </TableCell>
        <TableCell align="center">
          <img style={{ width: 60 }} src={`assets/images/layouts/${layouts[question.question.layout]}`} alt="" />
        </TableCell>
        <TableCell align="center">
          <Button style={{ cursor: 'text' }} onClick={() => setDialogOpen(true)}>
            {question.question_sequence}
          </Button>
        </TableCell>
        <TableCell align="center">
          <Link to={`/question/${question.question_id}`}>
            <IconButton aria-label="delete">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton aria-label="delete" onClick={() => setConfirmOpen(true)} style={{ marginLeft: 10 }}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} aria-labelledby="customized-dialog-title">
        <DialogTitle id="simple-dialog-title">Update question Sequence</DialogTitle>
        <DialogContent style={{ paddingBottom: 30 }}>
          <Form
            onSubmit={handleSubmit}
            validate={validate}
            // initialValues={getInitialValues}
            // eslint-disable-next-line @typescript-eslint/no-shadow
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Field
                  autoFocus
                  name="question_sequence"
                  component={renderInput}
                  label="Question Sequence"
                  validate={composeValidators(required, integer)}
                />
              </form>
            )}
          />
        </DialogContent>
      </Dialog>
      <Confirm
        isOpen={confirmOpen}
        loading={confirmLoading}
        title="Delete question"
        content="Are you sure you want to detach this question?"
        onConfirm={handleConfirm}
        onClose={() => setConfirmOpen(false)}
      />
    </>
  );
};

export default SignleSurveyQuestion;
