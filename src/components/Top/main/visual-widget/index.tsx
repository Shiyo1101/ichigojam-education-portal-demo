import React from 'react';

import { Widget } from '@/components/common/widget';
import YoutubeAccordion from '@/components/Top/main/visual-widget/youtube-accordion';

const VisualWidget = () => {
  return (
    <Widget title="総合学習 映像">
      <YoutubeAccordion />
    </Widget>
  );
};

export default VisualWidget;
