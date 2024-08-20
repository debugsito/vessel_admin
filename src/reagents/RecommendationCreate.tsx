import React, { useState } from 'react';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import BucketRecommendationForm from './BucketRecommendationForm';

const useStyles = makeStyles({
  dialogContent: {
    width: '500px',
    maxWidth: '90vw',
    boxSizing: 'border-box',
  },
  flex: {
    display: 'flex',
  },
});

const RecommendationCreate = ({ onCreate, bucketId }: any) => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = (payload: any) => {
    onCreate(payload);
  };

  return (
    <>
      <Chip
        label={<span className={classes.flex}><AddIcon fontSize="small" /></span>}
        color="default"
        onClick={() => setDialogOpen(true)}
      />
      <Dialog open={dialogOpen}>
        <DialogTitle>
          Create Lifestyle Recommendation
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <BucketRecommendationForm
            closeDialog={() => setDialogOpen(false)}
            onSubmit={handleSubmit}
            bucketId={bucketId}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default React.memo(RecommendationCreate);
