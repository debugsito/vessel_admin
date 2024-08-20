/* eslint-disable @typescript-eslint/no-unused-vars */
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
  useEditController, useRefresh,
} from 'react-admin';
import { Link } from 'react-router-dom';
import DeleteButton from '../components/DeleteButton';
import CreatePartnerEmployer from './CreatePartnerEmployer';

const PartnerEmployer = (props: any) => {
  const { loaded, record } = useEditController(props);
  const refresh = useRefresh();

  return (
    <>
      <TableContainer>
        <Table aria-label="contact employer table">
          <TableHead>
            <TableRow>
              <TableCell>Employer ID</TableCell>
              <TableCell>Employer Name</TableCell>
              <TableCell>Number Of Employee</TableCell>
              <TableCell>Industry ID</TableCell>
              <TableCell>Industry Title</TableCell>
              <TableCell>Benefits Admins</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loaded
             && record
             && record.employers
             && record.employers.map((employer: any) => (
               <TableRow key={employer.id}>
                 <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                   <Link
                     to={`/employer/${employer.id}`}
                     style={{ textDecoration: 'none' }}
                   >
                     {employer.id}
                   </Link>
                 </TableCell>
                 <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                   {employer.name}
                 </TableCell>
                 <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                   {employer.number_of_employees}
                 </TableCell>
                 <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                   <Link
                     to={`/industry/${employer.industry.id}`}
                     style={{ textDecoration: 'none' }}
                   >
                     {employer.industry_id}
                   </Link>
                 </TableCell>
                 <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                   {employer.industry.title}
                 </TableCell>
                 <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                   <Link
                     to={`/employer/${employer.id}/1`}
                     style={{ textDecoration: 'none' }}
                   >
                     Contacts
                   </Link>
                 </TableCell>
                 <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                   {employer.created_at}
                 </TableCell>
                 <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                   {employer.updated_at}
                 </TableCell>
                 <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>
                   <DeleteButton url={`employer/${employer.id}/contact`} id={record.id} onDelete={refresh} />
                 </TableCell>
               </TableRow>
             ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <CreatePartnerEmployer contact_id={record && record.id} onCreate={refresh} />
      <br />
    </>
  );
};

export default PartnerEmployer;
