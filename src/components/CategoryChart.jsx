import React, { useMemo } from 'react';
import './CategoryChart.css';
import formatCurrency from '../utils/formatCurrency';

const CategoryChart = ({ transactions }) => {
  const categoryData = useMemo(() => {
    const totals = {};

    transactions.forEach((transaction) => {
      if (transaction.type === 'expense') {
        const category = transaction.category || 'Other';
        totals[category] = (totals[category] || 0) + transaction.amount;
      }
    });

    return Object.entries(totals)
      .map(([category, amount]) => ({
        category,
        amount,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  const totalExpenses = categoryData.reduce(
    (total, item) => total + item.amount,
    0
  );

  return (
    <div className="chart-container">
      <h3>Spending Breakdown</h3>

      {categoryData.length === 0 ? (
        <p className="chart-placeholder">
          No expenses recorded yet. Add an expense to see your spending breakdown.
        </p>
      ) : (
        <div className="category-breakdown">
          <p className="category-total">
            Total Expenses: {formatCurrency(totalExpenses)}
          </p>

          {categoryData.map((item) => {
            const percentage = (item.amount / totalExpenses) * 100;

            return (
              <div className="category-item" key={item.category}>
                <div className="category-details">
                  <span>{item.category}</span>
                  <span>{formatCurrency(item.amount)}</span>
                </div>

                <div
                  className="category-bar-track"
                  role="progressbar"
                  aria-label={`${item.category} spending`}
                  aria-valuenow={Math.round(percentage)}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    className="category-bar-fill"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <span className="category-percentage">
                  {percentage.toFixed(1)}%
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryChart;
