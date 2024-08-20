import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';

const SingleContactEmployerInfo = ({ item }: any) => (
  <>
    <TableRow>
      <TableCell>
        <Link
          to={`/employer/${item.id}`}
          style={{ textDecoration: 'none' }}
        >
          {item.name}
        </Link>
      </TableCell>
      <TableCell>
        {item.number_of_employees}
      </TableCell>
      <TableCell>
        <Link
          to={`/industry/${item.industry.id}`}
          style={{ textDecoration: 'none' }}
        >
          {item.industry.title}
        </Link>
      </TableCell>
      <TableCell>
        <Link
          to={`/employer/${item.id}/1`}
          style={{ textDecoration: 'none' }}
        >
          Contacts
        </Link>
      </TableCell>
      <TableCell>
        {item.created_at}
      </TableCell>
      <TableCell>
        {item.updated_at}
      </TableCell>
    </TableRow>
  </>
);

export default React.memo(SingleContactEmployerInfo);
