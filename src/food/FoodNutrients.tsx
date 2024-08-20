import React, { useEffect, useState } from 'react';

import {
  GetListParams, useDataProvider, useEditController, useNotify,
} from 'react-admin';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SingleNutrient from './SingleNutrient';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    width: '100%',
  },
  dialogContent: {
    width: '500px',
    maxWidth: '90vw',
    boxSizing: 'border-box',
    padding: 0,
  },
  textDecorationNone: {
    '&, *': {
      textDecoration: 'none',
    },

  },
});

const FoodNutrients = (props: any) => {
  const classes = useStyles();
  const [nutrients, setNutrients] = useState([]);
  const [reagents, setReagents] = useState([]);
  const { record, loaded, loading }: any = useEditController(props);
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const params: GetListParams = { pagination: { page: 1, perPage: 99 }, filter: null, sort: { field: 'name', order: 'DESC' } };

  useEffect(() => {
    dataProvider.getList('reagent', params)
      .then(({ data }: any) => {
        setReagents(data);
      })
      .catch(() => {
        notify('Failed to load reagents', 'error');
      });
  }, []);

  useEffect(() => {
    if (loaded && record.nutrients) setNutrients(record.nutrients);
  }, [loaded, loading]);

  const handleAnswerDelete = (id: any) => {
    const tempAnswers = nutrients.filter((nutrient: any) => nutrient.id !== id);
    setNutrients([...tempAnswers]);
  };

  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="reagents table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Quantity (per 100gm)</TableCell>
              <TableCell align="center">Unit</TableCell>
              <TableCell align="center">Reagent</TableCell>
              <TableCell align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
            <CircularProgress
              style={{ padding: 20 }}
              size={25}
              thickness={2}
            />
            )}
            {!loading && nutrients.length <= 0
            && <div style={{ padding: 20 }}>No nutrients to show.</div>}
            {nutrients.map((nutrient: any) => (
              <SingleNutrient
                key={nutrient.id}
                nutrient={nutrient}
                reagents={reagents}
                onDelete={handleAnswerDelete}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ paddingTop: 15, paddingBottom: 15 }}>
        <Link to={`/nutrient/create?food_id=${record?.id}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Add nutrient
          </Button>
        </Link>
      </div>
    </>
  );
};

export default FoodNutrients;
