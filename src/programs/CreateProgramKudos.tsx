/* eslint-disable max-len */
import * as React from 'react';
import { useState } from 'react';
import {
  Button, Dialog, DialogContent,
} from '@material-ui/core';
import { ReferenceInput, SelectInput, useNotify } from 'react-admin';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const CreateProgramKudo = ({ program_id, onCreate }: any) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [kudosId, setKudoId]: any = useState(null);

  const notify = useNotify();

  const optionRenderer = (kudo: any) => {
    if (!kudo) {
      return '';
    }
    return `${kudo.title} - Day: ${kudo.day} - Min Complete Percentage: ${kudo.min_complete_percentage}`;
  };

  const addKudo = () => {
    const data: any = { kudos_id: kudosId, program_id };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
    axios
      .post(`${API_URL}/kudos/program`, data, { headers })
      .then(() => {
        onCreate();
        setKudoId(null);
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
            Add Kudo
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
            label="Kudo"
            source="id"
            reference="kudos"
            perPage={99}
            value={kudosId}
            onChange={(e: any) => setKudoId(e.target.value)}
          >
            <SelectInput fullwidth optionText={optionRenderer} />
          </ReferenceInput>
          <Button
            type="button"
            variant="contained"
            color="primary"
            disabled={kudosId === null || program_id == null}
            onClick={addKudo}
          >
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateProgramKudo;
