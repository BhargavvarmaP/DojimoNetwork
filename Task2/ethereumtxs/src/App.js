import TransactionList from './components/Transactionlist';

function App() {
  const address = '0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4'; 
  return (
    <div className="min-h-screen bg-gray-100">
      <TransactionList address={address} />
    </div>
  );
}

export default App;