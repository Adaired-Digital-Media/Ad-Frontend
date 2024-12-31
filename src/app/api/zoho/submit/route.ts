import { NextResponse } from 'next/server';
import axios from 'axios';

interface LeadData {
  First_Name: string;
  Last_Name: string;
  Email: string;
  Phone?: string; // Optional
}

export async function POST(req: Request): Promise<Response> {
  try {
    // Parse form data
    const formData: LeadData = await req.json();

    // Zoho API credentials
    const accessToken = process.env.ZOHO_ACCESS_TOKEN as string;
    const apiUrl = `${process.env.ZOHO_API_BASE}/crm/v2/Leads`;

    // Send data to Zoho CRM
    const response = await axios.post(
      apiUrl,
      { data: [formData] }, // Zoho API expects data as an array of objects
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error submitting data to Zoho CRM:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to submit data to Zoho CRM' },
      { status: 500 }
    );
  }
}
