// import type { NextRequest } from 'next/server';
// import { NextResponse } from 'next/server';

// import { db } from '@/lib/db';

// const GAS_API_KEY = process.env.GAS_API_KEY;
// if (!GAS_API_KEY) {
//   throw new Error('GAS_API_KEY is required');
// }

// const corsHeaders = {
//   'Access-Control-Allow-Origin': 'demodemo.com',
//   'Access-Control-Allow-Methods': 'GET OPTIONS',
//   'Access-Control-Allow-Headers': 'Content-Type, Authorization',
// };

// export async function OPTIONS() {
//   return NextResponse.json({}, { headers: corsHeaders });
// }

// export async function GET(req: NextRequest) {
//   const authorizationValue = req.headers.get('Authorization');
//   const apiKey = authorizationValue?.replace('Bearer ', '');

//   if (apiKey !== GAS_API_KEY) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });
//   }

//   const emails = await db.user.findMany({
//     where: { role: 'GENERAL' },
//     select: { email: true },
//   });

//   const res = emails.map((data) => data.email);

//   return NextResponse.json({ data: res }, { status: 200, headers: corsHeaders });
// }
