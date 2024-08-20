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
import { useEditController, useRefresh } from 'react-admin';
import DeleteButton from '../components/DeleteButton';
import CreateProgramEssential from './CreateProgramEssential';

const ProgramEssentials = (props: any) => {
  const { loaded, record } = useEditController(props);
  const refresh = useRefresh();

  return (
    <>
      <TableContainer>
        <Table aria-label="essentials table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="center">Days</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loaded
              && record
              && record.essentials
              && record.essentials.map((essential: any) => (
                <TableRow key={essential.id}>
                  <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                    {essential.title}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ paddingTop: 5, paddingBottom: 5 }}
                  >
                    {essential.days && essential.days.join(', ')}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <CreateProgramEssential
        record={record}
        program_id={record && record.id}
        onCreate={refresh}
      />
      <br />
    </>
  );
};

export default ProgramEssentials;
