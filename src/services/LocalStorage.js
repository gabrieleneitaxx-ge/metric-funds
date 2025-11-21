const STORAGE_KEY = 'metricFundsTransactions';

/** Loads the array of transactions from Local Storage. */
export const loadTransactions = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    // Return saved data or an empty array if none exists
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (error) {
    console.error("Error loading transactions:", error);
    return [];
  }
};

/** Saves the current array of transactions to Local Storage. */
export const saveTransactions = (transactions) => {
  try {
    const serializedState = JSON.stringify(transactions);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.error("Error saving transactions:", error);
  }
};