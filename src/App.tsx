import * as React from 'react';
import { useEffect } from 'react';
import {
  Admin, Resource, DataProvider, Authenticated,
} from 'react-admin';
import { Route } from 'react-router-dom';
import './App.css';
import Login from './dashboard/Login';
import Layout from './dashboard/Layout';
import authProvider from './authProvider';
import contacts from './contacts';
import food from './food';
import themeReducer from './themeReducer';
import supplements from './supplements';
import goals from './goals';
import surveys from './surveys';
import questions from './questions';
import answers from './answers';
import reagents from './reagents';
import buckets from './buckets';
import lifestyleRecommendation from './lifestyle-recommendations';
import programs from './programs';
import lessons from './lessons';
import curriculums from './curriculums';
import kudos from './kudos';
import groups from './group';
import subgoals from './subgoals';
import plans from './plans';
import essentials from './essentials';
import ResetPassword from './dashboard/ResetPassword';
import nutrients from './nutrients';
import products from './products';
import wellnessCards from './wellness-cards';
import prices from './prices';
import SampleSurveyResponse from './contacts/SampleSurveyResponse';
import reagentInfo from './reagent-info';
import reagentLot from './reagent-lot';
import Dashboard from './dashboard/Dashboard';
import tags from './tags';
import sources from './sources';
import tips from './tips';
import employer from './employer';
import benefits_admins from './benefits-admins';
import industry from './industry';
import partners from './partners';

interface AppProps {
  onUnmount: () => void;
  dataProvider: DataProvider;
}

const App = ({ onUnmount, dataProvider }: AppProps) => {
  useEffect(() => onUnmount, [onUnmount]);

  const customRoutes = [
    <Route exact path="/reset-password" component={ResetPassword} />,
    <Route
      exact
      path="/survey/:id/questions"
      render={() => (
        <Authenticated>
          <surveys.questions />
        </Authenticated>
      )}
    />,
    <Route
      exact
      path="/question/:id/answers"
      render={() => (
        <Authenticated>
          <questions.answers />
        </Authenticated>
      )}
    />,
    <Route
      exact
      path="/contacts/:id/survey-response/sample/:uuid"
      render={() => (
        <Authenticated>
          <SampleSurveyResponse />
        </Authenticated>
      )}
    />,
  ];
  return (
    <Admin
      title="Vessel Admin"
      authProvider={authProvider}
      dataProvider={dataProvider}
      layout={Layout}
      customRoutes={customRoutes}
      customReducers={{ theme: themeReducer }}
      loginPage={Login}
      dashboard={Dashboard}
    >
      <Resource name="contacts" {...contacts} />
      <Resource name="food" {...food} />
      <Resource name="supplement" {...supplements} />
      <Resource name="goal" {...goals} />
      <Resource name="subgoal" {...subgoals} />
      <Resource name="reagent" {...reagents} />
      <Resource name="reagent-info" {...reagentInfo} />
      <Resource name="bucket" {...buckets} />
      <Resource name="lifestyle-recommendation" {...lifestyleRecommendation} />
      <Resource name="program" {...programs} />
      <Resource name="kudos" {...kudos} />
      <Resource name="group" {...groups} />
      <Resource name="plan" {...plans} />
      <Resource name="essential" {...essentials} />
      <Resource name="survey" {...surveys} />
      <Resource name="curriculum" {...curriculums} />
      <Resource name="lesson" {...lessons} />
      <Resource name="question" {...questions} />
      <Resource name="answer" {...answers} />
      <Resource name="nutrient" {...nutrients} />
      <Resource name="product" {...products} />
      <Resource name="wellness/card" {...wellnessCards} />
      <Resource name="price" {...prices} />
      <Resource name="reagent_lot" {...reagentLot} />
      <Resource name="tag" {...tags} />
      <Resource name="source" {...sources} />
      <Resource name="tip" {...tips} />
      <Resource name="employer" {...employer} />
      <Resource name="benefits_admins" {...benefits_admins} />
      <Resource name="industry" {...industry} />
      <Resource name="contacts_partners" {...partners} />
    </Admin>
  );
};

export default App;
