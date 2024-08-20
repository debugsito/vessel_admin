import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { CircularProgress } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useLocation } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ContactFuel = (props: any) => {
  const [contactFuel, setContactFuel] = useState({
    formula: {
      id: 0,
      ingredients: [],
      am_ingredients: [],
      pm_ingredients: [],
    },
    is_active: false,

    customer_total_price: Math.round(0),
  });

  const [componentLoading, setcomponentLoading] = useState(true);
  const location = useLocation();
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  };
  console.log(props);
  const getContactFuel = () => {
    setcomponentLoading(true);
    axios
      .get(`${API_URL}/fuel?contact_id=${props.id}`, { headers })
      .then(
        (res: any) => {
          if (res.data) {
            setContactFuel(res.data);
            console.log(res.data);
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
    getContactFuel();
  }, [location]);

  return (
    <div style={{ width: '100%', display: 'block' }}>
      <div>
        {componentLoading && <CircularProgress size={25} thickness={2} />}
        {!componentLoading
          && (!contactFuel || Object.keys(contactFuel).length <= 0) && (
            <h4 style={{ marginTop: 0 }}>No details to show</h4>
        )}
      </div>
      <div>
        <h4>Vessel Fuel 2.0</h4>
        <h5>
          Status:
          {contactFuel.is_active ? 'ACTIVE' : 'INACTIVE'}
        </h5>
        <h5>
          Formula ID:
          {contactFuel.formula?.id}
        </h5>
        <h5>
          Customer Total Price:
          {Math.round(contactFuel.customer_total_price)}
        </h5>
      </div>
      {/* <Card className={classes.root}>
        <CardContent>

          <h5>Next Charge: </h5>
        </CardContent>
      </Card> */}
      {!componentLoading
        && !!contactFuel
        && Object.keys(contactFuel).length >= 1 && (
          <TableContainer>
            <Table style={{ width: '100%' }} aria-label="goals table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>MIL-ID</TableCell>
                  <TableCell>Time of Day</TableCell>
                  <TableCell>Dosage</TableCell>
                  {/* <TableCell>Unit</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {contactFuel
                  && contactFuel.formula?.ingredients?.map((ingredient: any) => (
                    <TableRow key={ingredient.mil_id}>
                      <TableCell>{ingredient.name}</TableCell>
                      <TableCell>{ingredient.mil_id}</TableCell>
                      <TableCell>{ingredient.time_of_day}</TableCell>
                      <TableCell>{ingredient.dosage}</TableCell>
                      {/* <TableCell>{ingredient.unit}</TableCell> */}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
      )}
    </div>
  );
};

export default React.memo(ContactFuel);
