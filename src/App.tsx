import { useEffect, useState } from "react";
import "./App.css";
import { ExchangeRates } from "./types/ICurrency";
import { fetchExchangeRates } from "./api/currencyApi";
import MainPage from "./components/MainPage/MainPage";

function App() {
  const [data, setData] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchExchangeRates();
        setData(result);
      } catch (error) {
        console.error("При загрузке данных произошла ошибка", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>При загрузке данных произошла ошибка, попробуйте чуть позже.</div>;
  }

  return <MainPage data={data} />;
}

export default App;
