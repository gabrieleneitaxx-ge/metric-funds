import React, { useState } from 'react';
import './TransactionForm.css';

const TransactionForm = ({ onAddTransaction }) => {
  // Local state to manage the form inputs
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense', // Default: Expense
    category: 'Food', // Default category
  });

  // Category options that dynamically change based on 'type'
  const expenseCategories = ['Food', 'Rent', 'Utilities', 'Transportation', 'Entertainment', 'Other'];
  const incomeCategories = ['Salary', 'Gift', 'Investment', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Use spread operator to update only the changed field
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.description.trim() || !formData.amount || isNaN(formData.amount)) {
      alert("Please ensure you provide a valid description and a numerical amount.");
      return;
    }

    const newTransaction = {
      description: formData.description.trim(),
      // Ensure amount is stored as a positive number
      amount: Math.abs(parseFloat(formData.amount)), 
      type: formData.type,
      category: formData.category,
      // Date and ID will be added in App.jsx
    };

    // 1. Pass the new transaction object up to the App component's addTransaction function
    onAddTransaction(newTransaction); 

    // 2. Reset the form state for a clean next entry
    setFormData({
      description: '',
      amount: '',
      type: 'expense',
      category: 'Food',
    });
  };

  // Logic to switch categories shown in the select box
  const availableCategories = formData.type === 'income' 
    ? incomeCategories 
    : expenseCategories;

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <h3>Add New Transaction</h3>
      
      {/* 1. Type Selector (Income/Expense) */}
      <div className="form-group">
        <label htmlFor="type">Type</label>
        <select id="type" name="type" value={formData.type} onChange={handleChange}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      {/* 2. Amount Input */}
      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input 
          id="amount" 
          name="amount" 
          type="number" 
          step="0.01" 
          placeholder="0.00" 
          value={formData.amount} 
          onChange={handleChange} 
        />
      </div>

      {/* 3. Description Input */}
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input 
          id="description" 
          name="description" 
          type="text" 
          placeholder="e.g., Coffee, Monthly Salary" 
          value={formData.description} 
          onChange={handleChange} 
        />
      </div>
      
      {/* 4. Category Selector (Dynamically changes options) */}
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select id="category" name="category" value={formData.category} onChange={handleChange}>
          {availableCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      
      <button type="submit" className="btn-submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;