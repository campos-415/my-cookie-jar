import React from "react";

interface CurrencyProps {
  value: number;
  currency?: string;
  locale?: string;
};

const Currency = ({ value, currency, locale = "en-US" }:CurrencyProps) => {
  const formattedValue = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);

  return <span>{formattedValue}</span>;
};

export default Currency;
