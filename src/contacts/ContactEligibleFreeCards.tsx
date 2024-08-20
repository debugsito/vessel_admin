import * as React from 'react';
import { useEffect, useState } from 'react';
import { useEditController, useNotify } from 'react-admin';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import LinkIcon from '@material-ui/icons/Link';
import copy from 'copy-to-clipboard';

const API_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles(() => createStyles({
  w100: {
    width: '100%',
  },
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      width: '50%',
      margin: '0',
      boxSizing: 'border-box',
      paddingRight: '30px',
      paddingBottom: '15px',
    },
  },
  loading: {
    '&, & *': {
      cursor: 'progress',
    },
    opacity: '50%',
  },
  singleCard: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      flexGrow: '0',
      width: 'auto',
    },
  },
}));

const ContactEligibleFreeCards = (props: any) => {
  const classes = useStyles();
  const { record, loaded, loading } : any = useEditController(props);
  const [cards, setCards] = useState([]);
  const [componentLoading, setComponentLoading] = useState(false);
  const notify = useNotify();

  useEffect(() => {
    if (loaded && record && Array.isArray(record.eligible_free_cards)) {
      setCards(record.eligible_free_cards);
    }
  }, [record]);

  const SHOPIFY_BASE_URL_DEV = 'https://store-dev.vesselhealth.com';
  const SHOPIFY_BASE_URL_PROD = 'https://store.vesselhealth.com';
  const SHOPIFY_BASE_URL = process.env.NODE_ENV === 'development' ? SHOPIFY_BASE_URL_DEV : SHOPIFY_BASE_URL_PROD;

  const copyRedeemLinkUrl = (uuId: any) => {
    const redeemUrl = `${SHOPIFY_BASE_URL}/pages/membership?view=webflow-prepaid&subscriptionplan=free-replacement&wellness_card_uuid=${uuId}&contact_id=${record?.id}`;

    copy(redeemUrl);
    notify('Copied to clipboard!');
  };

  const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}` };
  const handleChange = (id: string, eligible: boolean) => {
    if (componentLoading) return;
    setComponentLoading(true);
    axios.post(`${API_URL}/contact/eligibility`, {
      contact_id: record?.id,
      eligibility_token: 'SECRET_TOKEN',
      eligible: !eligible,
      wellness_card_uuid: id,
    }, { headers })
      .then(
        (res: any) => {
          // eslint-disable-next-line no-prototype-builtins
          if (res.data.hasOwnProperty('eligible_for_replacement')) {
            setCards(() => {
              const updatedCards: any = cards.map((card: any) => {
                if (id === card.wellness_card_uuid) {
                  card.eligible = !card.eligible;
                }
                return card;
              });
              return updatedCards;
            });
            notify('Updated successfully.');
          }
        },
        (err) => {
          if (err.response?.data?.message) {
            notify(err.response?.data?.message, 'error');
          } else {
            notify('Something went wrong.', 'error');
          }
        },
      )
      .finally(() => {
        setComponentLoading(false);
      });
  };

  return (
    <>
      {loading && (
      <CircularProgress
        size={25}
        thickness={2}
      />
      )}
      {!loading && loaded && (
      <div className={classes.w100}>
        {cards.length <= 0 && (
        <div>
          No cards to show.
        </div>
        )}
        {cards.length > 0 && (
        <div className={`${classes.cardsContainer} ${loading ? classes.loading : ''}`}>
          {cards.map((card: any) => (
            <div className={classes.singleCard} key={card.wellness_card_uuid}>
              <FormControlLabel
                className={classes.w100}
                control={(
                  <Switch
                    checked={card.eligible}
                    onChange={() => handleChange(card.wellness_card_uuid, card.eligible)}
                  />
)}
                label={card.wellness_card_uuid}
              />
              <Button size="small" startIcon={<LinkIcon />} onClick={(() => copyRedeemLinkUrl(card.wellness_card_uuid))}>
                Copy Link
              </Button>
            </div>
          ))}
        </div>
        )}
      </div>
      )}
    </>
  );
};

export default React.memo(ContactEligibleFreeCards);
