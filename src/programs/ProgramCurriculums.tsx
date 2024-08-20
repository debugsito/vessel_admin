/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@material-ui/core';
import {
  useEditController, useRefresh, useNotify, Confirm,
} from 'react-admin';

import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateProgramCurriculums from './CreateProgramCurriculums';

const API_URL = process.env.REACT_APP_API_URL;

const ProgramCurriculums = (props: any) => {
  const { loaded, record } = useEditController(props);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const refresh = useRefresh();
  const notify = useNotify();

  const deleteCurriculum = () => {
    const data: any = { curriculum_id: null };
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
    axios
      .put(`${API_URL}/program/${record?.id}`, data, { headers })
      .then(() => {
        refresh();
      })
      .catch(() => {
        notify('Failed to create/update', 'error');
      });
  };

  return (
    <>
      <TableContainer>
        <Table aria-label="kudos table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Goal Id</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loaded && record && record.curriculum && (
              <>
                <TableRow key={record.curriculum.id}>
                  <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                    {record.curriculum?.title}
                  </TableCell>
                  <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                    {record.curriculum?.goal_id}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ paddingTop: 5, paddingBottom: 5 }}
                  >
                    <>
                      <IconButton
                        disabled={loading}
                        aria-label="delete"
                        onClick={() => setConfirmOpen(true)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <Confirm
                        isOpen={confirmOpen}
                        loading={loading}
                        title="Delete"
                        content="Are you sure you want to delete this?"
                        onConfirm={deleteCurriculum}
                        onClose={() => setConfirmOpen(false)}
                      />
                    </>
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <CreateProgramCurriculums
        record={record}
        program_id={record && record.id}
        onCreate={refresh}
      />
      <br />
    </>
  );
};

export default ProgramCurriculums;
