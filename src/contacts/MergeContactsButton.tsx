// in ./MergeContactsButton.js
import * as React from 'react';
import { Fragment, useState } from 'react';
import {
  Button,
  Confirm,
  useRefresh,
  useNotify,
  useUnselectAll,
} from 'react-admin';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const MergeContactsButton = (props: any) => {
  const { data, selectedIds } : any = props;
  const contacts: any = [];
  // eslint-disable-next-line react/destructuring-assignment
  Object.keys(data).forEach((id) => {
    contacts.push(data[id]);
  });
  const fromContact = contacts.filter((contact: any) => selectedIds[0] === contact.id);
  const toContact = contacts.filter((contact: any) => selectedIds[1] === contact.id);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const refresh = useRefresh();
  const notify = useNotify();
  const unselectAll = useUnselectAll();
  const handleClick = () => setOpen(true);
  const handleDialogClose = () => {
    setOpen(false);
    unselectAll('contacts');
  };
  const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}` };
  const handleConfirm = () => {
    setLoading(true);
    axios.post(`${API_URL}/contact/mergeAccounts`, {
      from_email: fromContact[0].email,
      to_email: toContact[0].email,
    }, { headers })
      .then(
        () => {
          notify('Contacts were merged successfully!');
        },
        (err) => {
          if (err.response) notify(err.response.data, 'error');
          else notify('Something went wrong.', 'error');
        },
      )
      .finally(() => {
        setLoading(false);
        setOpen(false);
        refresh();
        unselectAll('contacts');
      });
  };

  const confirmationContent = fromContact.length && toContact.length ? `
    are you sure you want to merge ${fromContact[0].email} into ${toContact[0].email}.
    WARNING: this will delete ${fromContact[0].email}
   ` : '';

  return (
    fromContact.length && toContact.length
      ? (
        <>
          <Button label="Merge Contacts" onClick={handleClick} />
          <Confirm
            isOpen={open}
            loading={loading}
            title="Merge contacts"
            content={confirmationContent}
            onConfirm={handleConfirm}
            onClose={handleDialogClose}
          />
        </>
      )
      : (
        <>
        </>
      )
  );
};

export default MergeContactsButton;
