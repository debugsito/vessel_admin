import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DoneIcon from '@material-ui/icons/Done';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles({
  dialogContent: {
    width: '500px',
    maxWidth: '90vw',
    boxSizing: 'border-box',
  },
  table: {
    width: '100%',
  },
});

const ProductPriceForm = ({ product }: any) => {
  const [prices, setPrices]: any = useState([]);

  useEffect(() => {
    if (product?.price?.length) setPrices([...product.price]);
  }, [product]);

  const classes = useStyles();

  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="prices table">
          <TableHead>
            <TableRow>
              <TableCell>Price</TableCell>
              <TableCell align="center">Currency</TableCell>
              <TableCell align="center">Group</TableCell>
              <TableCell align="center">Start date</TableCell>
              <TableCell align="center">End date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prices.map((price: any) => (
              <TableRow key={price.id}>
                <TableCell>{price.price}</TableCell>
                <TableCell align="center">{price.currency}</TableCell>
                <TableCell align="center">{price.price_group}</TableCell>
                <TableCell align="center">{price.start_date}</TableCell>
                <TableCell align="center">
                  {price.end_date}
                  {!price.end_date && (
                  <Chip
                    label="Active Price"
                    size="small"
                    icon={<DoneIcon />}
                    style={{ backgroundColor: '#c5dbbb' }}
                  />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProductPriceForm;
