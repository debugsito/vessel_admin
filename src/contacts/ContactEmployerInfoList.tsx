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
import SingleContactEmployerInfoList from './SingleContactEmployerInfoList';

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

const ContactEmployerInfoList = (props: any) => {
  const classes = useStyles();
  const { record, loaded, loading } : any = useShowController(props);
  const [infoItems, setInfoItems]: any = useState([]);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleDelete = (id: any) => {
    const tempInfoItems = infoItems.filter((item: any) => item.id !== id);
    setInfoItems([...tempInfoItems]);
  };

  useEffect(() => {
    if (record?.employers) {
      setInfoItems(record.employers);
    }
  }, [loaded, loading]);

  return (
    <div className={classes.w100}>
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
                <TableCell>Name</TableCell>
                <TableCell># of Employee</TableCell>
                <TableCell>Industry</TableCell>
                <TableCell>Benefits Admins</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Updated</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {infoItems.map((item: any) => (
                <SingleContactEmployerInfoList
                  item={item}
                  key={item.id}
                  onDelete={handleDelete}
                />
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

export default React.memo(ContactEmployerInfoList);
