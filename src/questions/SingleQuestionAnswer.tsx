import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import {
  composeValidators, Confirm, useDataProvider, useNotify,
} from 'react-admin';
import {
  TextField,
} from '@material-ui/core';
import { useParams, Link } from 'react-router-dom';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { Field, withTypes } from 'react-final-form';

interface FormValues {
  answer_sequence?: number,
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

const SingleQuestionAnswer = ({
  answer, onUpdate, onDelete, questionId,
}: any) => {
  const { id }: any = useParams();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dataProvider = useDataProvider();
  const notify = useNotify();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = (formValues: any) => {
    setDialogOpen(false);
    const params: any = { id: 'answer', data: { answer_sequence: parseInt(formValues.answer_sequence, 10), answer_id: answer.answer_id }, previousData: {} };
    dataProvider.update(`question/${id}`, params)
      .then(({ data }: any) => {
        const a = { ...answer, answer_sequence: data.answer_sequence };
        onUpdate(a);
      })
      .catch(() => {
        notify('Failed to update answer', 'error');
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
    const params: any = { id: answer.answer.id };
    dataProvider.delete(`question/${questionId}/answer`, params)
      .then(() => {
        onDelete(answer.answer.id);
      })
      .catch(() => {
        notify('Failed to delete answer', 'error');
      })
      .finally(() => setConfirmLoading(false));
  };

  return (
    <>
      <TableRow>
        <TableCell>
          {answer.answer.primary_text}
        </TableCell>
        <TableCell align="center">
          {!answer.answer.is_incorrect && <CheckIcon />}
          {answer.answer.is_incorrect && <CloseIcon />}
        </TableCell>
        <TableCell align="center">
          <Button style={{ cursor: 'text' }} onClick={() => setDialogOpen(true)}>
            {answer.answer_sequence}
          </Button>
        </TableCell>
        <TableCell align="center">
          <Link to={`/answer/${answer.answer_id}?question_id=${id}`}>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton aria-label="delete" onClick={() => setConfirmOpen(true)} style={{ marginLeft: 10 }}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} aria-labelledby="customized-dialog-title">
        <DialogTitle id="simple-dialog-title">Update answer Sequence</DialogTitle>
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
                  name="answer_sequence"
                  component={renderInput}
                  label="Answer Sequence"
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
        title="Delete answer"
        content="Are you sure you want to detach this answer?"
        onConfirm={handleConfirm}
        onClose={() => setConfirmOpen(false)}
      />
    </>
  );
};

export default SingleQuestionAnswer;
