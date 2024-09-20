import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const TransactionList = ({ address }) => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const transactionsPerPage = 15;

  const provider = new ethers.providers.JsonRpcProvider('https://rpc.sepolia.org');

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        const latestBlock = await provider.getBlockNumber();
        const fetchedTransactions = [];
        for (let i = latestBlock; i > latestBlock - 10; i--) {
          const block = await provider.getBlockWithTransactions(i);
          block.transactions.forEach((tx) => {
            if (tx.from === address || tx.to === address) {
              fetchedTransactions.push(tx);
            }
          });
        }

        const total = fetchedTransactions.length;
        setTotalPages(Math.ceil(total / transactionsPerPage));
        setTransactions(fetchedTransactions);
      } catch (err) {
        setError('Failed to fetch transactions.');
      }
      setLoading(false);
    };

    fetchTransactions();
  }, [address]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Sepolia Testnet Transactions</h1>
      <h2 className="text-xl font-semibold text-gray-700 text-center mb-8">Transactions for {address}</h2>
      
      {loading ? (
        <p className="text-center text-gray-600">Loading transactions...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
              <thead>
                <tr className="bg-blue-100 text-blue-700">
                  <th className="py-3 px-6 text-left">Transaction Hash</th>
                  <th className="py-3 px-6 text-left">From</th>
                  <th className="py-3 px-6 text-left">To</th>
                  <th className="py-3 px-6 text-left">Value (ETH)</th>
                  <th className="py-3 px-6 text-left">Gas Used</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((tx) => (
                  <tr key={tx.hash} className="border-t hover:bg-gray-100">
                    <td className="py-4 px-6 text-gray-700">
                      <a
                        href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {tx.hash.slice(0, 10)}...{tx.hash.slice(-10)}
                      </a>
                    </td>
                    <td className="py-4 px-6 text-gray-700">{tx.from}</td>
                    <td className="py-4 px-6 text-gray-700">{tx.to}</td>
                    <td className="py-4 px-6 text-gray-700">{ethers.utils.formatEther(tx.value)}</td>
                    <td className="py-4 px-6 text-gray-700">{tx.gasUsed?.toString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 ${
                currentPage === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-400'
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 ${
                currentPage === totalPages
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-400'
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionList;
