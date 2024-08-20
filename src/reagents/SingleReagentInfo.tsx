import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { Confirm, useDataProvider, useNotify } from 'react-admin';
import { useParams, Link } from 'react-router-dom';

import Chip from '@material-ui/core/Chip';

const SingleReagentInfo = ({ item, onDelete }: any) => {
  const { id }: any = useParams();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const notify = useNotify();
  const dataProvider = useDataProvider();

  const handleConfirm = () => {
    setConfirmLoading(true);
    const params: any = { id: item.id };
    dataProvider.delete('reagent-info', params)
      .then(() => {
        onDelete(item.id);
      })
      .catch((error) => {
        notify('Failed to delete item', error);
      })
      .finally(() => setConfirmLoading(false));
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <img src={item.coming_soon_image} style={{ width: 50, maxHeight: 120, objectFit: 'contain' }} alt="" />
        </TableCell>
        <TableCell>
          {item.title}
        </TableCell>
        <TableCell>
          {item.description}
        </TableCell>
        <TableCell>
          {item.info_type}
        </TableCell>
        <TableCell style={{ maxWidth: 200 }}>
          {item.coming_soon_tag_items && item.coming_soon_tag_items.map((tag: any) => (
            <Chip
              size="small"
              label={tag}
              style={{ marginRight: 10, marginBottom: 10 }}
            />
          ))}
        </TableCell>
        <TableCell>
          <Link to={`/reagent-info/${item.id}/?reagent_id=${id}`} style={{ textDecoration: 'none' }}>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton aria-label="delete" onClick={() => setConfirmOpen(true)} style={{ marginLeft: 10 }}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <Confirm
        isOpen={confirmOpen}
        loading={confirmLoading}
        title="Delete info"
        content="Are you sure you want to delete this info?"
        onConfirm={handleConfirm}
        onClose={() => setConfirmOpen(false)}
      />
    </>
  );
};

export default React.memo(SingleReagentInfo);
