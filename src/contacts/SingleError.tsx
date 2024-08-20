import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    width: '100%',
    '& td': {
      padding: '5px 20px',
    },
  },
  w100: {
    width: '100%',
  },
  card: {
    marginBottom: 20,
  },
});

const SingleError = ({ errors } : any) => {
  const classes = useStyles();

  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="errors table">
          <TableHead>
            <TableRow>
              <TableCell>Reagent</TableCell>
              <TableCell>Error</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {errors.map((error: any) => (
              <TableRow>
                <TableCell>
                  <span>{ error.reagent && error.reagent?.name }</span>
                </TableCell>
                <TableCell>
                  <span>{ error.reagent && error.sample_error?.label}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default React.memo(SingleError);
