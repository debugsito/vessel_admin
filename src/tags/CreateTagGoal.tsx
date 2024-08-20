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

const CreateTagGoal = ({
  tagId, initialImpact, initialGoalId, onCreate,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [goalId, setGoalId]: any = useState(null);
  const [impact, setImpact]: any = useState(null);
  const notify = useNotify();
  const dataProvider = useDataProvider();

  const addGoal = () => {
    setLoading(true);
    const data: any = { impact };
    dataProvider.create(`tag/${tagId}/goal/${goalId}`, { data })
      .then(() => {
        onCreate();
        setGoalId(null);
      })
      .catch(() => {
        notify('Failed to create/update', 'error');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (initialImpact !== undefined) {
      setImpact(initialImpact);
      setGoalId(initialGoalId);
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
          Add Tip
        </Button>
      </div>
      )}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} aria-labelledby="customized-dialog-title">
        <DialogContent>
          {initialImpact === undefined && (
          <ReferenceInput
            fullWidth
            label="Goal"
            source="goal_id"
            reference="goal"
            perPage={99}
            value={goalId}
            onChange={(e: any) => setGoalId(e.target.value)}
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
            disabled={loading || goalId === null || impact === null || impact < -10 || impact > 10}
            onClick={addGoal}
          >
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default React.memo(CreateTagGoal);
