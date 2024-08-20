/* eslint-disable max-len */
import * as React from 'react';
import { useState } from 'react';
import {
  Button, Dialog, DialogContent,
} from '@material-ui/core';
import {
  CheckboxGroupInput,
  ReferenceInput,
  SelectInput,
  FormDataConsumer,
  useNotify,
} from 'react-admin';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const CreateProgramEssential = ({ record, program_id, onCreate }: any) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [essentialId, setEssentialId]: any = useState(null);
  const [days, setDays]: any = useState(null);

  const notify = useNotify();

  const addEssential = () => {
    const data: any = { essentialId, program_id, days };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
    axios
      .post(`${API_URL}/essential/program`, data, { headers })
      .then(() => {
        onCreate();
        setEssentialId(null);
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
            Add Essential
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
            label="Essential"
            source="id"
            reference="essential"
            perPage={99}
            value={essentialId}
            onChange={(e: any) => setEssentialId(e.target.value)}
          >
            <SelectInput fullwidth optionText="title" />
          </ReferenceInput>

          <CheckboxGroupInput
            source="days"
            choices={Array.from(Array(record.duration_days).keys()).map(
              (x, i) => ({ day: i + 1, name: (i + 1).toString(), key: i }),
            )}
            optionValue="day"
            optionText="name"
          />
          <FormDataConsumer>
            {({ formData }) => (
              setDays(formData.days)
            )}
          </FormDataConsumer>

          <Button
            type="button"
            variant="contained"
            color="primary"
            disabled={
              essentialId === null || program_id == null
            }
            onClick={addEssential}
          >
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateProgramEssential;
