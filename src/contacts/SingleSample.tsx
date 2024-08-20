import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import SingleReagent from './SingleReagent';

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
});

const SingleSample = ({ sample, contactId } : any) => {
  const classes = useStyles();

  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="reagents table">
          <TableHead>
            <TableRow>
              <TableCell>Reagent name</TableCell>
              <TableCell>Reagent type</TableCell>
              <TableCell align="center">Score</TableCell>
              <TableCell align="center">Value</TableCell>
              <TableCell align="center">Unit</TableCell>
              <TableCell align="center">Label</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sample.scores.reagents.map((reagent: any) => (
              <SingleReagent key={`${sample.sample_id}_${reagent.score_id}`} contactId={contactId} reagent={reagent} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default React.memo(SingleSample);
