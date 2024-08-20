import React, {
  useEffect,
  useState,
  FC,
} from 'react';
import {
  GetListParams, Loading, Title, useDataProvider, useNotify,
} from 'react-admin';
import axios from 'axios';
import SingleGraph from './SingleGraph';

const baseUrl = process.env.REACT_APP_API_URL;

const Dashboard: FC = () => {
  let reagentObj: any = {};
  const [isLoading, setIsLoading]: any = useState(true);
  const [scoresData, setScoresData]: any = useState([]);
  const [reagentData, setReagentData]: any = useState([]);
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const params: GetListParams = { pagination: { page: 1, perPage: 99 }, filter: null, sort: { field: 'name', order: 'DESC' } };

  const listReagents = () => {
    dataProvider.getList('reagent', params)
      .then(({ data }: any) => {
        const reagentChartData: any = [];
        if (data) {
          data.map((reagent: any) => {
            if (reagentObj[reagent.id] && reagent.state === 'ACTIVE') {
              reagentChartData.push({
                name: reagent.name,
                data: reagentObj[reagent.id].data,
              });
            }
            return reagent;
          });
          setReagentData([...reagentChartData]);
        }
      })
      .catch(() => {
        notify('Failed to load reagents', 'error');
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    axios.get(`${baseUrl}/score/average`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response: any) => {
        if (response.data) {
          const items = response.data;
          const chartData: any = [];
          items.map((item: any) => {
            chartData.push({
              name: item.insert_day,
              score: item.scores.wellness_score,
              scoreDetails: item.users_count,
              userCount: item.users_count,
              sampleCount: item.sample_count,
            });
            const reagentChartObj = { ...reagentObj };
            item.scores.reagents.map((reagent: any) => {
              if (!reagentChartObj[reagent.reagent_id]) {
                reagentChartObj[reagent.reagent_id] = {
                  data: [{
                    score: reagent.score ? reagent.score : 0,
                    date: item.insert_day,
                  }],
                };
              } else {
                reagentChartObj[reagent.reagent_id].data.push({
                  score: reagent.score ? reagent.score : 0,
                  name: item.insert_day,
                });
              }
              return reagent;
            });
            reagentObj = { ...reagentChartObj };
            return item;
          });
          listReagents();
          setScoresData(chartData);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <Title title="Dashboard" />
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <SingleGraph graphData={scoresData} title="Average wellness card scores" />
          {reagentData.map((reagent: any) => (
            <SingleGraph key={reagent.name} graphData={reagent.data} title={reagent.name} />
          ))}
        </>
      )}
    </>
  );
};

export default Dashboard;
