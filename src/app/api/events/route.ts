import type { calendar_v3 } from 'googleapis';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// const Credentials = {
//   type: process.env.GOOGLE_CREDENTIALS_TYPE || '',
//   project_id: process.env.GOOGLE_PROJECT_ID || '',
//   private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID || '',
//   private_key: process.env.GOOGLE_PRIVATE_KEY
//     ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
//     : '',
//   client_email: process.env.GOOGLE_CLIENT_EMAIL || '',
//   client_id: process.env.GOOGLE_CLIENT_ID || '',
//   auth_uri: process.env.GOOGLE_AUTH_URI || '',
//   token_uri: process.env.GOOGLE_TOKEN_URI || '',
//   auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL || '',
//   client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL || '',
//   universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN || '',
// };
// const Scopes = ['https://www.googleapis.com/auth/calendar'];
// const GoogleCalendarId = process.env.GOOGLE_CALENDAR_ID || '';

export async function GET(req: NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');

  if (type === 'oneMonth') {
    // const events = await getEventsListToOneMonthLater();
    return NextResponse.json(dummyCalendarEvents, { status: 200 });
  } else {
    // const events = await getALLEventsList();

    return NextResponse.json(dummyCalendarEvents, { status: 200 });
  }
}

const dummyCalendarEvents: calendar_v3.Schema$Event[] = [
  {
    kind: 'calendar#event',
    etag: '"1234567890123456"',
    id: 'eventid1',
    status: 'confirmed',
    htmlLink: 'https://www.google.com/calendar/event?eid=eventid1',
    created: '2025-04-01T10:00:00.000Z',
    updated: '2025-04-01T10:05:00.000Z',
    summary: 'ダミーイベント①（田中/山田）',
    creator: { email: 'dummy1@example.test' },
    organizer: {
      email: 'organizer1@fake-group.calendar.local',
      displayName: 'ダミー主催者１',
      self: true,
    },
    start: { date: '2026-01-10' },
    end: { date: '2026-01-11' },
    transparency: 'transparent',
    iCalUID: 'eventid1@google.com',
    sequence: 0,
    reminders: { useDefault: false },
    eventType: 'default',
  },
  {
    kind: 'calendar#event',
    etag: '"2345678901234567"',
    id: 'eventid2',
    status: 'confirmed',
    htmlLink: 'https://www.google.com/calendar/event?eid=eventid2',
    created: '2025-04-02T11:00:00.000Z',
    updated: '2025-04-02T11:01:00.000Z',
    summary: 'ダミーイベント②（佐藤/鈴木）',
    creator: { email: 'dummy2@example.test' },
    organizer: {
      email: 'organizer2@fake-group.calendar.local',
      displayName: 'ダミー主催者２',
      self: true,
    },
    start: { date: '2026-03-05' },
    end: { date: '2026-03-06' },
    transparency: 'transparent',
    iCalUID: 'eventid2@google.com',
    sequence: 0,
    reminders: { useDefault: false },
    eventType: 'default',
  },
  {
    kind: 'calendar#event',
    etag: '"3456789012345678"',
    id: 'eventid3',
    status: 'confirmed',
    htmlLink: 'https://www.google.com/calendar/event?eid=eventid3',
    created: '2025-04-03T12:00:00.000Z',
    updated: '2025-04-03T12:01:00.000Z',
    summary: 'ダミーイベント③（小林/高橋）',
    creator: { email: 'dummy3@example.test' },
    organizer: {
      email: 'organizer3@fake-group.calendar.local',
      displayName: 'ダミー主催者３',
      self: true,
    },
    start: { date: '2026-04-20' },
    end: { date: '2026-04-21' },
    transparency: 'transparent',
    iCalUID: 'eventid3@google.com',
    sequence: 0,
    reminders: { useDefault: false },
    eventType: 'default',
  },
  {
    kind: 'calendar#event',
    etag: '"4567890123456789"',
    id: 'eventid4',
    status: 'confirmed',
    htmlLink: 'https://www.google.com/calendar/event?eid=eventid4',
    created: '2025-04-04T13:00:00.000Z',
    updated: '2025-04-04T13:05:00.000Z',
    summary: 'ダミーイベント④（中村/斉藤）',
    creator: { email: 'dummy4@example.test' },
    organizer: {
      email: 'organizer4@fake-group.calendar.local',
      displayName: 'ダミー主催者４',
      self: true,
    },
    start: { date: '2026-05-10' },
    end: { date: '2026-05-11' },
    transparency: 'transparent',
    iCalUID: 'eventid4@google.com',
    sequence: 0,
    reminders: { useDefault: false },
    eventType: 'default',
  },
  {
    kind: 'calendar#event',
    etag: '"5678901234567890"',
    id: 'eventid5',
    status: 'confirmed',
    htmlLink: 'https://www.google.com/calendar/event?eid=eventid5',
    created: '2025-04-05T14:00:00.000Z',
    updated: '2025-04-05T14:01:00.000Z',
    summary: 'ダミーイベント⑤（松本/石井）',
    creator: { email: 'dummy5@example.test' },
    organizer: {
      email: 'organizer5@fake-group.calendar.local',
      displayName: 'ダミー主催者５',
      self: true,
    },
    start: { date: '2026-06-01' },
    end: { date: '2026-06-02' },
    transparency: 'transparent',
    iCalUID: 'eventid5@google.com',
    sequence: 0,
    reminders: { useDefault: false },
    eventType: 'default',
  },
];

// const auth = new google.auth.GoogleAuth({
//   credentials: Credentials,
//   scopes: Scopes,
// });

// const calendar = google.calendar({
//   version: 'v3',
//   auth: auth,
// });

// const getEventsListToOneMonthLater = async () => {
//   try {
//     const today = new Date();
//     let year = today.getFullYear();
//     let month = today.getMonth();

//     month = (month + 1) % 12;
//     if (month == 0) year++;
//     const oneMonthLater = new Date(year, month, today.getDate(), today.getHours());

//     const res = await calendar.events.list({
//       calendarId: GoogleCalendarId,
//       timeMin: today.toISOString(),
//       timeMax: oneMonthLater.toISOString(),
//       singleEvents: true,
//       orderBy: 'startTime',
//     });

//     if (!res.data.items) {
//       return [];
//     }

//     return res.data.items;
//   } catch (error) {
//     console.error('Error fetching events:', error);
//     return [];
//   }
// };

// const getALLEventsList = async () => {
//   try {
//     const res = await calendar.events.list({
//       calendarId: GoogleCalendarId,
//       timeMin: new Date().toISOString(),
//       singleEvents: true,
//       orderBy: 'startTime',
//     });

//     if (!res.data.items) {
//       return [];
//     }

//     return res.data.items;
//   } catch (error) {
//     console.error('Error fetching events:', error);
//     return [];
//   }
// };
