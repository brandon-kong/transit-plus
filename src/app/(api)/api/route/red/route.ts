import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { parseString } from 'xml2js';
import axios from 'axios';

export async function GET(req: NextRequest) {
    const { data } = await axios.get(
        `https://lapi.transitchicago.com/api/1.0/ttpositions.aspx?rt=red&key=${process.env.CTA_API_KEY}`,
        {
            responseType: 'json',
        },
    );

    const result = await new Promise((resolve, reject) => {
        parseString(data, function (err, result) {
            if (err) {
                reject(err);
            } else resolve(result);
        });
    });

    return NextResponse.json(result);
}
