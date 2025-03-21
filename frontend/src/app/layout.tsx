'use client';

import { ConfigProvider } from 'antd';
import theme from './theme/antTheme';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>AI Conversation</title>
        <meta name="description" content="Chat with AI powered by ElevenLabs" />
      </head>
      <body>
        <ConfigProvider theme={theme}>
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}