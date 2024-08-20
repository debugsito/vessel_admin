import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import {
  EditProps,
  Edit,
  useEditController,
  FormTab,
  TabbedForm,
} from 'react-admin';
import GoalGeneralForm from './GoalForm';
import GoalReagents from './GoalReagents';

export const styles = {
  price: { width: '7em' },
  width: { width: '7em' },
  height: { width: '7em' },
  stock: { width: '7em' },
  widthFormGroup: { display: 'inline-block' },
  heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const GoalEdit: FC<EditProps> = (props) => {
  const transform = (data: any) => {
    delete data.id;
    if (!data.name) data.name = '';
    if (!data.image_large_url) delete data.image_large_url;
    if (!data.image_medium_url) delete data.image_medium_url;
    if (!data.image_small_url) delete data.image_small_url;

    return data;
  };
  const { record, loaded }: any = useEditController(props);
  const [itemLargeImageURL, setItemLargeImageURL] = useState('');
  const [itemMediumImageURL, setItemMediumImageURL] = useState('');
  const [itemSmallImageURL, setItemSmallImageURL] = useState('');

  useEffect(() => {
    if (loaded) {
      setItemLargeImageURL(record.image_large_url);
      setItemMediumImageURL(record.image_medium_url);
      setItemSmallImageURL(record.image_small_url);
    }
  }, [loaded]);

  return (
    <Edit actions={<></>} {...props} mutationMode="pessimistic" transform={transform}>
      <TabbedForm>
        <FormTab label="General Information">
          <GoalGeneralForm
            largeImage={itemLargeImageURL}
            mediumImage={itemMediumImageURL}
            smallImage={itemSmallImageURL}
          />
        </FormTab>
        <FormTab label="Reagents">
          <GoalReagents {...props} />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default GoalEdit;
