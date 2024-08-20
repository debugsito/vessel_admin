import React from 'react';

const VesselDateField = React.memo(({ date }: any) => {
  const d = new Date(date);
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  const time = d.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' });
  return (
    <>
      {`${month} ${day}, ${year}`}
      {` ${time.replace(' ', '')}`}
    </>
  );
});

export default VesselDateField;
