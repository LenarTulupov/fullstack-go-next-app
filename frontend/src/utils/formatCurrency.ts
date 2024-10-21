type TypeCurrency = 'EUR' | 'USD';

interface IFormatCurrency {
  price: string | number;
  currency: TypeCurrency;
}

export default function formatCurrency({ price, currency }: IFormatCurrency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
  }).format(Number(price));
}
