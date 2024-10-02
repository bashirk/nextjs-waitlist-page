import { google } from 'googleapis';

export async function POST(request: Request) {
  const { email } = await request.json();

  const auth = new google.auth.GoogleAuth({
    keyFile: 'app/api/submit/service-account-c96d64a0c721.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  
  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_ID, // Your spreadsheet ID
      range: 'Sheet1!B2:B', // The range you want to write to
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[email]],
      },
    });

    return new Response('Email submitted to Google Sheets successfully!', {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response('Failed to submit email to Google Sheets!', { status: 500 });
  }
}
