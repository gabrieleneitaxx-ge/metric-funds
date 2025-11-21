import React, { useState, useEffect } from 'react';
import { loadTransactions, saveTransactions } from './services/localStorage';

// --- Import All Components (Required for rendering) ---
import Header from './components/Header';
import DashboardSummary from './components/DashboardSummary';
import TransactionForm from './components/TransactionForm'; 
import TransactionList from './components/TransactionList'; 
import CategoryChart from './components/CategoryChart'; 
import './index.css'; 

// Changed to an arrow function structure for cleaner export registration
const App = () => {
  // Load initial state from local storage
  const [transactions, setTransactions] = useState(loadTransactions()); 

  // Side Effect: Save data to local storage whenever 'transactions' changes
  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]); 

  // Function to add a new transaction (passed down as a prop)
  const addTransaction = (newTransaction) => {
    const transactionWithId = { 
      ...newTransaction, 
      id: Date.now(), // Unique ID
      date: new Date().toISOString().split('T')[0] // Current date (YYYY-MM-DD)
    }; 
    setTransactions((prevTransactions) => 
      [transactionWithId, ...prevTransactions] // Add newest transaction to the top
    );
  };

  // Function to delete a transaction by its ID
  const deleteTransaction = (id) => {
    setTransactions(prevTransactions => 
      prevTransactions.filter(transaction => transaction.id !== id)
    );
  };

  return (
    <div className="container">
      <Header title="MetricFunds" />
      
      <div className="dashboard-grid">
        {/* TOP ROW: Summary Metrics */}
        <DashboardSummary transactions={transactions} /> 
        
        {/* MIDDLE ROW: Input Form and Chart */}
        <div className="input-and-chart-area">
          <TransactionForm onAddTransaction={addTransaction} /> 
          <CategoryChart transactions={transactions} /> 
        </div>

        {/* BOTTOM ROW: Detailed Transaction List */}
        <TransactionList 
          transactions={transactions} 
          onDeleteTransaction={deleteTransaction} 
        /> 
      </div>
    </div>
  );
}

export default App;
