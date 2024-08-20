import * as React from 'react';
import { Link } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { useEditController, useRefresh } from 'react-admin';
import CreateLessonTip from './CreateLessonTip';
import DeleteButton from '../components/DeleteButton';

const LessonTip = (props: any) => {
  const { loaded, record } = useEditController(props);
  const refresh = useRefresh();

  return (
    <>
      <TableContainer>
        <Table aria-label="tips table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell> Title</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loaded
              && record
              && record.lessons
              && record.lessons.map((lesson: any) => (
                <TableRow key={lesson.id}>
                  <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                    <Link
                      to={`/lesson/${lesson.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      {lesson.id}
                    </Link>
                  </TableCell>
                  <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                    {lesson.title}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ paddingTop: 5, paddingBottom: 5 }}
                  >
                    <DeleteButton
                      url={`tip/${record.id}/lesson`}
                      id={lesson.id}
                      onDelete={refresh}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <CreateLessonTip tipId={record && record.id} onCreate={() => refresh()} />
      <br />
    </>
  );
};

export default LessonTip;
