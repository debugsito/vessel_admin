import * as React from 'react';
import { useState } from 'react';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReagentBuckets from './ReagentBuckets';
import ReagentEditSection from './ReagentEditSection';
import ReagentInfoList from './ReagentInfoList';

const ReagentEdit = (props: any) => {
  const [expanded, setExpanded] = useState('');
  const handleChange = (panel: string) => {
    if (panel === expanded) setExpanded('');
    else setExpanded(panel);
  };

  return (
    <>
      <Accordion expanded={expanded === 'reagentDetails'} onChange={() => handleChange('reagentDetails')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="reagentDetails-header"
        >
          Reagent Details
        </AccordionSummary>
        <AccordionDetails>
          <ReagentEditSection {...props} />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'reagentBuckets'} onChange={() => handleChange('reagentBuckets')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="reagentBuckets-header"
        >
          Reagent Buckets
        </AccordionSummary>
        <AccordionDetails>
          <ReagentBuckets {...props} />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'reagentInfo'} onChange={() => handleChange('reagentInfo')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="reagentInfo-header"
        >
          Reagent Info
        </AccordionSummary>
        <AccordionDetails>
          <ReagentInfoList {...props} />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ReagentEdit;
