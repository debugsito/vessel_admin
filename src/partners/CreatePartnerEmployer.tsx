/* eslint-disable max-len */
import * as React from 'react';
import { useState } from 'react';
import { Button, Dialog, DialogContent } from '@material-ui/core';
import {
  ReferenceInput,
  SelectInput,
  useNotify,
} from 'react-admin';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const CreateContactEmployer = ({ contact_id, onCreate }: any) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [employerId, setEmployerId]: any = useState(null);

  const notify = useNotify();

  const addEmployer = () => {
    const data: any = {
      employer_id: employerId,
      contact_id,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
    axios
      .post(`${API_URL}/employer/contact`, data, { headers })
      .then(() => {
        onCreate();
        setEmployerId(null);
      })
      .catch(() => {
        notify('Failed to create/update', 'error');
      });
  };

  return (
    <>
      {contact_id !== undefined && (
        <div style={{ maxWidth: 500 }}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={() => setDialogOpen(true)}
          >
            Add Employer
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
            label="Employer"
            source="id"
            reference="employer"
            perPage={99}
            value={employerId}
            onChange={(e: any) => setEmployerId(e.target.value)}
          >
            <SelectInput fullwidth optionText="name" />
          </ReferenceInput>

          <Button
            type="button"
            variant="contained"
            color="primary"
            disabled={employerId === null || contact_id == null}
            onClick={addEmployer}
          >
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateContactEmployer;
