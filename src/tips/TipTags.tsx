import * as React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';
import {
  useEditController,
  useRefresh,
} from 'react-admin';
import CreateTipTag from './CreateTipTag';
import DeleteButton from '../components/DeleteButton';

const TipTags = (props: any) => {
  const { loaded, record } = useEditController(props);
  const refresh = useRefresh();

  return (
    <>
      <TableContainer>
        <Table aria-label="tips table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loaded && record && record.tip_tags && record.tip_tags.map((tag: any) => (
              <TableRow key={tag.id}>
                <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                  {tag.title}
                </TableCell>
                <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>
                  <DeleteButton url={`tip/${record.id}/tag`} id={tag.id} onDelete={refresh} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <CreateTipTag tipId={record && record.id} onCreate={() => refresh()} />
      <br />
    </>
  );
};

export default TipTags;
