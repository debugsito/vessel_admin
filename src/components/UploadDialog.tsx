import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AWS from 'aws-sdk';
import ImageUploader from 'react-images-upload';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useNotify } from 'react-admin';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
  dialogContent: {
    width: '500px',
    maxWidth: '90vw',
    boxSizing: 'border-box',
  },
  uploadingContainer: {
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const bucket = process.env.REACT_APP_AWS_MEDIA_BUCKET;
const keyId: any = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const secretKey: any = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

const s3Bucket = new AWS.S3({
  params: { Bucket: bucket },
  region: 'us-west-2',
});

s3Bucket.config.credentials = {
  accessKeyId: keyId,
  secretAccessKey: secretKey,
};

const UploadDialog = (props: any) => {
  const { upload } : any = props;
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const notify = useNotify();

  const handleUploadDone = (path: string) => {
    const baseUrl = process.env.REACT_APP_AWS_MEDIA_BUCKET === 'dev-vessel-media' ? 'https://dev-media.vesselhealth.com' : 'https://media.vesselhealth.com';
    upload(encodeURI(`${baseUrl}/${path}`));
    setDialogOpen(false);
  };
  const uploadFile = (file: any) => {
    setUploading(true);
    const dotIndex = file.name.lastIndexOf('.');
    const filename = `${file.name.substring(0, dotIndex)}_${Date.now()}${file.name.substring(dotIndex)}`;
    const params: any = {
      // ACL: 'public-read',
      Key: filename,
      ContentType: file.type,
      Body: file,
    };
    s3Bucket.putObject(params)
      .on('httpDone', () => {
        setUploading(false);
        handleUploadDone(filename);
      })
      .send((err) => {
        if (err) {
          setUploading(false);
          notify('Couldn\'t upload', 'error');
        }
      });
  };

  const handleImageChange = (image: any) => {
    uploadFile(image[0]);
  };

  const handleDialogClose = () => {
    if (!uploading) setDialogOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setDialogOpen(true)} color="primary">
        Set Image
      </Button>
      <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="customized-dialog-title">
        <DialogContent className={classes.dialogContent}>
          {uploading && (
          <div className={classes.uploadingContainer}>
            <CircularProgress
              size={25}
              thickness={2}
            />
          </div>
          )}
          {!uploading && (
          <ImageUploader
            withIcon
            buttonText="Choose image"
            onChange={handleImageChange}
            imgExtension={['.jpg', '.png']}
            label="Max file size: 5mb, accepted: jpg, png"
            maxFileSize={5242880}
            singleImage
          />
          )}

        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadDialog;
