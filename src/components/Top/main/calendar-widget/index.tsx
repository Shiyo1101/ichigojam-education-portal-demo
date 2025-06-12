import React from 'react';

import { Widget } from '@/components/common/widget';

import CalendarAccordion from './calendar-accordion';

const CalendarWidget = () => {
  return (
    <Widget title="クラブ・総合学習 予定">
      <CalendarAccordion />
    </Widget>
  );
};

export default CalendarWidget;
