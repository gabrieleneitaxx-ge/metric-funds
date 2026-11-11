import React, { useState, useMemo } from 'react';
import './TransactionList.css';
import formatCurrency from '../utils/formatCurrency';

const TransactionList = ({ transactions, onDeleteTransaction }) => {
  const [sortConfig, setSortConfig] = useState({
    key: 'date',
    direction: 'descending',
  });
  const sortedTransactions = useMemo(() => {
    const sortableItems = [...transactions];

    sortableItems.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'amount') {
        aValue = a.type === 'expense' ? -a.amount : a.amount;
        bValue = b.type === 'expense' ? -b.amount : b.amount;
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }

      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }

      return 0;
    });

    return sortableItems;
  }, [transactions, sortConfig]);

const requestSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === 'descending'
        ? 'ascending'
        : 'descending';

    setSortConfig({ key, direction });
  };

  const SortableHeader = ({ sortKey, title }) => {
    const isSorted = sortConfig.key === sortKey;
  return (
      <th
        className={`sortable-header ${isSorted ? 'sorted' : ''}`}
        aria-sort={
          isSorted
            ? sortConfig.direction === 'ascending'
              ? 'ascending'
              : 'descending'
            : 'none'
        }
      >
        <button
          type="button"
          className="sort-button"
          onClick={() => requestSort(sortKey)}
        >
          {title}
          {isSorted && (
            <span className="sort-indicator" aria-hidden="true">
              {sortConfig.direction === 'ascending' ? '\u25B2' : '\u25BC'}
            </span>
          )}
        </button>
      </th>
    );
  };

  if (transactions.length === 0) {
    return (
      <div className="transaction-list-container">
        <h3>Recent Transactions</h3>
        <p className="no-transactions">
          No transactions recorded yet. Start adding items above!
        </p>
      </div>
    );
  }
return (
    <div className="transaction-list-container">
      <h3>Recent Transactions ({transactions.length})</h3>

      <div className="transaction-table-wrapper">
        <table className="transaction-table">
          <thead>
            <tr>
              <SortableHeader sortKey="date" title="Date" />
              <SortableHeader sortKey="description" title="Description" />
              <th>Category</th>
              <th>Type</th>
              <SortableHeader sortKey="amount" title="Amount" />
              <th className="action-col">Action</th>
            </tr>
          </thead>

          <tbody>
            {sortedTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="date-col">{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>

                <td className={`type-${transaction.type}`}>
                  {transaction.type}
                </td>

                <td className="amount-col">
                  {transaction.type === 'expense' ? '-' : ''}
                  {formatCurrency(transaction.amount)}
                </td>

                <td className="action-col">
                  {onDeleteTransaction && (
                    <button
                      type="button"
                      className="btn-delete"
                      onClick={() => onDeleteTransaction(transaction.id)}
                      title="Delete Transaction"
                      aria-label={`Delete ${transaction.description}`}
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
    </div>
  );
};

export default TransactionList;
