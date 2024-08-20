import React, { useState } from 'react';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import BucketRecommendationForm from './BucketRecommendationForm';

const API_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles({
  dialogContent: {
    width: '500px',
    maxWidth: '90vw',
    boxSizing: 'border-box',
  },
});

const BucketRecommendation = ({ item, onUpdate, onDelete }: any) => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleDelete = () => {
    setDisabled(true);
    const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}` };
    const method = 'DELETE';
    const url = `${API_URL}/reagent-lifestyle-recommendation/${item.id}`;
    axios.request({
      method, url, data: {}, headers,
    })
      .then(
        () => {
          onDelete(item.id);
        },
      )
      .finally(() => {
        setDisabled(false);
      });
  };

  const handleClick = () => {
    setDialogOpen(true);
  };

  const handleSubmit = (payload: any) => {
    onUpdate(payload);
  };

  return (
    <>
      <Chip
        label={`${item.activity_name} (${item.quantity} ${item.unit})`}
        component="span"
        color="default"
        onClick={handleClick}
        onDelete={handleDelete}
        disabled={disabled}
      />
      <Dialog open={dialogOpen}>
        <DialogTitle>
          Edit Lifestyle Recommendation
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <BucketRecommendationForm
            closeDialog={() => setDialogOpen(false)}
            onSubmit={handleSubmit}
            bucketId={item.reagent_bucket_id}
            recommendation={item}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default React.memo(BucketRecommendation);
