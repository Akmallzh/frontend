import React from 'react';

import WalletInfo from './components/WalletInfo';
import DonationList from './components/DonationsList';
import DonateForm from "./components/DonateForm";
import TransactionHistory from "./components/TransactionHistory";
import './styles.css';

function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          animation: 'slideIn 0.6s ease-out'
        }}>
          <h1 style={{
            fontSize: '40px',
            color: 'white',
            marginBottom: '8px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            fontWeight: 700
          }}>
            🤝 OpenDonation
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '14px'
          }}>
            Platform donasi terdesentralisasi berbasis blockchain
          </p>
        </div>

        <WalletInfo />
        <DonateForm />
        <TransactionHistory />
        
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          animation: 'slideIn 0.5s ease-out 0.2s both'
        }}>
          <h2 style={{
            color: '#333',
            marginBottom: '20px',
            fontSize: '20px',
            borderBottom: '3px solid #667eea',
            paddingBottom: '10px'
          }}>
            📊 Daftar Donasi
          </h2>
          <DonationList />
        </div>
      </div>
    </div>
  );
}

export default App;
