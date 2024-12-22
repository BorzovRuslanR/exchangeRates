import { ExchangeRates } from '../types/ICurrency';

const API_URL = 'https://www.cbr-xml-daily.ru/daily_json.js';

export const fetchExchangeRates = async (): Promise<ExchangeRates> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: ExchangeRates = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    throw error;
  }
};