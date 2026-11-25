import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useCurrentUser } from '../../context/CurrentUserContext';
import { AuthApiError, getOffers, deleteOffer } from '../../utils/api';
import type { Offer } from '../../types';
import './ofertas.css';

const usd = new Intl.NumberFormat('es', {
  style: 'currency',
  currency: 'USD',
  currencyDisplay: 'code',
  maximumFractionDigits: 2,
});



const Ofertas = () => {

    const { currentUser, isLoading } = useCurrentUser();
    const [ offers, setOffers ] = useState<Offer[]>([]);
    const [ offersLoading, setOffersLoading ] = useState(false);
    const [ error, setError ] = useState<string | null>(null);
    const [ deletedOfferId, setDeletedOfferId ] = useState<string | null>(null);
    const [ offerToDelete, setOfferToDelete ] = useState<Offer | null>(null);


    useEffect(() => {
        if(!currentUser) return;

        let isCancelled = false;
        setOffersLoading(true);

        const loadOffers = async () => {
            try {
              const data = await getOffers(currentUser.token);
              if (!isCancelled) setOffers(data);
            } catch (err) {
              if (!isCancelled) {
                setError(err instanceof AuthApiError ? err.message : 'No se pudieron cargar las ofertas.');
              }
            } finally {
              if (!isCancelled) setOffersLoading(false);
            }
          };

          void loadOffers();
          return () => {
            isCancelled = true;
          }
}, [currentUser]);

    useEffect(() => {
      if (!offerToDelete) return;

      function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape' && !deletedOfferId) setOfferToDelete(null);
      }

      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = previousOverflow;
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [offerToDelete, deletedOfferId]);


    const handleDelete =  async (offerId: string ) => {
        if(!currentUser  || deletedOfferId) return;

        setDeletedOfferId(offerId);
        setError(null);

        try {
            await deleteOffer(currentUser.token, offerId);
            setOffers((current) => current.filter((offer) => offer._id !== offerId));
            setOfferToDelete(null);
        } catch (err) {
            setError(err instanceof AuthApiError ? err.message : 'No se pudo eliminar la oferta.');
            setOfferToDelete(null);
        } finally {
            setDeletedOfferId(null);
        }
    }

if (isLoading) {
  return (
    <section className="ofertas">
      <p className="ofertas__status">Cargando...</p>
    </section>
  );
}
if (!currentUser) return <Navigate to="/" replace />;

  return (
    <section className="ofertas">
      <header className="ofertas__intro">
        <h1 className="ofertas__title">Mis ofertas</h1>
        <p className="ofertas__lead">
          Estas son las propuestas que enviaste. Puedes eliminarlas cuando quieras.
        </p>
      </header>
      {offersLoading ? <p className="ofertas__status">Cargando ofertas...</p> : null}
      {error ? (
        <p className="ofertas__error" role="alert">
          {error}
        </p>
      ) : null}
      {!offersLoading && !error && offers.length === 0 ? (
        <p className="ofertas__empty">Aún no has enviado ofertas.</p>
      ) : null}
      <ul className="ofertas__list">
        {offers.map((offer) => (
          <li className="ofertas__card" key={offer._id}>
            <div className="ofertas__body">
              <h2 className="ofertas__name">{offer.talentName}</h2>
              <p className="ofertas__amount">
                <span className="ofertas__label">Tu oferta</span>
                <strong>{usd.format(offer.offeredAmountUsd)}</strong>
              </p>
              <p className="ofertas__floor">Base {usd.format(offer.floorUsd)}</p>
            </div>
            <button
              className="ofertas__delete"
              type="button"
              onClick={() => setOfferToDelete(offer)}
              disabled={deletedOfferId === offer._id}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      {offerToDelete ? (
        <div
          className="ofertas__confirm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !deletedOfferId) {
              setOfferToDelete(null);
            }
          }}
        >
          <section
            aria-labelledby="ofertas-confirm-title"
            aria-modal="true"
            className="ofertas__confirm-dialog"
            role="dialog"
          >
            <h2 className="ofertas__confirm-title" id="ofertas-confirm-title">
              ¿Seguro que quieres eliminar esta oferta?
            </h2>
            <p className="ofertas__confirm-text">
              Se eliminará la propuesta para {offerToDelete.talentName} de{' '}
              {usd.format(offerToDelete.offeredAmountUsd)}.
            </p>
            <div className="ofertas__confirm-actions">
              <button
                className="ofertas__confirm-cancel"
                type="button"
                onClick={() => setOfferToDelete(null)}
                disabled={deletedOfferId === offerToDelete._id}
              >
                Cancelar
              </button>
              <button
                className="ofertas__confirm-accept"
                type="button"
                onClick={() => handleDelete(offerToDelete._id)}
                disabled={deletedOfferId === offerToDelete._id}
              >
                {deletedOfferId === offerToDelete._id ? 'Eliminando...' : 'Sí, eliminar'}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </section>
  );
};
export default Ofertas;