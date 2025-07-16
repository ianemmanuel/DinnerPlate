import { NextResponse } from 'next/server';
import { API_ENDPOINTS } from '@restaurant-webapp/lib/endpoints';
export async function GET() {
  try {
    const flutterwaveSecret = process.env.FLUTTERWAVE_SECRET_KEY;
    
    const res = await fetch(API_ENDPOINTS.BANKS.FLUTTERWAVE_BANKS, {
      headers: {
        Authorization: `Bearer ${flutterwaveSecret}`
      }
    })

    const data = await res.json()

    if (data.status !== 'success') {
      return NextResponse.json({ error: 'Failed to fetch banks' }, { status: 500 })
    }

    return NextResponse.json(data.data)
  } catch (error) {
    console.error('Error fetching banks:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
