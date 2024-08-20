/* eslint-disable no-restricted-globals */
import * as React from 'react';
import { useState } from 'react';
import { withTypes } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import {
  Button,
  CardActions,
  CircularProgress,
  Dialog,
  DialogContent,
} from '@material-ui/core';
import {
  ReferenceInput,
  SelectInput,
  useNotify,
  ArrayInput, SimpleFormIterator,
  NumberInput, required,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

const useStyles = makeStyles((theme) => ({
  hint: {
    marginTop: '1em',
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.grey[500],
  },
  form: {
    padding: '0 1em 1em 1em',
  },
  input: {
    marginBottom: '20px',
  },
  actions: {
    padding: '0 1em 1em 1em',
  },
}));
interface FormValues {
  tipData?: any,
}

const { Form } = withTypes<FormValues>();

const CreateTagTip = ({ tagId, onCreate }: any) => {
  const [loading, setLoading] : any = useState(false);
  const closeDialog = () => {};
  const classes = useStyles();
  const notify = useNotify();
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleSubmit = (values: FormValues) => {
    setLoading(true);

    const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}` };
    const successMessage = 'Created successfully';
    const method = 'POST';
    const url = `${baseUrl}/tag/${tagId}/tips`;
    axios.request({
      method, url, data: values, headers,
    })
      .then(
        () => {
          notify(successMessage);
          onCreate();
          closeDialog();
        },
        () => {
          notify('Something went wrong');
        },
      )
      .finally(() => {
        setLoading(false);
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const validate = (values: FormValues) => {
    const errors: FormValues = {};
    return errors;
  };

  return (
    <>
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
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} aria-labelledby="customized-dialog-title">
        <DialogContent>
          <Form
            onSubmit={handleSubmit}
            validate={validate}
            mutators={{ ...arrayMutators }}
          // eslint-disable-next-line @typescript-eslint/no-shadow
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} noValidate>
                <div>
                  <div className={classes.form}>
                    <div className={classes.input}>
                      <ArrayInput source="tipTag">
                        <SimpleFormIterator>
                          <ReferenceInput
                            fullWidth
                            label="Tip"
                            source="tip_id"
                            reference="tip"
                            perPage={99}
                          >
                            <SelectInput
                              fullwidth
                              optionText="title"
                            />
                          </ReferenceInput>
                          <NumberInput
                            source="impact"
                            label="impact"
                            fullWidth
                            validate={required()}
                          />
                        </SimpleFormIterator>
                      </ArrayInput>
                    </div>
                  </div>
                  <CardActions className={classes.actions}>
                    <Button
                      type="button"
                      color="primary"
                      disabled={loading}
                      onClick={() => setDialogOpen(false)}
                      fullWidth
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      type="button"
                      color="primary"
                      disabled={loading}
                      onClick={handleSubmit}
                      fullWidth
                    >
                      {loading && (
                      <CircularProgress
                        size={25}
                        thickness={2}
                      />
                      )}
                      Save
                    </Button>
                  </CardActions>
                </div>
              </form>
            )}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateTagTip;
