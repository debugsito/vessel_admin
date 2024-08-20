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
import DeleteButton from '../components/DeleteButton';
import CreateEmployerBenefitsAdmins from './CreateEmployerBenefitsAdmins';

const EmployerBenefitsAdmins = (props: any) => {
  const { loaded, record } = useEditController(props);
  const refresh = useRefresh();
  console.log({ record });

  return (
    <>
      <TableContainer>
        <Table aria-label="employer benefits admins table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Primary Contact</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loaded
             && record
             && record.employers
             && record.employers.benefits_administrator
             && record.employers.benefits_administrator.map((admin: any) => (
               <TableRow key={admin.id}>
                 <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                   {admin.id}
                 </TableCell>
                 <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                   {admin.first_name}
                   {' '}
                   {admin.last_name}
                 </TableCell>
                 <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                   {admin.email}
                 </TableCell>
                 <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                   {admin.phone}
                 </TableCell>
                 <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                   {admin.is_primary_contact}
                 </TableCell>
                 <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                   {admin.created_at}
                 </TableCell>
                 <TableCell style={{ paddingTop: 5, paddingBottom: 5 }}>
                   {admin.updated_at}
                 </TableCell>
                 <TableCell align="center" style={{ paddingTop: 5, paddingBottom: 5 }}>
                   <DeleteButton url={`employer/${record.employers.id}/benefits_admins`} id={admin.id} onDelete={refresh} />
                 </TableCell>
               </TableRow>
             ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <CreateEmployerBenefitsAdmins
        employer_id={record && record.employers.id}
        onCreate={refresh}
      />
      <br />
    </>
  );
};

export default EmployerBenefitsAdmins;
