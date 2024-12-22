import React from "react";
import { Currency } from "../../types/ICurrency";

interface ResultProps {
  amount: string;
  currency: Currency;
  type: "buy" | "sell";
}

const Result: React.FC<ResultProps> = ({ amount, currency, type }) => {
  const amountNumber = parseFloat(amount);
  const result = type === "buy" ? amountNumber / currency.Value : amountNumber * currency.Value;

  return (
    <div className="mt-4 p-4 border rounded shadow">
      <h2 className="text-lg font-semibold">Результат</h2>
      <p>
        {type === "buy" ? "Купить" : "Продать"} {currency.Name} ({currency.CharCode}): {isNaN(result) ? 0 : result.toFixed(2)} {type === "sell" ? "RUB" : ""}
      </p>
      <p>Курс обмена: {currency.Value}</p>
    </div>
  );
};

export default Result;