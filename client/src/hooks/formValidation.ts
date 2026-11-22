import { useState } from 'react';


export const useFormValidation = () => {
    const [error, setError] = useState<string | null>(null);
  
    const validateAmount = (amount: string) => {
      if (amount.trim() === '') {
        setError('Escribe la compensación base.');
        return false;
      }
  
      if (Number(amount) <= 0) {
        setError('La cantidad debe ser mayor que 0.');
        return false;
      }
  
      setError(null);
      return true;
    };
  
    return { error, validateAmount };
  };