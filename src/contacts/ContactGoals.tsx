import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { CircularProgress } from '@material-ui/core';
import { useParams } from 'react-router';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useLocation } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ContactGoals = (props:any) => {
  const { id }: any = useParams();
  const [contactGoals, setContactGoals] = useState([]);

  const [componentLoading, setcomponentLoading] = useState(true);
  const location = useLocation();
  const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}` };
  const getContactGoals = () => {
    setcomponentLoading(true);
    axios.get(`${API_URL}/contact/${id}`, { headers })
      .then(
        (res: any) => {
          if (res.data) {
            setContactGoals(res.data.goals);
          }
        },
        (err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        },
      )
      .finally(() => {
        setcomponentLoading(false);
      });
  };

  useEffect(() => {
    getContactGoals();
  }, [location]);

  return (
    <div style={{ width: '100%', display: 'block' }}>
      <div>
        {componentLoading && (
        <CircularProgress
          size={25}
          thickness={2}
        />
        )}
        {!componentLoading && (!contactGoals || contactGoals.length <= 0)
         && <h4 style={{ marginTop: 0 }}>No details to show</h4>}
      </div>
      {!componentLoading && !!contactGoals && !!contactGoals.length
         && (
         <TableContainer>
           <Table style={{ width: '100%' }} aria-label="goals table">
             <TableHead>
               <TableRow>
                 <TableCell>Name</TableCell>
               </TableRow>
             </TableHead>
             <TableBody>
               { contactGoals && contactGoals.map((goal: any) => (
                 <TableRow key={goal.id}>
                   <TableCell>{goal.name}</TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
         </TableContainer>
         )}
    </div>
  );
};

export default React.memo(ContactGoals);
