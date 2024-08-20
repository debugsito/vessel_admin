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
  useEditController,
  useRefresh,
} from 'react-admin';
import CreateTagTip from './CreateTagTip';
import DeleteButton from '../components/DeleteButton';

const TagTips = (props: any) => {
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
            {loaded && record && record.tag_tips && record.tag_tips.map((tip: any) => (
              <TableRow key={tip.tip_id}>
                <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                  {tip.title}
                </TableCell>
                <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>
                  <DeleteButton url={`tip/${tip.tip_id}/tag`} id={record.id} onDelete={refresh} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <CreateTagTip tagId={record && record.id} onCreate={() => refresh()} />
      <br />
    </>
  );
};

export default TagTips;
