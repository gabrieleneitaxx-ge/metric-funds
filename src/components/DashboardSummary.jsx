import React, { useMemo } from 'react';
import './DashboardSummary.css';
import formatCurrency from '../utils/formatCurrency';

const DashboardSummary = ({ transactions }) => {
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
  }, [transactions]);

  return (
    <div className="summary-board">
      <div className="summary-card income">
        <h3>Total Income</h3>
        <h2>{formatCurrency(totalIncome)}</h2>
      </div>

      <div className="summary-card expense">
        <h3>Total Expenses</h3>
        <h2>{formatCurrency(totalExpenses)}</h2>
      </div>

      <div className="summary-card balance">
        <h3>Net Balance</h3>
        <h2 className={netBalance >= 0 ? 'positive' : 'negative'}>
          {formatCurrency(netBalance)}
        </h2>
      </div>
    </div>
  );
};

export default DashboardSummary;
