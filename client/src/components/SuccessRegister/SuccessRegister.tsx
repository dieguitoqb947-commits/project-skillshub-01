import { useEffect } from "react";
import "./succesRegister.css";

type SuccessRegisterProps = {
  isOpen: boolean;
  isSuccess: boolean;
  onClose: () => void;
};

export default function SuccessRegister({
  isOpen,
  isSuccess,
  onClose,
}: SuccessRegisterProps) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="success-register"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby="success-register-message"
        aria-modal="true"
        className="success-register__dialog"
        role="dialog"
      >
        <button
          aria-label="Cerrar ventana"
          className="success-register__close"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
        <div
          aria-hidden="true"
          className={`success-register__icon ${
            isSuccess ? "success-register__icon_success" : "success-register__icon_error"
          }`}
        >
          {isSuccess ? (
            <svg viewBox="0 0 48 48" fill="none">
              <path d="m10 24 9 9L38 14" />
            </svg>
          ) : (
            <svg viewBox="0 0 48 48" fill="none">
              <path d="m13 13 22 22M35 13 13 35" />
            </svg>
          )}
        </div>
        <p className="success-register__message" id="success-register-message">
          {isSuccess
            ? "¡Correcto! Ya estás registrado."
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </p>
      </section>
    </div>
  );
}