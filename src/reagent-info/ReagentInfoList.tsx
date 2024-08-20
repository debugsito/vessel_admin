import * as React from 'react';
import { useEffect } from 'react';

import {
  useRedirect,
} from 'react-admin';

const ReagentInfoList = () => {
  const redirect = useRedirect();

  useEffect(() => {
    redirect('/reagent');
  }, []);

  return (
    <></>
  );
};

export default ReagentInfoList;
