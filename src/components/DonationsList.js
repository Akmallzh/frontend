import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getContract } from "../blockchain/donations";

const DonationList = () => {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDonations = async () => {
      try {
        // ⬅️ WAJIB pakai await
        const contract = await getContract();
        const data = await contract.getDonations();

        const parsed = data.map(d => ({
          from: d.from,
          amount: ethers.utils.formatEther(d.amount),
          time: new Date(d.timestamp.toNumber() * 1000).toLocaleString()
        }));

        setDonations(parsed);
      } catch (err) {
        console.error(err);
        setError(err.message || "Gagal memuat data donasi dari blockchain");
      }
    };

    loadDonations();
  }, []);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {donations.length === 0 && !error && (
        <p>Belum ada donasi</p>
      )}

      {donations.map((d, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
            borderRadius: "6px"
          }}
        >
          <p><b>From:</b> {d.from}</p>
          <p><b>Amount:</b> {d.amount} ETH</p>
          <p><b>Time:</b> {d.time}</p>
        </div>
      ))}
    </div>
  );
};

export default DonationList;
