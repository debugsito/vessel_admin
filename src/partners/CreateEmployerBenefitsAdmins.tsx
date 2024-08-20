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

const CreateEmployerBenefitsAdmins = ({ employer_id, onCreate }: any) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [benefitsAdminsId, setBenefitsAdminsId]: any = useState(null);

  const notify = useNotify();

  const addBenefitsAdmins = () => {
    const data: any = {
      benefits_administrator_id: benefitsAdminsId,
      employer_id,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
    axios
      .post(`${API_URL}/employer/benefits_admins`, data, { headers })
      .then(() => {
        onCreate();
        setBenefitsAdminsId(null);
      })
      .catch(() => {
        notify('Failed to create/update', 'error');
      });
  };

  return (
    <>
      {employer_id !== undefined && (
        <div style={{ maxWidth: 500 }}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={() => setDialogOpen(true)}
          >
            Add Benefits Admins
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
            label="Benefits Admins"
            source="id"
            reference="benefits_admins"
            perPage={99}
            value={benefitsAdminsId}
            onChange={(e: any) => setBenefitsAdminsId(e.target.value)}
          >
            <SelectInput fullwidth optionText="email" />
          </ReferenceInput>

          <Button
            type="button"
            variant="contained"
            color="primary"
            disabled={benefitsAdminsId === null || employer_id == null}
            onClick={addBenefitsAdmins}
          >
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateEmployerBenefitsAdmins;
