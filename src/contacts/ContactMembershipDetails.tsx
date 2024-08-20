/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';

import { useEditController } from 'react-admin';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CircularProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const API_URL = process.env.REACT_APP_API_URL;
const useStyles = makeStyles({
  root: {
    width: '100%',
    '&, *': {
      boxSizing: 'border-box',
    },
  },
});

const Membership = (props: any) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={4}>
      <Card className={classes.root}>
        <CardContent>
          <h3 style={{ marginTop: 0 }}>
            {props.product_title}
          </h3>
          <h4>
            {props.variant_title}
          </h4>
          <h5>
            Status:
            {' '}
            {props.status}
          </h5>
          <h5>
            Next Charge:
            {' '}
            {new Date(props.next_charge_scheduled_at).toLocaleDateString()}
          </h5>
          <h5>
            Recharge Subscription ID:
            {' '}
            {props.id}
          </h5>
        </CardContent>
      </Card>
    </Grid>
  );
};

const ContactMembershipDetails = (props: any) => {
  const { record, loaded }: any = useEditController(props);
  const [componentLoading, setcomponentLoading] = useState(true);
  const [memberships, setMemberships] = useState([]);

  const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}` };
  const getContactMembershipDetails = () => {
    setcomponentLoading(true);
    axios.get(`${API_URL}/memberships?email=${encodeURIComponent(record?.email)}`, { headers })
      .then(
        (res: any) => {
          if (res.data.length) {
            setMemberships(res.data);
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
    if (loaded) {
      getContactMembershipDetails();
    }
  }, [loaded]);

  return (
    <div style={{ width: '100%', display: 'flex' }}>
      <div>
        {componentLoading && (
        <CircularProgress
          size={25}
          thickness={2}
        />
        )}
        {!componentLoading && memberships.length <= 0
        && <h4 style={{ marginTop: 0 }}>No details to show</h4>}
      </div>
      <Grid container spacing={3}>
        {memberships.map((membership: any) => <Membership key={membership.id} {...membership} />)}
      </Grid>
    </div>
  );
};

export default React.memo(ContactMembershipDetails);
