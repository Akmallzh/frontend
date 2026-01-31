import React, { useState } from "react";
import { donate } from "../blockchain/donations";

const DonateForm = () => {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDonate = async () => {
    try {
      setLoading(true);
      const txHash = await donate(amount);
      
      // 🔹 Simpan transaksi ke localStorage
      const newTransaction = {
        timestamp: new Date().toLocaleString("id-ID"),
        amount: amount,
        note: note || "Tanpa catatan",
        txHash: txHash
      };
      
      const saved = localStorage.getItem("transactionHistory");
      const transactions = saved ? JSON.parse(saved) : [];
      transactions.unshift(newTransaction); // tambah ke awal list
      localStorage.setItem("transactionHistory", JSON.stringify(transactions));
      
      alert(`Donasi berhasil! TX: ${txHash}`);
      setAmount("");
      setNote("");
      
      // Reload page untuk update transaction history
      window.location.reload();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donate-form-container">
      <h3 className="form-title">💝 Form Donasi</h3>
      
      <div className="form-group">
        <label className="form-label">Jumlah Donasi (ETH)</label>
        <input
          className="form-input"
          type="number"
          placeholder="Masukkan jumlah ETH"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          step="0.01"
          min="0"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Catatan Donasi (Opsional)</label>
        <textarea
          className="form-textarea"
          placeholder="Contoh: Bantuan untuk Palestina, Donasi untuk pendidikan, dll..."
          value={note}
          onChange={e => setNote(e.target.value)}
          rows="3"
        />
      </div>

      <button 
        className="donate-btn" 
        onClick={handleDonate} 
        disabled={loading || !amount}
      >
        {loading ? "⏳ Memproses..." : "✓ Kirim Donasi"}
      </button>

      <div className="form-helper">
        <p><strong>📌 Cara Penggunaan:</strong></p>
        <ul>
          <li>Pastikan MetaMask sudah terhubung ke jaringan Sepolia Testnet</li>
          <li>Masukkan jumlah ETH yang ingin didonasikan</li>
          <li>Tambahkan catatan/pesan donasi Anda (opsional)</li>
          <li>Klik "Kirim Donasi" dan konfirmasi di MetaMask</li>
          <li>Lihat riwayat transaksi Anda di bawah</li>
        </ul>
      </div>
    </div>
  );
};

export default DonateForm;
