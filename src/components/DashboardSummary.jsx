import React, { useMemo } from 'react';

// Helper function to format currency
const formatCurrency = (amount) => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

const DashboardSummary = ({ transactions }) => {
  // Use useMemo for performance: calculations only run when 'transactions' array changes
  const { totalIncome, totalExpenses, netBalance } = useMemo(() => {
    let income = 0;
    let expenses = 0;

    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        income += transaction.amount;
      } else if (transaction.type === 'expense') {
        expenses += transaction.amount;
      }
    });

    return {
      totalIncome: income,
      totalExpenses: expenses,
      netBalance: income - expenses,
    };
  }, [transactions]); // Dependency array

  return (
    <div className="summary-board">
      {/* Card 1: Total Income */}
      <div className="summary-card income">
        <h3>Total Income</h3>
        <h2>{formatCurrency(totalIncome)}</h2>
      </div>

      {/* Card 2: Total Expenses */}
      <div className="summary-card expense">
        <h3>Total Expenses</h3>
        <h2>{formatCurrency(totalExpenses)}</h2>
      </div>

      { /* Card 3: Net Balance */}
      <div className="summary-card balance">
        <h3>Net Balance</h3>
        <h2 
          // Conditional class to show positive/negative balance
          className={netBalance >= 0 ? 'positive' : 'negative'}
        >
          {formatCurrency(netBalance)}
        </h2>
      </div>
    </div>
  );
};

export default DashboardSummary;