export const formatRp = number => {
  if (isNaN(parseInt(number))) {
    return '';
  }
  return new Intl.NumberFormat('id-ID', {
    maximumSignificantDigits: 4,
    style: 'currency',
    currency: 'IDR',
  }).format(number);
};
