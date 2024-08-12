import { Client,TextMessage } from '@line/bot-sdk';
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from 'next/server';


const config = {
  channelAccessToken: process.env.NEXT_PUBLIC_LINE_ACCESS_TOKEN || "",
  channelSecret: process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET || "",
};

const client = new Client(config);

console.log('hello');

export async function GET() {
  try {
    const messages: TextMessage[] = [{
      type: 'text',
      text: 'Hello World.'
    }];

    await client.pushMessage('U681cb677bdbf84fd1a8bd88f75583c22', {
      type: "text",
      text: messages[0].text,
    });

  } catch (err) {
    console.log(err);
  }
  return NextResponse.json({
  message: "データを取得!",
});
}
