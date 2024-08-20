/* eslint-disable max-len */
import * as React from 'react';
import { useState } from 'react';
import { Button, Dialog, DialogContent } from '@material-ui/core';
import {
  AutocompleteInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  FormDataConsumer,
  useNotify,
} from 'react-admin';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const optionRenderer = (choice: any) => {
  if (!choice) {
    return '';
  }
  return `${choice.internal_title} - ${choice.title}`;
};

const CreateCurriculumLesson = ({ curriculum_id, onCreate }: any) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [lessonId, setLessonId]: any = useState(null);
  const [day, setDay]: any = useState(null);
  const [lessonSequence, setLessonSequence]: any = useState(null);

  const notify = useNotify();

  const addLesson = () => {
    const data: any = {
      lesson_id: lessonId,
      curriculum_id,
      day,
      lesson_sequence: lessonSequence,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
    axios
      .post(`${API_URL}/curriculum/lesson`, data, { headers })
      .then(() => {
        onCreate();
        setLessonId(null);
      })
      .catch(() => {
        notify('Failed to create/update', 'error');
      });
  };

  return (
    <>
      {curriculum_id !== undefined && (
        <div style={{ maxWidth: 500 }}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={() => setDialogOpen(true)}
          >
            Add Lesson
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
            label="Lesson"
            source="id"
            reference="lesson"
            perPage={20}
            value={lessonId}
            onChange={(e: any) => setLessonId(e.target.value)}
          >
            <SelectInput fullwidth optionText="title" />
          </ReferenceInput>
          <ReferenceInput
            fullWidth
            label="Lesson Search"
            source="id"
            reference="lesson"
            perPage={20}
            value={lessonId}
            onChange={(e: any) => {
              setLessonId(e);
            }}
            filterToQuery={(searchText) => ({ search: searchText })}
          >
            <AutocompleteInput optionText={optionRenderer} />
          </ReferenceInput>

          <NumberInput source="day" label="Day" />
          <NumberInput source="lessonSequence" label="Lesson Sequence" />
          <FormDataConsumer>
            {({ formData }) => setDay(formData.day)}
          </FormDataConsumer>
          <FormDataConsumer>
            {({ formData }) => setLessonSequence(formData.lessonSequence)}
          </FormDataConsumer>

          <Button
            type="button"
            variant="contained"
            color="primary"
            disabled={lessonId === null || curriculum_id == null}
            onClick={addLesson}
          >
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateCurriculumLesson;
