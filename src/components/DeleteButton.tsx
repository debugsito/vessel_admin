import * as React from 'react';
import { useState } from 'react';
import {
  IconButton,
} from '@material-ui/core';
import {
  Confirm,
  useDataProvider,
  useNotify,
} from 'react-admin';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteButton = ({ url, id, onDelete }: any) => {
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const notify = useNotify();
  const dataProvider = useDataProvider();

  const handleConfirm = () => {
    setLoading(true);
    const params: any = { id };
    dataProvider.delete(`${url}`, params)
      .then(() => {
        onDelete();
      })
      .catch(() => {
        notify('Failed to delete', 'error');
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <IconButton disabled={loading} aria-label="delete" onClick={() => setConfirmOpen(true)}>
        <DeleteIcon />
      </IconButton>
      <Confirm
        isOpen={confirmOpen}
        loading={loading}
        title="Delete"
        content="Are you sure you want to delete this?"
        onConfirm={handleConfirm}
        onClose={() => setConfirmOpen(false)}
      />
    </>
  );
};

export default React.memo(DeleteButton);
