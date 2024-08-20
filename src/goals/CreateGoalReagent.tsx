/* eslint-disable max-len */
import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  TextField,
} from '@material-ui/core';
import {
  ReferenceInput,
  SelectInput,
  useDataProvider,
  useNotify,
} from 'react-admin';

const CreateGoalReagent = ({
  goalId, initialImpact, initialReagentId, onCreate,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reagentId, setReagentId]: any = useState(null);
  const [impact, setImpact]: any = useState(null);
  const notify = useNotify();
  const dataProvider = useDataProvider();

  const addReagent = () => {
    setLoading(true);
    const data: any = { impact, reagent_id: reagentId };
    dataProvider.create(`goal/${goalId}/reagents`, { data })
      .then(() => {
        onCreate();
        setReagentId(null);
      })
      .catch(() => {
        notify('Failed to create/update', 'error');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (initialImpact !== undefined) {
      setImpact(initialImpact);
      setReagentId(initialReagentId);
    }
  }, []);

  return (
    <>
      {initialImpact !== undefined && (
      <Button style={{ cursor: 'text' }} onClick={() => setDialogOpen(true)}>
        {initialImpact}
      </Button>
      )}
      {initialImpact === undefined && (
      <div style={{ maxWidth: 500 }}>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={() => setDialogOpen(true)}
        >
          Add Reagent
        </Button>
      </div>
      )}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} aria-labelledby="customized-dialog-title">
        <DialogContent>
          {initialImpact === undefined && (
          <ReferenceInput
            fullWidth
            label="Reagent"
            source="reagent_id"
            reference="reagent"
            perPage={99}
            value={reagentId}
            onChange={(e: any) => setReagentId(e.target.value)}
          >
            <SelectInput
              fullwidth
              optionText="name"
            />
          </ReferenceInput>
          )}
          <TextField
            label="Impact"
            type="number"
            fullWidth
            style={{ marginBottom: 25 }}
            defaultValue={impact}
            onChange={(e: any) => (
              setImpact(Number.isInteger(parseInt(e.target.value, 10))
                && parseInt(e.target.value, 10))
            )}
          />
          <Button
            type="button"
            variant="contained"
            color="primary"
            disabled={loading || reagentId === null || impact === null || impact < -10 || impact > 10}
            onClick={addReagent}
          >
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateGoalReagent;
