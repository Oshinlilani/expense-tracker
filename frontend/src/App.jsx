
import { useState } from 'react';
import './App.css';
import TransactionForm from '../components/TransactionForm.jsx';
import TransactionList from '../components/TransactionList.jsx';
import Summary from '../components/Summary.jsx';


function App() {

  const initialTransactions = [
    { id: 1, title: "Salary", amount: 30000, type: "income" },
    { id: 2, title: "Rent", amount: 8000, type: "expense" },
    { id: 3, title: "Shopping", amount: 2500, type: "expense" },
    { id: 4, title: "Freelancing", amount: 5000, type: "income" },
  ];
  

  const [transaction, setTransaction] = useState(initialTransactions);

  const handleTransaction = (newTransaction) => {
    setTransaction((prev) => [...prev, newTransaction])
  }

  return (
    <>
      <div className='app'>
        <h1>Expense Tracker</h1>

        <TransactionForm handleTransaction={handleTransaction} />
        <TransactionList transactions={transaction} />

        <Summary expenses={transaction}/>
      </div>
    </>
  )
}

export default App
