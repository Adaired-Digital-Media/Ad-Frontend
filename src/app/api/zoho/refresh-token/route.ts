import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(): Promise<Response> {
  try {
    // Zoho credentials from environment variables
    const clientId = process.env.ZOHO_CLIENT_ID as string;
    const clientSecret = process.env.ZOHO_CLIENT_SECRET as string;
    const refreshToken = process.env.ZOHO_REFRESH_TOKEN as string;

    const tokenUrl = `${process.env.ZOHO_API_BASE}/oauth/v2/token`;

    // Request a new access token
    const response = await axios.post(tokenUrl, null, {
      params: {
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token',
      },
    });

    const { access_token: newAccessToken } = response.data;

    // Log or save the new token securely
    console.log('New Access Token:', newAccessToken);

    return NextResponse.json({ accessToken: newAccessToken });
  } catch (error: any) {
    console.error('Error refreshing access token:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to refresh access token' },
      { status: 500 }
    );
  }
}
