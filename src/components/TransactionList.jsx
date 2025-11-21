import React, { useState, useMemo } from 'react';
import './TransactionList.css'; 

// Helper function for consistent currency formatting
const formatCurrency = (amount) => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

const TransactionList = ({ transactions, onDeleteTransaction }) => {
  // State to manage sorting: { key: 'date' | 'amount' | 'description', direction: 'ascending' | 'descending' }
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'descending' });

  // 1. Sorting Logic (Memoized to run only when transactions or sortConfig change)
  const sortedTransactions = useMemo(() => {
    // Create a mutable copy of the transactions array
    let sortableItems = [...transactions];

    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Special handling for number fields (like amount)
        if (sortConfig.key === 'amount') {
          // Normalize amounts: Expense amounts should be negative for sorting
          aValue = a.type === 'expense' ? -a.amount : a.amount;
          bValue = b.type === 'expense' ? -b.amount : b.amount;
        }

        // Comparison logic
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0; // Values are equal
      });
    }
    return sortableItems;
  }, [transactions, sortConfig]);

  // 2. Handler to change sorting column/direction
  const requestSort = (key) => {
    let direction = 'descending';
    // If the same key is clicked, toggle the direction
    if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });
  };

  // 3. Helper to display the sorting arrow
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) {
      return null;
    }
    // Unicode characters for arrows (cleaner than FontAwesome)
    return <span className="sort-indicator">{sortConfig.direction === 'ascending' ? '▲' : '▼'}</span>;
  };

  if (transactions.length === 0) {
    return (
      <div 
        className="transaction-list-container"
      >
        <h3>Recent Transactions</h3>
        <p className="no-transactions">No transactions recorded yet. Start adding items above!</p>
      </div>
    );
  }

  // Helper function to create sortable table headers
  const SortableHeader = ({ sortKey, title }) => {
    const isSorted = sortConfig.key === sortKey;
    const className = `sortable-header ${isSorted ? 'sorted' : ''}`;

    return (
      <th 
        className={className} 
        onClick={() => requestSort(sortKey)}
      >
        {title}
        {getSortIndicator(sortKey)}
      </th>
    );
  };


  return (
    <div 
      className="transaction-list-container"
    >
      <h3>Recent Transactions ({transactions.length})</h3>
      
      <table className="transaction-table">
        <thead>
          <tr>
            {/* DATE Column: Sortable by 'date' */}
            <SortableHeader sortKey="date" title="Date" />
            
            {/* DESCRIPTION Column: Sortable by 'description' */}
            <SortableHeader sortKey="description" title="Description" />
            
            {/* CATEGORY Column: Not sortable for simplicity */}
            <th>Category</th>
            
            {/* TYPE Column: Not sortable for simplicity */}
            <th>Type</th>
            
            {/* AMOUNT Column: Sortable by 'amount' */}
            <SortableHeader sortKey="amount" title="Amount" />
            
            {/* ACTION Column: Not sortable */}
            <th className="action-col">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through the SORTED array */}
          {sortedTransactions.map(transaction => (
            <tr key={transaction.id}>
              <td className="date-col">{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              
              <td 
                className={`type-${transaction.type}`}
              >
                {transaction.type}
              </td>
              
              <td className="amount-col">
                {/* Prepend '-' for expenses for visual clarity */}
                {transaction.type === 'expense' ? '-' : ''}
                {formatCurrency(transaction.amount)}
              </td>
              
              {/* Action Button */}
              <td className="action-col">
                {onDeleteTransaction && (
                  <button 
                    className="btn-delete"
                    onClick={() => onDeleteTransaction(transaction.id)}
                    title="Delete Transaction"
                  >
                    &times;
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;