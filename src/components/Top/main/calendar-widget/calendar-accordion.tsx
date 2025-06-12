'use client';

import type { calendar_v3 } from 'googleapis';
import { CalendarCheck, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const CalendarAccordion = () => {
  const [events, setEvents] = useState<calendar_v3.Schema$Event[]>([]);
  const [allEvents, setAllEvents] = useState<calendar_v3.Schema$Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/events?type=oneMonth', {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error('Failed to fetch events');
      }
    };

    const fetchAllEvents = async () => {
      const response = await fetch('/api/events', {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        setAllEvents(data);
      } else {
        console.error('Failed to fetch all events');
      }
    };

    fetchEvents();
    fetchAllEvents();
  }, []);

  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="w-full"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>直近１ヶ月の予定</AccordionTrigger>
          <AccordionContent>
            {events.length === 0 && (
              <div className="p-2 flex items-center justify-center gap-x-2">
                <CalendarCheck />
                直近1ヶ月の予定はありません
              </div>
            )}
            {events.length !== 0 && (
              <ScrollArea className="h-40 w-auto rounded-md border">
                <div className="p-2">
                  {events.map((event, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-y-2"
                    >
                      <div className="flex items-center justify-between gap-x-2 text-sm">
                        <div>{event.start?.date}</div>
                        <div>{event.summary}</div>
                      </div>
                      <Separator className="my-2" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>すべての予定</AccordionTrigger>
          <AccordionContent>
            {allEvents.length === 0 && (
              <div className="p-2 flex items-center justify-center gap-x-2">
                <CalendarCheck />
                現在予定はありません
              </div>
            )}
            {allEvents.length !== 0 && (
              <ScrollArea className="h-40 w-auto rounded-md border">
                <div className="p-2">
                  {allEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-y-2"
                    >
                      <div className="flex items-center justify-between gap-x-2 text-sm">
                        <div>{event.start?.date}</div>
                        <div>{event.summary}</div>
                      </div>
                      <Separator className="my-2" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Link
        href="https://github.com/Shiyo1101"
        target="_blank"
        className="py-4 w-full"
      >
        <div className="flex items-center justify-start gap-x-2">
          <ExternalLink size={20} />
          <h4>支援スケジュールまとめ</h4>
        </div>
      </Link>
      <Separator />
    </>
  );
};

export default CalendarAccordion;
