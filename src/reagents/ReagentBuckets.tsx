import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CircularProgress } from '@material-ui/core';
import { useShowController } from 'ra-core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import SingleBucket from './SingleBucket';
import BucketCreateEdit from './BucketCreateEdit';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    width: '100%',
    '& td': {
      padding: '5px 20px',
    },
  },
  w100: {
    width: '100%',
  },
  m0: {
    margin: '0',
  },
  card: {
    marginBottom: 20,
  },
  error: {
    color: 'red',
    fontSize: 14,
    fontStyle: 'italic',
  },
  accordionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  dialogContent: {
    width: '500px',
    maxWidth: '90vw',
    boxSizing: 'border-box',
  },
});

const ReagentBuckets = (props: any) => {
  const classes = useStyles();
  const { record, loaded, loading } : any = useShowController(props);
  const [buckets, setBuckets]: any = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleBucketCreate = (bucket: any) => {
    setBuckets([...buckets, bucket]);
  };

  const handleBucketDelete = (id: number) => {
    const newBuckets = buckets.filter((bucket: any) => bucket.id !== id);
    setBuckets([...newBuckets]);
  };

  const handleBucketUpdate = (newBucket: any) => {
    const newBuckets = buckets.map((bucket: any) => {
      if (bucket.id === newBucket.id) return newBucket;
      return bucket;
    });
    setBuckets([...newBuckets]);
  };

  useEffect(() => {
    if (record?.buckets) {
      setBuckets(record.buckets);
    }
  }, [loaded, loading]);
  return (
    <div className={classes.w100}>
      {loaded && (
      <div className={classes.buttonContainer}>
        <Button color="primary" variant="contained" onClick={() => { setDialogOpen(true); }}>Create Bucket</Button>
      </div>
      )}
      {loading && (
      <CircularProgress
        size={25}
        thickness={2}
      />
      )}
      {loaded && buckets.length > 0 && (
      <>
        <TableContainer>
          <Table className={classes.table} aria-label="buckets table">
            <TableHead>
              <TableRow>
                <TableCell>Color</TableCell>
                <TableCell>Low Value</TableCell>
                <TableCell>High Value</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Reported Value</TableCell>
                <TableCell>Supplement RDA Multiplier</TableCell>
                <TableCell>Food RDA Multiplier</TableCell>
                <TableCell>Lifestyle Recommendations</TableCell>
                <TableCell>Label</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {buckets.map((bucket: any) => (
                <SingleBucket
                  onBucketUpdate={handleBucketUpdate}
                  reagentUnit={record.unit}
                  onBucketDelete={handleBucketDelete}
                  key={bucket.id}
                  bucket={bucket}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
      )}
      {loaded && buckets.length === 0 && <h5>No buckets to show.</h5>}
      {loaded && (
      <Dialog open={dialogOpen} aria-labelledby="customized-dialog-title">
        <DialogTitle id="simple-dialog-title">
          Create Bucket
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <BucketCreateEdit
            onSubmit={handleBucketCreate}
            reagentUnit={record.unit}
            reagentId={record.id}
            closeDialog={() => setDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
      )}
    </div>
  );
};

export default React.memo(ReagentBuckets);
