/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState, useEffect } from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { Confirm } from 'ra-ui-materialui';
import { useNotify } from 'ra-core';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';

import BucketRecommendation from './BucketRecommendation';
import RecommendationCreate from './RecommendationCreate';
import BucketCreateEdit from './BucketCreateEdit';

const API_URL = process.env.REACT_APP_API_URL;

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
  alignMiddle: {
    display: 'flex',
    alignItems: 'center',
  },
  actionButtonsContainer: {
    minWidth: 180,
  },
  root: {
    display: 'flex',
    minWidth: 180,
    flexWrap: 'wrap',
    paddingTop: 5,
    '& > *': {
      marginBottom: 5,
      marginRight: 5,
    },
  },
  flex: {
    display: 'flex',
  },
});

const SingleBucket = ({
  bucket, onBucketDelete, onBucketUpdate, reagentUnit,
} : any) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [recommendations, setRecommendations]: any = useState([]);

  const notify = useNotify();
  const classes = useStyles();

  const handleBucketUpdate = (bucket: any) => {
    onBucketUpdate(bucket);
    setDialogOpen(false);
  };

  const isColor = (strColor: any) => {
    const regex = /^#[0-9a-fA-F]{8}$|#[0-9a-fA-F]{6}$|#[0-9a-fA-F]{4}$|#[0-9a-fA-F]{3}$/;
    return regex.test(strColor);
  };

  const handleConfirm = () => {
    setConfirmLoading(true);
    const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}` };
    axios.delete(`${API_URL}/reagent/${bucket.reagent_id}/bucket/${bucket.id}`, { headers })
      .then(
        () => {
          onBucketDelete(bucket.id);
        },
        () => {
          notify('Something went wrong', 'warning');
        },
      )
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  useEffect(() => {
    if (bucket?.lifestyle_recommendations?.length > 0
      && recommendations.length === 0) setRecommendations([...bucket?.lifestyle_recommendations]);
  }, [bucket]);

  const handleRecommendationUpdate = (recommendation: any) => {
    const updated: any = recommendations.map((item: any) => {
      if (recommendation.id === item.id) return recommendation;
      return item;
    });
    setRecommendations(updated);
  };

  const handleRecommendationDelete = (id: any) => {
    const updated: any = recommendations.filter((item: any) => id !== item.id);
    setRecommendations(updated);
  };

  const handleRecommendationCreate = (recommendation: any) => {
    const updated: any = [...recommendations, recommendation];
    setRecommendations(updated);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <div className={classes.alignMiddle}>
            <span style={{
              width: 15, height: 15, display: 'inline-block', marginRight: 10, backgroundColor: isColor(bucket.color) ? bucket.color : '#fff',
            }}
            />
            {bucket.color}
          </div>
        </TableCell>
        <TableCell>
          {bucket.low_value}
          {' '}
          {reagentUnit}
        </TableCell>
        <TableCell>
          {bucket.high_value}
          {' '}
          {reagentUnit}
        </TableCell>
        <TableCell>
          {bucket.score}
        </TableCell>
        <TableCell>
          {bucket.reported_value}
        </TableCell>
        <TableCell>
          {bucket.supplement_rda_multiplier}
        </TableCell>
        <TableCell>
          {bucket.food_rda_multiplier}
        </TableCell>
        <TableCell>
          <div className={classes.root}>
            {recommendations.map((item: any) => (
              <BucketRecommendation
                onUpdate={handleRecommendationUpdate}
                key={item.id}
                item={item}
                onDelete={handleRecommendationDelete}
              />
            ))}
            <RecommendationCreate onCreate={handleRecommendationCreate} bucketId={bucket.id} />
          </div>
        </TableCell>
        <TableCell>
          {bucket.label}
        </TableCell>
        <TableCell className={classes.actionButtonsContainer}>
          <Button color="primary" size="small" onClick={() => setDialogOpen(true)}>
            Edit
          </Button>
          <Button style={{ color: 'red', marginLeft: 10 }} onClick={() => setConfirmOpen(true)} size="small">Delete</Button>
        </TableCell>
      </TableRow>
      <Confirm
        isOpen={confirmOpen}
        loading={confirmLoading}
        title="Delete bucket"
        content="Are you sure that you want to delete this bucket?"
        onConfirm={handleConfirm}
        onClose={() => setConfirmOpen(false)}
      />
      <Dialog open={dialogOpen}>
        <DialogTitle id="simple-dialog-title">
          Create Bucket
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <BucketCreateEdit
            onSubmit={handleBucketUpdate}
            reagentId={bucket.reagent_id}
            bucket={bucket}
            closeDialog={() => setDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default React.memo(SingleBucket);
