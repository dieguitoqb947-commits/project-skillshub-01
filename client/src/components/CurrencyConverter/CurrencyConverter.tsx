import { useState } from 'react';
import { SUPPORTED_CURRENCIES } from '../../utils/constants';
import type { CurrencyCode } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';
import { formatMoney, toUsd } from '../../utils/localCurrency';
import './currencyConverter.css';

const CurrencyConverter = () => {
  const { currencyCode, setCurrencyCode, rates, isLoading, error } = useCurrency();
  const [amount, setAmount] = useState('');

  const parsedAmount = Number(amount);
  const rate = rates?.[currencyCode];
  const canConvert =
    amount.trim() !== '' &&
    Number.isFinite(parsedAmount) &&
    rate !== undefined &&
    rate > 0;
  const usdBudget = canConvert ? toUsd(parsedAmount, currencyCode, rate) : null;

  return (
    <section className="currency-converter" aria-labelledby="currency-converter-title">
      <h2 className="currency-converter__title" id="currency-converter-title">
        Convertidor de moneda
      </h2>
      <p className="currency-converter__hint">
        Escribe la compensación local del perfil y elige su moneda para ver el
        presupuesto en dólares.
      </p>

      <div className="currency-converter__fields">
        <label className="currency-converter__field">
          Cantidad local
          <input
            className="currency-converter__input"
            type="number"
            min="0"
            step="0.01"
            placeholder="Cantidad"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </label>

        <label className="currency-converter__field">
          Moneda
          <select
            className="currency-converter__select"
            value={currencyCode}
            onChange={(event) => setCurrencyCode(event.target.value as CurrencyCode)}
          >
            {SUPPORTED_CURRENCIES.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </label>
      </div>

      {isLoading ? <p className="currency-converter__status">Cargando tasas…</p> : null}
      {error ? (
        <p className="currency-converter__status currency-converter__status_type_error" role="alert">
          No pudimos actualizar las tasas de cambio.
        </p>
      ) : null}
      {usdBudget !== null ? (
        <p className="currency-converter__result">
          Presupuesto en dólares: <strong>{formatMoney(usdBudget, 'USD')}</strong>
        </p>
      ) : null}
    </section>
  );
};

export default CurrencyConverter;
