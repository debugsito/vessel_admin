import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CircularProgress } from '@material-ui/core';
import { useShowController } from 'ra-core';
import Button from '@material-ui/core/Button';
import { useParams, Link } from 'react-router-dom';

import SingleReagentInfo from './SingleReagentInfo';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    width: '100%',
    '& td': {
      padding: '10px 20px',
    },
  },
  w100: {
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

const ReagentInfoList = (props: any) => {
  const classes = useStyles();
  const { record, loaded, loading } : any = useShowController(props);
  const [infoItems, setInfoItems]: any = useState([]);
  const { id }: any = useParams();

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleDelete = (id: any) => {
    const tempInfoItems = infoItems.filter((item: any) => item.id !== id);
    setInfoItems([...tempInfoItems]);
  };

  useEffect(() => {
    if (record?.info) {
      setInfoItems(record.info);
    }
  }, [loaded, loading]);

  return (
    <div className={classes.w100}>
      {loaded && (
      <div className={classes.buttonContainer}>
        <Link to={`/reagent-info/create?reagent_id=${id}`} style={{ textDecoration: 'none' }}>
          <Button color="primary" variant="contained" onClick={() => {}}>Create Info Item</Button>
        </Link>
      </div>
      )}
      {loading && (
      <CircularProgress
        size={25}
        thickness={2}
      />
      )}
      {loaded && infoItems.length > 0 && (
      <>
        <TableContainer>
          <Table className={classes.table} aria-label="buckets table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Info type</TableCell>
                <TableCell>Coming soon tag items</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {infoItems.map((item: any) => (
                <SingleReagentInfo item={item} key={item.id} onDelete={handleDelete} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
      )}
      {loaded && infoItems.length === 0 && <h5>Nothing to show.</h5>}
    </div>
  );
};

export default React.memo(ReagentInfoList);
