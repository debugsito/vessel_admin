import React, { useState } from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {
  Confirm, useDataProvider, useNotify,
} from 'react-admin';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const SingleNutrient = ({ nutrient, reagents, onDelete }: any) => {
  const getReagentInfo = (key: string) => {
    let reagentName: any = '';
    // eslint-disable-next-line array-callback-return
    reagents.map((reagent: any) => {
      if (nutrient.reagent_id && reagent.id === nutrient.reagent_id) reagentName = reagent[key];
    });
    return reagentName;
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dataProvider = useDataProvider();
  const notify = useNotify();

  const handleConfirm = () => {
    setConfirmLoading(true);
    const params: any = { id: nutrient.id };
    dataProvider.delete('nutrient', params)
      .then(() => {
        onDelete(nutrient.id);
      })
      .catch(() => {
        notify('Failed to delete answer', 'error');
      })
      .finally(() => setConfirmLoading(false));
  };

  return (
    <>
      <TableRow>
        <TableCell>
          {nutrient.name}
        </TableCell>
        <TableCell align="center">
          {nutrient.quantity}
        </TableCell>
        <TableCell align="center">
          {getReagentInfo('unit')}
        </TableCell>
        <TableCell align="center">
          {getReagentInfo('name')}
        </TableCell>
        <TableCell align="center">
          <Link to={`/nutrient/${nutrient.id}?food_id=${nutrient.food_id}`}>
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
        title="Delete nutrient"
        content="Are you sure you want to delete this nutrient?"
        onConfirm={handleConfirm}
        onClose={() => setConfirmOpen(false)}
      />
    </>
  );
};

export default React.memo(SingleNutrient);
