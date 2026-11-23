import { useState, type SubmitEvent } from 'react';
import { SUPPORTED_CURRENCIES } from '../../utils/constants';
import type { CurrencyCode } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';
import { useFormValidation } from '../../hooks/formValidation';
import './currencyConverter.css';

const CurrencyConverter = () => {
  const { currencyCode, setCurrencyCode, rates, quotes, isLoading, error } = useCurrency();
  const [amount, setAmount] = useState('');
  const [submittedAmount, setSubmittedAmount] = useState<number | null>(null);
  const { error: amountError, validateAmount } = useFormValidation();

  const rate = rates?.[currencyCode];
  const usdBudget =
    submittedAmount !== null && rate !== undefined && rate > 0
      ? currencyCode === 'USD'
        ? submittedAmount
        : submittedAmount / rate
      : null;

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateAmount(amount)) {
      setSubmittedAmount(null);
      return;
    }

    setSubmittedAmount(Number(amount));
  };

  return (
    <section className="currency-converter" aria-labelledby="currency-converter-title">
      <h2 className="currency-converter__title" id="currency-converter-title">
        Convertidor de moneda
      </h2>
      <p className="currency-converter__hint">
        Escribe la compensación local del perfil y elige su moneda para ver el
        presupuesto en dólares.
      </p>
    <form className="currency-converter__form" onSubmit={handleSubmit}>
      <ul className="currency-converter__fields">
      <li className="currency-converter__item">
        <label className="currency-converter__field">
          Selecciona la moneda origen
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
        </li>

      
      <li className="currency-converter__item">
        <label className="currency-converter__field">
          Compensación base
          <input
            className="currency-converter__input"
            type="text"
            inputMode="numeric"
            placeholder="Cantidad"
            value={amount}
            onChange={(event) => setAmount(event.target.value.replace(/\D/g, ''))}
            required
          />
        </label>
        {amountError ? (
          <p className="currency-converter__status currency-converter__status_type_error" role="alert">
            {amountError}
          </p>
        ) : null}
        </li>
        
      </ul>

      {isLoading ? <p className="currency-converter__status">Cargando tasas…</p> : null}
      {error ? (
        <p className="currency-converter__status currency-converter__status_type_error" role="alert">
          No pudimos actualizar las tasas de cambio.
        </p>
      ) : null}
      <button type="submit" className="currency-converter__button">Calcular presupuesto</button>
      {usdBudget !== null ? (
        <p className="currency-converter__result">
          Presupuesto en dólares:{' '}
          <strong>
            {new Intl.NumberFormat('es', {
              style: 'currency',
              currency: 'USD',
              currencyDisplay: 'code',
              maximumFractionDigits: 2,
            }).format(usdBudget)}
          </strong>
        </p>
      ) : null}
    </form>
    <ul className="currency-converter__quotes">
      {quotes.map((quote) => (
        <li key={quote.quote} className="currency-converter__quote">
          1 {quote.base} = {quote.rate} {quote.quote} · {quote.date}
        </li>
      ))}
    </ul>
    </section>
  );
};

export default CurrencyConverter;
