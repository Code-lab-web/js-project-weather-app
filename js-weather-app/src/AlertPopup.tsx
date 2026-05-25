import React from 'react';
import { useAlert } from './AlertContext';
import './AlertPopup.css';

const AlertPopup = () => {
  const { alert, hideAlert } = useAlert();
  if (!alert) return null;

  return (
    <div className={`alert-popup alert-popup--${alert.type}`} role="alertdialog" aria-modal="true">
      <div className="alert-popup__content">
        {alert.title && <h2 className="alert-popup__title">{alert.title}</h2>}
        <p className="alert-popup__message">{alert.message}</p>
        <button className="alert-popup__close" onClick={hideAlert} aria-label="Close alert">×</button>
      </div>
    </div>
  );
};

export default AlertPopup;
