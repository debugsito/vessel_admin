import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNotify } from 'react-admin';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import SurveyResponseTable from './SurveyResponseTable';

const API_URL = process.env.REACT_APP_API_URL;

const ContactSurveyResponse = () => {
  const { id }: any = useParams();
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState([]);
  const notify = useNotify();
  const location = useLocation();

  const loadSurveyResponses = () => {
    setLoading(true);
    setResponses([]);
    const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}` };
    axios.get(`${API_URL}/survey_response/contact/${id}`, { headers })
      .then(
        (res: any) => {
          setResponses(res.data.survey_response);
        },
        (err) => {
          if (err.response?.data?.message) notify(`${err.response?.data?.message}`, 'error');
          else notify('Something went wrong.', 'error');
        },
      )
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadSurveyResponses();
  }, [location]);

  return <SurveyResponseTable loading={loading} responses={responses} />;
};

export default React.memo(ContactSurveyResponse);
