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
import CreateProgramKudos from './CreateProgramKudos';

const ProgramKudos = (props: any) => {
  const { loaded, record } = useEditController(props);
  const refresh = useRefresh();

  return (
    <>
      <TableContainer>
        <Table aria-label="kudos table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="center">Day</TableCell>
              <TableCell align="center">Min Complete %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loaded
              && record
              && record.kudos
              && record.kudos.map((kudo: any) => (
                <TableRow key={kudo.id}>
                  <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                    {kudo.title}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ paddingTop: 5, paddingBottom: 5 }}
                  >
                    {kudo.description}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ paddingTop: 5, paddingBottom: 5 }}
                  >
                    {kudo.day}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ paddingTop: 5, paddingBottom: 5 }}
                  >
                    {kudo.min_complete_percentage}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <CreateProgramKudos
        record={record}
        program_id={record && record.id}
        onCreate={refresh}
      />
      <br />
    </>
  );
};

export default ProgramKudos;
