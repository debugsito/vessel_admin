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
import CreateTagGoal from './CreateTagGoal';

const TagTips = (props: any) => {
  const { loaded, record } = useEditController(props);
  const refresh = useRefresh();

  return (
    <>
      <TableContainer>
        <Table aria-label="goals table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Impact</TableCell>
              <TableCell align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loaded && record && record.tag_goals && record.tag_goals.map((goal: any) => (
              <TableRow key={goal.id}>
                <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                  {goal.name}
                </TableCell>
                <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>
                  <CreateTagGoal
                    initialImpact={goal.impact}
                    initialGoalId={goal.id}
                    tagId={record && record.id}
                    onCreate={refresh}
                  />
                </TableCell>
                <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>
                  <DeleteButton url={`tag/${record.id}/goal`} id={goal.id} onDelete={refresh} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <CreateTagGoal tagId={record && record.id} onCreate={refresh} />
      <br />
    </>
  );
};

export default TagTips;
