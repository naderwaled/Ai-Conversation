'use client';

import { Layout, Typography } from 'antd';
import ChatInterface from './components/chatInterface';


const { Header, Content } = Layout;
const { Title, Text } = Typography;

export default function Home() {
  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header style={{ background: 'white', padding: '0 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
          <Title level={3} style={{ color: '#000', margin: 0 }}>
            AI Assistant
          </Title>
        </div>
      </Header>
      <Content style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <>
            <Text type="secondary" style={{ display: 'block', marginBottom: '24px', textAlign: 'center' }}>
              Chat with our AI assistant powered by ElevenLabs
            </Text>
            <ChatInterface />
          </>
      </Content>
    </Layout>
  );

}