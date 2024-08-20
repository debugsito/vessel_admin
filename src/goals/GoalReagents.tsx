/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import {
  useEditController, useRefresh,
} from 'react-admin';
import DeleteButton from '../components/DeleteButton';
import CreateGoalReagent from './CreateGoalReagent';

const GoalReagents = (props: any) => {
  const { loaded, record } = useEditController(props);
  const refresh = useRefresh();

  return (
    <>
      <TableContainer>
        <Table aria-label="goals table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="center">Impact</TableCell>
              <TableCell align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loaded && record && record.reagents && record.reagents.map((reagent: any) => (
              <TableRow key={reagent.id}>
                <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                  {reagent.name}
                </TableCell>
                <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>
                  <CreateGoalReagent
                    initialImpact={reagent.impact}
                    initialReagentId={reagent.id}
                    goalId={record && record.id}
                    onCreate={refresh}
                  />
                </TableCell>
                <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>
                  <DeleteButton url={`goal/${record.id}/reagent`} id={reagent.id} onDelete={refresh} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <CreateGoalReagent goalId={record && record.id} onCreate={refresh} />
      <br />
    </>
  );
};

export default GoalReagents;
