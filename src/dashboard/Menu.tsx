/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import SettingsIcon from '@material-ui/icons/Settings';
import BusinessIcon from '@material-ui/icons/Business';
import ContactsIcon from '@material-ui/icons/Contacts';
import PublicIcon from '@material-ui/icons/Public';
import { useMediaQuery, Theme, Box } from '@material-ui/core';
import {
  useTranslate,
  MenuItemLink,
  MenuProps,
} from 'react-admin';

import DashboardIcon from '@material-ui/icons/Dashboard';
import contacts from '../contacts';
import food from '../food';

import { AppState } from '../types';
import supplements from '../supplements';
import essentials from '../essentials';
import goals from '../goals';
import subgoals from '../subgoals';
import surveys from '../surveys';
import questions from '../questions';
import answers from '../answers';
import reagents from '../reagents';
import reagentLot from '../reagent-lot';
import lifestyleRecommendation from '../lifestyle-recommendations';
import programs from '../programs';
import lessons from '../lessons';
import curriculums from '../curriculums';

import kudos from '../kudos';
import group from '../group';
import plans from '../plans';
import products from '../products';
import wellnessCards from '../wellness-cards';
import tags from '../tags';
import sources from '../sources';
import tips from '../tips';

const Menu: FC<MenuProps> = ({ onMenuClick, logout, dense = false }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState({
    menuContacts: true,
    menuFood: true,
    menuCustomers: true,
  });
  const translate = useTranslate();
  const isXSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
  useSelector((state: AppState) => state.theme); // force rerender on theme change

  return (
    <Box mt={1}>
      {' '}
      <MenuItemLink
        to="/"
        exact
        primaryText="Dashboard"
        leftIcon={<DashboardIcon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/contacts"
        primaryText="Contacts"
        leftIcon={<contacts.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/contacts_partners"
        primaryText="BendAdmin"
        leftIcon={<ContactsIcon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/employer"
        primaryText="Employers"
        leftIcon={<BusinessIcon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/benefits_admins"
        primaryText="Benefits Admins"
        leftIcon={<ContactsIcon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/industry"
        primaryText="Industry"
        leftIcon={<PublicIcon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/food"
        primaryText="Food"
        leftIcon={<food.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/supplement"
        primaryText="Supplements"
        leftIcon={<supplements.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/goal"
        primaryText="Goals"
        leftIcon={<goals.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/subgoal"
        primaryText="Subgoals"
        leftIcon={<subgoals.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/reagent"
        primaryText="Reagents"
        leftIcon={<reagents.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/reagent_lot"
        primaryText="Reagent Lot"
        leftIcon={<reagentLot.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/lifestyle-recommendation"
        primaryText="Recommendations"
        leftIcon={<lifestyleRecommendation.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/program"
        primaryText="Programs"
        leftIcon={<programs.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/kudos"
        primaryText="Kudos"
        leftIcon={<kudos.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/group"
        primaryText="Group"
        leftIcon={<group.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/plan"
        primaryText="Plans"
        leftIcon={<plans.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/essential"
        primaryText="Essentials"
        leftIcon={<essentials.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/product"
        primaryText="Products"
        leftIcon={<products.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/wellness/card"
        primaryText="Wellness Cards"
        leftIcon={<wellnessCards.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/curriculum"
        primaryText="Curriculum"
        leftIcon={<curriculums.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/lesson"
        primaryText="Lessons"
        leftIcon={<lessons.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/question"
        primaryText="Questions"
        leftIcon={<questions.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/answer"
        primaryText="Answers"
        leftIcon={<answers.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/survey"
        primaryText="Surveys"
        leftIcon={<surveys.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/tag"
        primaryText="Tags"
        leftIcon={<tags.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/tip"
        primaryText="Tips"
        leftIcon={<tips.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      <MenuItemLink
        to="/source"
        primaryText="Sources"
        leftIcon={<sources.icon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      {isXSmall && (
      <MenuItemLink
        to="/configuration"
        primaryText={translate('pos.configuration')}
        leftIcon={<SettingsIcon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
      />
      )}
      {isXSmall && logout}
    </Box>
  );
};

export default Menu;
