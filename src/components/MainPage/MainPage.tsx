import React, { useState } from "react";
import { ExchangeRates } from "../../types/ICurrency";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Result from "../Result/Result";

interface MainPageProps {
  data: ExchangeRates;
}

const MainPage: React.FC<MainPageProps> = ({ data }) => {
  const [amount, setAmount] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [transactionType, setTransactionType] = useState<"buy" | "sell">("buy");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleCurrencyChange = (value: string) => {
    setSelectedCurrency(value);
  };

  const handleTransactionTypeChange = (type: "buy" | "sell") => {
    setTransactionType(type);
  };

  const selectedCurrencyData = data.Valute[selectedCurrency];

  return (
    <div className="flex justify-center items-start min-h-screen pt-10">
      <div className="p-4 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Обмен валют</h1>
        <div className="flex items-center mb-4 justify-center">
          <Button
            onClick={() => handleTransactionTypeChange("buy")}
            className={`mr-2 ${transactionType === "buy" ? "bg-gray-400 text-white" : "bg-gray-200"}`}
          >
            Я покупаю
          </Button>
          <Button
            onClick={() => handleTransactionTypeChange("sell")}
            className={`mr-2 ${transactionType === "sell" ? "bg-gray-400 text-white" : "bg-gray-200"}`}
          >
            Я продаю
          </Button>
        </div>
        <div className="flex items-center mb-4 justify-center">
          <Input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Введите сумму RUB"
            className="mr-2 w-full max-w-xs"
          />
          <Select onValueChange={handleCurrencyChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue>
                {selectedCurrency}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.keys(data.Valute).map((key) => (
                <SelectItem key={data.Valute[key].ID} value={key} className="whitespace-normal break-words">
                  {data.Valute[key].CharCode} - {data.Valute[key].Name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4 w-full min-h-[100px]">
          {amount && selectedCurrency && (
            <Result amount={amount} currency={selectedCurrencyData} type={transactionType} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;