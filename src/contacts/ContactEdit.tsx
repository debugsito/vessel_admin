import * as React from 'react';
import { useState, FC } from 'react';

import { EditProps } from 'react-admin';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Paper } from '@material-ui/core';
import ContactEditForm from './ContactEditForm';
import ContactEligibleFreeCards from './ContactEligibleFreeCards';
import ContactWellnessCardScores from './ContactWellnessCardScores';
import ContactMembershipDetails from './ContactMembershipDetails';
import UpdateEmail from './ContactUpdateEmail';
import ContactGenerateResetPassword from './ContactGenerateResetPassword';
import ContactProducts from './ContactProducts';
import ContactGoals from './ContactGoals';
import ContactFuel from './ContactFuel';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const useStyles = makeStyles(() => createStyles({
  w100: {
    width: '100%',
  },
}));

const a11yProps = (index: any) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const TabPanel = (props: TabPanelProps) => {
  const {
    children, value, index, ...other
  }: any = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{ paddingTop: 30 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const ContactEdit: FC<EditProps> = (props) => {
  const [expanded, setExpanded] = useState('');
  const classes = useStyles();
  const handleChange = (panel: string) => {
    if (panel === expanded) setExpanded('');
    else setExpanded(panel);
  };

  const [value, setValue] = React.useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <br />
      <Tabs
        style={{ backgroundColor: '#fff', boxShadow: 'none' }}
        value={value}
        onChange={handleTabChange}
        indicatorColor="secondary"
        textColor="primary"
      >
        <Tab label="General" {...a11yProps(0)} />
        <Tab label="Membership" {...a11yProps(1)} />
        <Tab label="Wellness Card Scores" {...a11yProps(2)} />
        <Tab label="Preferences" {...a11yProps(3)} />
        <Tab label="Fuel" {...a11yProps(4)} />
      </Tabs>
      <div
        style={{ display: `${value === 0 ? 'block' : 'none'}`, paddingTop: 30 }}
      >
        <Accordion
          expanded={expanded === 'contactDetails'}
          onChange={() => handleChange('contactDetails')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id="contactDetails-header"
          >
            Contact Details
          </AccordionSummary>
          <AccordionDetails>
            <ContactEditForm className={classes.w100} {...props} />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'contactUpdateEmail'}
          onChange={() => handleChange('contactUpdateEmail')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id="contactUpdateEmail-header"
          >
            Update Email
          </AccordionSummary>
          <AccordionDetails>
            <UpdateEmail {...props} />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'contactResetPassword'}
          onChange={() => handleChange('contactResetPassword')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id="contactResetPassword-header"
          >
            Reset Password
          </AccordionSummary>
          <AccordionDetails>
            <ContactGenerateResetPassword {...props} />
          </AccordionDetails>
        </Accordion>
      </div>
      <TabPanel value={value} index={1}>
        <Accordion
          expanded={expanded === 'ContactMembershipDetails'}
          onChange={() => handleChange('ContactMembershipDetails')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id="ContactMembershipDetails-header"
          >
            Membership Details
          </AccordionSummary>
          <AccordionDetails>
            <ContactMembershipDetails {...props} />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'ContactProducts'}
          onChange={() => handleChange('ContactProducts')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id="ContactProducts-header"
          >
            Product Prices
          </AccordionSummary>
          <AccordionDetails>
            <ContactProducts {...props} />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'contactEligibleFreeCards'}
          onChange={() => handleChange('contactEligibleFreeCards')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id="contactEligibleFreeCards-header"
          >
            Eligible Free Cards
          </AccordionSummary>
          <AccordionDetails>
            <ContactEligibleFreeCards {...props} />
          </AccordionDetails>
        </Accordion>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ContactWellnessCardScores />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Paper style={{ padding: '30px 20px' }}>
          <ContactGoals {...props} />
        </Paper>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Paper style={{ padding: '30px 20px' }}>
          <ContactFuel {...props} />
        </Paper>
      </TabPanel>
    </>
  );
};

export default ContactEdit;
