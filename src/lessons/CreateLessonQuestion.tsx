/* eslint-disable max-len */
import * as React from 'react';
import { useState } from 'react';
import { Button, Dialog, DialogContent } from '@material-ui/core';
import {
  NumberInput,
  ReferenceInput,
  FormDataConsumer,
  useNotify,
  AutocompleteInput,
} from 'react-admin';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const optionRenderer = (choice: any) => {
  if (!choice) {
    return '';
  }
  return `${choice.id} - ${choice.text}`;
};

const CreateQuestionQuestion = ({ lesson_id, onCreate }: any) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [questionId, setQuestionId]: any = useState(null);
  const [questionSequence, setQuestionSequence]: any = useState(null);

  const notify = useNotify();

  const addQuestion = () => {
    const data: any = {
      question_id: questionId,
      lesson_id,
      question_sequence: questionSequence,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
    axios
      .post(`${API_URL}/lesson/question`, data, { headers })
      .then(() => {
        onCreate();
        setQuestionId(null);
      })
      .catch(() => {
        notify('Failed to create lesson to question association', 'error');
      });
  };

  return (
    <>
      {lesson_id !== undefined && (
        <div style={{ maxWidth: 500 }}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={() => setDialogOpen(true)}
          >
            Add Question
          </Button>
        </div>
      )}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="customized-dialog-title"
      >
        <DialogContent>
          <ReferenceInput
            fullWidth
            label="Question"
            source="id"
            reference="question"
            perPage={20}
            value={questionId}
            onChange={(e: any) => {
              setQuestionId(e);
            }}
            filterToQuery={(searchText) => ({ search: searchText })}
          >
            <AutocompleteInput optionText={optionRenderer} />
          </ReferenceInput>

          <NumberInput source="questionSequence" label="Question Sequence" />
          <FormDataConsumer>
            {({ formData }) => setQuestionSequence(formData.questionSequence)}
          </FormDataConsumer>

          <Button
            type="button"
            variant="contained"
            color="primary"
            disabled={questionId === null || lesson_id == null}
            onClick={addQuestion}
          >
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateQuestionQuestion;
