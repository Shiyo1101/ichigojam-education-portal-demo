import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

import MaterialLink from './material-link';

const MaterialAccordion = () => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>クラブ</AccordionTrigger>
        <AccordionContent>
          <div className="px-4 flex items-center flex-col gap-y-2">
            <MaterialLink
              title="IchigoJam資料"
              url="/material/IchigoJam-first-game.pdf"
            />
            <Separator />
            <MaterialLink
              title="IchigoJam資料"
              url="/material/IchigoJam-first-game.pdf"
            />
            <Separator />
            <MaterialLink
              title="IchigoJam資料"
              url="/material/IchigoJam-first-game.pdf"
            />
            <Separator />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>総合学習</AccordionTrigger>
        <AccordionContent>
          <div className="px-4 flex items-center flex-col gap-y-2">
            <MaterialLink
              title="IchigoJam資料"
              url="/material/IchigoJam-first-game.pdf"
            />
            <Separator />
            <MaterialLink
              title="IchigoJam資料"
              url="/material/IchigoJam-first-game.pdf"
            />
            <Separator />
            <MaterialLink
              title="IchigoJam資料"
              url="/material/IchigoJam-first-game.pdf"
            />
            <Separator />
            <MaterialLink
              title="IchigoJam資料"
              url="/material/IchigoJam-first-game.pdf"
            />
            <Separator />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>その他</AccordionTrigger>
        <AccordionContent>
          <div className="px-4 flex items-center flex-col gap-y-2">
            <MaterialLink
              title="IchigoJam資料"
              url="/material/IchigoJam-first-game.pdf"
            />
            <Separator />
            <MaterialLink
              title="IchigoJam資料"
              url="/material/IchigoJam-first-game.pdf"
            />
            <Separator />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MaterialAccordion;
