import React from "react";

interface PriceDisplayProps {
  price: string;
  highlight: boolean;
}

export function PriceDisplay({ price, highlight }: PriceDisplayProps) {
  const [priceValue, priceTerm] = price.split(" / ");

  return (
    <div className="mb-4">
      <span className="flex items-baseline gap-1 whitespace-nowrap">
        <span
          className={`text-4xl font-extrabold tabular-nums ${
            highlight ? "text-purple-600" : "text-black"
          }`}
        >
          {priceValue}
        </span>
        {priceValue !== "£0.00" && priceTerm && (
          <span className="text-base font-bold text-gray-600">{`/ ${priceTerm}`}</span>
        )}
      </span>
    </div>
  );
}
