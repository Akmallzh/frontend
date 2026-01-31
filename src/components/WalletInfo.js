import React, { useState } from 'react';
import { ethers } from 'ethers';

const WalletInfo = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('MetaMask tidak terdeteksi!');
        return;
      }
      const [selectedAccount] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(selectedAccount);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(selectedAccount);
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error('Koneksi wallet gagal:', error);
      alert('Gagal koneksi wallet');
    }
  };

  return (
    <div style={{
      background: 'white',
      padding: '25px',
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      marginBottom: '25px',
      animation: 'slideIn 0.5s ease-out'
    }}>
      <h3 style={{
        color: '#333',
        marginBottom: '15px',
        fontSize: '18px'
      }}>
        🔗 Koneksi Wallet
      </h3>

      {!account ? (
        <div>
          <p style={{ color: '#666', marginBottom: '15px', fontSize: '14px' }}>
            Hubungkan wallet MetaMask Anda untuk memulai berdonasi
          </p>
          <button 
            onClick={connectWallet}
            style={{
              width: '100%',
              padding: '12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Hubungkan MetaMask
          </button>
        </div>
      ) : (
        <div>
          <div style={{
            background: '#f8f9ff',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '15px',
            border: '2px solid #667eea'
          }}>
            <p style={{ color: '#555', fontSize: '13px', margin: '8px 0' }}>
              <strong>📍 Wallet Address:</strong>
            </p>
            <p style={{
              color: '#667eea',
              fontSize: '12px',
              wordBreak: 'break-all',
              fontFamily: 'monospace',
              margin: '8px 0'
            }}>
              {account}
            </p>

            <p style={{ color: '#555', fontSize: '13px', margin: '15px 0 8px 0' }}>
              <strong>💰 Balance:</strong>
            </p>
            <p style={{
              color: '#28a745',
              fontSize: '20px',
              fontWeight: '700',
              margin: '8px 0'
            }}>
              {parseFloat(balance).toFixed(4)} ETH
            </p>
          </div>

          <button 
            onClick={() => {
              setAccount(null);
              setBalance(null);
            }}
            style={{
              width: '100%',
              padding: '10px',
              background: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#ff5252';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = '#ff6b6b';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Putuskan Koneksi
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletInfo;
