import { ethers } from "ethers";
import DonationsABI from "../abi/DonationsABI.json";

const CONTRACT_ADDRESS = "0x8ABD117872764C797316bc83f39A47E2167e7794";

// 🔹 Ambil contract + cek network
export const getContract = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask tidak terdeteksi");
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const network = await provider.getNetwork();

  // CEK NETWORK SEPOLIA
  if (network.chainId !== 11155111) {
    throw new Error("Harap pindahkan MetaMask ke Sepolia Testnet");
  }

  return new ethers.Contract(
    CONTRACT_ADDRESS,
    DonationsABI,
    provider
  );
};
// 🔹 Fungsi donasi
export const donate = async (amountETH) => {
  if (!window.ethereum) {
    throw new Error("MetaMask tidak terdeteksi");
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    DonationsABI,
    signer
  );

  const tx = await contract.donate({
    value: ethers.utils.parseEther(amountETH)
  });

  await tx.wait();
  
  return tx.hash;
};
