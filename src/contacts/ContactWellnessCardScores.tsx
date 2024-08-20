/* eslint-disable @typescript-eslint/no-shadow */

/* eslint-disable max-len */
import * as React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router';
import { Query, Loading } from 'react-admin';
import Pagination from 'react-js-pagination';
import SampleAccordion from './SampleAccordion';

let payload: any = {
  pagination: { page: 1, perPage: 10 },
};
const useStyles = makeStyles({
  table: {
    minWidth: 650,
    width: '100%',
    '& td': {
      padding: '5px 20px',
    },
  },
  w100: {
    width: '100%',
  },
  card: {
    marginBottom: 20,
  },
  error: {
    color: 'red',
    fontSize: 14,
    fontStyle: 'italic',
  },
  accordionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    marginRight: 20,
  },
});
const usePaginationStyle = makeStyles({
  pagination: {
    justifyContent: 'center',
  },
  ul: {
    listStyle: 'none',
    padding: 0,
    textAlign: 'center',
    backgroundColor: 'white',
    margin: 'auto',
    width: '28%',
  },
  disabledClass: {
    justifyContent: 'center',
  },
  itemClass: {
    display: 'inline-block',
    width: 40,
    border: '1px solid #e2e2e2',
    displayName: 'flex',
    textAlign: 'center',
    fontSize: 25,
    '& a': {
      textDecoration: 'none',
      color: '#337ab7',
      fontSize: 20,
    },
  },
  activeLinkClass: {
    color: 'white',
  },
  active: {
    backgroundColor: '#337ab7',
    '& a': {
      color: 'white',
    },
  },
  pageSelection: {
    width: 48,
    height: 30,
  },
  paginationWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
const ContactWellnessCardScores = () => {
  const classes = useStyles();
  const { id }: any = useParams();
  const filter = { contact_id: id, showAll: true };
  payload = { filter, ...payload };

  const [page, setPage]: any = useState(1);
  const paginationClasses = usePaginationStyle();
  const handleChange = (page: any) => {
    setPage(page);
  };

  return (
    <Query
      type="getList"
      resource="score/summary"
      payload={{ filter, pagination: { page, perPage: 10 } }}
    >
      {({ data, total, loading }: any) => {
        if (loading) {
          return <Loading />;
        }
        return (
          <div>
            <p>
              Total Scores:
              {total}
            </p>
            {data && data.map((sample: any) => (
              <div
                key={sample.sample_id}
                className={`${classes.w100} ${classes.card}`}
              >
                <SampleAccordion
                  sample={sample}
                  contactId={id}
                />
              </div>
            ))}

            <Pagination
              activePage={page}
              itemsCountPerPage={10}
              totalItemsCount={total}
              pageRangeDisplayed={5}
              onChange={handleChange}
              innerClass={paginationClasses.ul}
              activeClass={paginationClasses.active}
              activeLinkClass={paginationClasses.activeLinkClass}
              itemClass={paginationClasses.itemClass}
              disabledClass={paginationClasses.disabledClass}
            />
          </div>
        );
      }}
    </Query>
  );
};

export default React.memo(ContactWellnessCardScores);
