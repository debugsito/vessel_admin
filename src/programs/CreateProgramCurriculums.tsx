/* eslint-disable max-len */
import * as React from 'react';
import { useState } from 'react';
import {
  Button, Dialog, DialogContent,
} from '@material-ui/core';
import { ReferenceInput, SelectInput, useNotify } from 'react-admin';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const CreateProgramCurriculums = ({ program_id, onCreate }: any) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [curriculumId, setCurriculumId]: any = useState(null);

  const notify = useNotify();

  const optionRenderer = (curriculum: any) => {
    if (!curriculum) {
      return '';
    }
    return `${curriculum.title}`;
  };

  const addCurriculum = () => {
    const data: any = { curriculum_id: curriculumId };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
    axios
      .put(`${API_URL}/program/${program_id}`, data, { headers })
      .then(() => {
        onCreate();
        setCurriculumId(null);
      })
      .catch(() => {
        notify('Failed to create/update', 'error');
      });
  };

  return (
    <>
      {program_id !== undefined && (
        <div style={{ maxWidth: 500 }}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={() => setDialogOpen(true)}
          >
            Add Curriculum
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
            label="Curriculum"
            source="id"
            reference="curriculum"
            perPage={99}
            value={curriculumId}
            onChange={(e: any) => setCurriculumId(e.target.value)}
          >
            <SelectInput fullwidth optionText={optionRenderer} />
          </ReferenceInput>
          <Button
            type="button"
            variant="contained"
            color="primary"
            disabled={curriculumId === null || program_id == null}
            onClick={addCurriculum}
          >
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateProgramCurriculums;
