import { type NextRequest, NextResponse } from 'next/server';

const config = {
  recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
  zohoApiUrl: process.env.ZOHO_API_URI || '',
  zohoClientId: process.env.ZOHO_CLIENT_ID || '',
  zohoClientSecret: process.env.ZOHO_CLIENT_SECRET || '',
  zohoAccessToken: process.env.ZOHO_ACCESS_TOKEN || '',
  zohoRefreshToken: process.env.ZOHO_REFRESH_TOKEN || '',
};

async function checkAndRefreshZohoAccessToken(): Promise<string> {
  try {
    // Make a test API call to check if the access token is valid
    const response = await fetch(`${config.zohoApiUrl}/Leads`, {
      method: 'GET',
      headers: {
        Authorization: `Zoho-oauthtoken ${config.zohoAccessToken}`,
      },
    });

    if (response.ok) {
      return config.zohoAccessToken;
    } else {
      // Token is expired, refresh it
      const refreshResponse = await fetch(
        'https://accounts.zoho.com/oauth/v2/token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: config.zohoClientId,
            client_secret: config.zohoClientSecret,
            refresh_token: config.zohoRefreshToken,
            grant_type: 'refresh_token',
          }),
        }
      );

      if (!refreshResponse.ok) {
        throw new Error('Failed to refresh Zoho Access Token');
      }

      const refreshData = await refreshResponse.json();
      const newAccessToken = refreshData.access_token;
      config.zohoAccessToken = newAccessToken;

      return newAccessToken;
    }
  } catch (error: any) {
    throw new Error('Failed to refresh Zoho access token', error);
  }
}

// Send data to Zoho CRM
async function sendToZohoCRM(data: any): Promise<void> {
  try {
    const validAccessToken = await checkAndRefreshZohoAccessToken();
    const response = await fetch(config.zohoApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Zoho-oauthtoken ${validAccessToken}`,
      },
      body: JSON.stringify({ data: [data] }),
    });

    if (!response.ok) {
      throw new Error(`Zoho CRM Error: ${await response.text()}`);
    }
  } catch (error: any) {
    throw new Error('Failed to send data to Zoho CRM', error);
  }
}

export async function POST(request: NextRequest) {
  const payload = await request.json();

  console.log('Payload:', payload);

  // Verify the reCAPTCHA token
  try {
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${config.recaptchaSecretKey}&response=${payload.gRecaptchaToken}`
    ).then((res) => res.json());

    if (!recaptchaResponse.success || recaptchaResponse.score < 0.5) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: 'reCAPTCHA verification error', err },
      { status: 500 }
    );
  }

  // Zoho CRM payload
  const zohoData = {
    Company: 'Adaired Digital',
    First_Name: payload?.name
      ? payload?.name?.split(' ')[0]
      : payload?.email?.split('@')[0],
    Last_Name: payload?.name
      ? payload?.name?.split(' ').slice(1).join(' ')
      : 'N/A',
    Email: payload?.email,
    Phone: payload?.phone,
    Description:
      payload?.interest + ' ' + payload?.message || 'No message provided',
    Lead_Source: 'Website Contact Form',
  };

  try {
    await sendToZohoCRM(zohoData);
    return NextResponse.json(
      { message: 'Data sent to Zoho CRM successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to send data to Zoho CRM', details: error.message },
      { status: 500 }
    );
  }
}
