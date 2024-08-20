import React, { FC } from 'react';

import {
  EditProps, Edit, FormTab, TabbedForm,
} from 'react-admin';

import ProgramForm from './ProgramForm';
import ProgramEssentials from './ProgramEssentials';
import ProgramKudos from './ProgramKudos';
import ProgramCurriculums from './ProgramCurriculums';

const ProgramEdit: FC<EditProps> = (props) => {
  const formatDifficulty = (data: String) => {
    if (data !== undefined && data.length > 1) {
      data = data.toUpperCase();
    }
    return data;
  };

  const transform = (data: any) => {
    const removeKeys = [
      'created_at',
      'updated_at',
      'updated_by',
    ];

    Object.keys(data).forEach((key) => {
      if (removeKeys.includes(key)) {
        delete data[key];
      }
    });
    delete data.id;
    delete data.is_enrolled;
    delete data.contact;
    delete data.created_at;
    delete data.like_status;
    delete data.total_likes;
    delete data.reviewers;
    delete data.frequency;
    delete data.enrolled_date;
    delete data.curriculum;
    delete data.group_id;
    delete data.kudos;
    delete data.recommendation_rank;
    delete data.essentials;
    if (
      typeof data.plan_ids !== 'undefined'
      && typeof data.plans !== 'undefined'
    ) {
      const plansMap = data.plans
        .filter((plan: any) => {
          if (plan.id == null) {
            return false; // skip
          }
          return true;
        })
        .map((plan: any) => plan.id);
      data.plan_ids = Array.from(new Set(data.plan_ids.concat(plansMap)));
    } else if (typeof data.plans !== 'undefined') {
      data.plan_ids = data.plans.map((plan: any) => plan.id);
    } else {
      data.plan_ids = [];
    }
    if (typeof data.difficulty !== 'undefined') {
      data.difficulty = formatDifficulty(data.difficulty);
    } else {
      delete data.difficulty;
    }
    delete data.plans;
    if (data.reviewed_contact_ids == null) {
      delete data.reviewed_contact_ids;
    }
    if (data.schedule != null) {
      data.schedule = data.schedule.map((day: any, index: any) => {
        const dayNum = index + 1;
        let planIds = [];
        if (day.plan_ids != null) {
          planIds = day.plan_ids;
        }
        return {
          day: dayNum,
          plan_ids: planIds,
        };
      });
      data.duration_days = data.schedule.length;
    } else {
      delete data.schedule;
      delete data.duration_days;
    }

    return data;
  };
  return (
    <Edit
      title="Edit Program"
      {...props}
      mutationMode="pessimistic"
      transform={transform}
    >
      <TabbedForm>
        <FormTab label="Program">
          <ProgramForm />
        </FormTab>
        <FormTab label="Essentials">
          <ProgramEssentials {...props} />
        </FormTab>
        <FormTab label="Kudos">
          <ProgramKudos {...props} />
        </FormTab>
        <FormTab label="Curriculums">
          <ProgramCurriculums {...props} />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default ProgramEdit;
