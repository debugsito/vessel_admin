import React, { useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Chip from '@material-ui/core/Chip';
import { Link, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Confirm, useNotify } from 'react-admin';

import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import SingleError from './SingleError';
import VesselDateField from '../components/VesselDateField';
import SingleSample from './SingleSample';

const API_URL = process.env.REACT_APP_API_URL;

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
const SampleAccordion = ({ sample, contactId } : any) => {
  const { id }: any = useParams();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloadingImage, setDownloadingImage] = useState(false);
  const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}` };
  const notify = useNotify();

  const handleToggleValid = () => {
    setOpen(true);
  };

  const handleToggleConfirm = () => {
    setLoading(true);
    axios.put(`${API_URL}/score/toggle-valid/${sample.sample_uuid}`, {}, { headers })
      .then(
        () => {
          sample.is_valid = !sample.is_valid;

          notify('Score is updated successfully!');
        },
        (err) => {
          if (err.response) notify(err.response.data, 'error');
          else notify('Something went wrong.', 'error');
        },
      )
      .finally(() => {
        setLoading(false);
        setOpen(false);
      });
  };

  const downloadImage = () => {
    setDownloadingImage(true);
    axios.get(`${API_URL?.replace('/v2', '')}/sample/image/${sample.sample_id}?jpeg=True`, { headers })
      .then(
        (res) => {
          if (res.data.image_url) {
            const link = document.createElement('a');
            link.id = 'sample_image_link_el';
            link.href = res.data.image_url;
            link.click();
            link.remove();
          }
        },
        (err) => {
          if (err.response) notify(err.response.data, 'error');
          else notify('Something went wrong.', 'error');
        },
      )
      .finally(() => {
        setDownloadingImage(false);
      });
  };

  const handleToggleDialogClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  const confirmationDialogTitle = `Mark as ${sample.is_valid ? 'Invalid' : 'Valid'}`;
  const confirmationDialogContent = `Are you sure you want to update this score to '${
    sample.is_valid ? 'Invalid' : 'Valid'}'?`;

  return (
    <div key={sample.sample_id} className={`${classes.w100} ${classes.card}`}>
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id={sample.sample_id}
        >
          <div className={classes.accordionHeader}>
            <VesselDateField date={sample.insert_date} />
            {sample.scores.errors.length > 0
            && (
              <span className={classes.error}>
                {sample.scores.errors.length}
                {' '}
                errors
              </span>
            )}
          </div>
          <div className={classes.accordionHeader}>
            {sample.is_valid && (
            <Chip
              label="Valid"
              size="small"
              icon={<CheckIcon />}
              style={{ backgroundColor: '#c5dbbb' }}
            />
            )}
            {!sample.is_valid && (
            <Chip
              label="Invalid"
              size="small"
              icon={<CloseIcon />}
              style={{ backgroundColor: '#ffa3a3' }}
            />
            )}
          </div>
          <div className={classes.accordionHeader}>
            Sample Id:
            {' '}
            {sample.sample_id }
          </div>
          <div className={classes.accordionHeader}>
            {sample.has_survey
            && (
              <Link
                to={`/contacts/${id}/survey-response/sample/${sample.sample_uuid}`}
                style={{ textDecoration: 'none', position: 'relative', zIndex: 3 }}
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  View Survey Response
                </Button>
              </Link>
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {
            expanded && (
            <div>
              <div>
                <Button size="small" variant="contained" color="primary" onClick={() => handleToggleValid()}>
                  { `Mark as ${sample.is_valid ? 'Invalid' : 'Valid'}`}
                </Button>

                <Button
                  size="small"
                  variant="contained"
                  style={{ marginLeft: 10 }}
                  color="primary"
                  onClick={() => downloadImage()}
                  disabled={downloadingImage}
                >
                  Download Image
                </Button>

                <Confirm
                  isOpen={open}
                  loading={loading}
                  title={confirmationDialogTitle}
                  content={confirmationDialogContent}
                  onConfirm={handleToggleConfirm}
                  onClose={handleToggleDialogClose}
                />
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '100%' }}>
                  <SingleSample sample={sample} contactId={contactId} />
                </div>
                <div style={{ width: '50%', marginLeft: '100px' }}>
                  {sample.scores.errors.length > 0
                      && <SingleError errors={sample.scores.errors} />}
                </div>
              </div>
            </div>
            )
}

        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default React.memo(SampleAccordion);
