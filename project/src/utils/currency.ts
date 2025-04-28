export const convertToRupees = (amount: number): number => {
  // Using a fixed conversion rate of 1 USD = 83 INR
  return amount * 83;
};

export const formatRupees = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
};