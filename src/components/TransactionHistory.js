import React, { useState, useEffect } from "react";
import "../styles.css";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = () => {
    const saved = localStorage.getItem("transactionHistory");
    if (saved) {
      setTransactions(JSON.parse(saved));
    }
  };

  const clearHistory = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus semua riwayat transaksi?")) {
      localStorage.removeItem("transactionHistory");
      setTransactions([]);
    }
  };

  return (
    <div className="transaction-history-container">
      <h3 className="history-title">📝 Riwayat Transaksi Anda</h3>
      
      {transactions.length === 0 ? (
        <div className="empty-state">
          <p>📦 Belum ada transaksi yang tercatat</p>
          <p style={{ fontSize: "12px", color: "#888" }}>Mulai dengan melakukan donasi pertama Anda</p>
        </div>
      ) : (
        <div className="transactions-list">
          {transactions.map((tx, index) => (
            <div key={index} className="transaction-card">
              <div className="transaction-header">
                <span className="transaction-number">#{transactions.length - index}</span>
                <span className="transaction-status">✓ Berhasil</span>
              </div>

              <div className="transaction-content">
                <div className="transaction-row">
                  <span className="transaction-label">📅 Tanggal:</span>
                  <span className="transaction-value">{tx.timestamp}</span>
                </div>

                <div className="transaction-row">
                  <span className="transaction-label">💰 Jumlah:</span>
                  <span className="transaction-value"><strong>{tx.amount} ETH</strong></span>
                </div>

                <div className="transaction-row">
                  <span className="transaction-label">📌 Catatan:</span>
                  <span className="transaction-value">{tx.note}</span>
                </div>

                <div className="transaction-row">
                  <span className="transaction-label">🔗 TX Hash:</span>
                  <a
                    href={`https://sepolia.etherscan.io/tx/${tx.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tx-hash-link"
                  >
                    {tx.txHash.substring(0, 10)}...{tx.txHash.substring(tx.txHash.length - 8)}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {transactions.length > 0 && (
        <button onClick={clearHistory} className="clear-history-btn">
          🗑️ Hapus Semua Riwayat
        </button>
      )}
    </div>
  );
};

export default TransactionHistory;
