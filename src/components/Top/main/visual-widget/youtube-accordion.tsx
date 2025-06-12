import { YouTubeEmbed } from '@next/third-parties/google';
import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const YoutubeAccordion = () => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>5年生総合学習（Robot）</AccordionTrigger>
        <AccordionContent>
          <YouTubeEmbed videoid="kqXaLuM1J_o" />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>5年生総合学習（AI）</AccordionTrigger>
        <AccordionContent>
          <YouTubeEmbed videoid="kqXaLuM1J_o" />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>5年生総合学習（CyberSecurity）</AccordionTrigger>
        <AccordionContent>
          <YouTubeEmbed videoid="kqXaLuM1J_o" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default YoutubeAccordion;
