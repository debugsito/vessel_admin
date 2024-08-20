/* eslint-disable no-nested-ternary */
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
const ContactProducts = (props: any) => {
  const { id }: any = useParams();
  const [componentLoading, setcomponentLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}` };
  const getContactProducts = () => {
    setcomponentLoading(true);
    axios.get(`${API_URL}/product?contact_id=${id}&product_type=WELLNESS_CARD`, { headers })
      .then(
        (res: any) => {
          if (res.data) {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const products = res.data.products.sort((a: any, b: any) => (a.title < b.title
              ? -1 : a.title
               > b.title
                ? 1 : 0));
            setProducts(products);
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
    getContactProducts();
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
        {!componentLoading && products.length <= 0
          && <h4 style={{ marginTop: 0 }}>No details to show</h4>}
      </div>
      <TableContainer>
        <Table style={{ width: '100%' }} aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell>Product Title</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Price Group</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product: any) => (
              <TableRow key={product.id}>
                <TableCell>{product.title}</TableCell>
                <TableCell align="center">
                  {product.price?.length > 0 && product.price[0].price}
                </TableCell>
                <TableCell align="center">
                  {product.price?.length > 0 && product.price[0].price_group}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default React.memo(ContactProducts);
