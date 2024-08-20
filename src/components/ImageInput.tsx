import React, { useEffect } from 'react';

import { TextInput } from 'react-admin';
import { useForm } from 'react-final-form';

const ImageInput = ({ source, url }: any) => {
  const form = useForm();
  useEffect(() => {
    form.change(source, url);
  });

  return (
    <div style={{ display: 'none' }}>
      <TextInput
        source={source}
        fullWidth
      />
    </div>
  );
};

export default React.memo(ImageInput);
