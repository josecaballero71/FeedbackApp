import React, { useState, useEffect } from 'react';
import images from '../../utils/images/images';
import './StatusBar.css';

export default function StatusBar({ center, excellent, good, poor, excellentReason, poorReason }) {
  const total = excellent + good + poor;

  const [generalBackgroundColor, setGeneralBackgroundColor] = useState('');
  const [reasonBackgroundColor, setReasonBackgroundColor] = useState('');
  const [titleColor, setTitleColor] = useState('');
  const [reasonColor, setReasonColor] = useState('');
  const [excellentColor, setExcellentColor] = useState('');
  const [poorColor, setPoorColor] = useState('');

  useEffect(() => {
    if (poor / total * 100 >= 10) {
      setGeneralBackgroundColor('var(--str-negative)');
      setTitleColor('var(--negative-bg)');

      setReasonBackgroundColor('var(--negative)');
      setReasonColor('var(--str-negative)');
    } else {
      setGeneralBackgroundColor('var(--primary)');
      setTitleColor('var(--highlight)');

      setReasonBackgroundColor('var(--highlight)');
      setReasonColor('var(--primary)');
    }
  }, [excellent, poor, total]);

  useEffect(() => {
    if (excellentReason === null) {
      setExcellentColor(generalBackgroundColor)
    }

    if (excellentReason !== null) {
      setExcellentColor('var(--text-color)');
    }

    if (poorReason === null) {
      setPoorColor(generalBackgroundColor);
    }

    if (poorReason !== null) {
      setPoorColor('var(--text-color)');
    }
  }, [excellentReason, poorReason, generalBackgroundColor]);

  const formatPercentage = (value) => {
    if (value === null) {
      return '.';
    }
    return ((value / total) * 100).toFixed(0) + '%';
  };

  const formatValue = (value) => {
    if (value === null) {
      return '.';
    }
    return value;
  };

  return (
    <div className="status-bar" style={{ backgroundColor: generalBackgroundColor }}>
      <div className="status-center-container">
        <h2 style={{ color: titleColor }}>{center}</h2>
      </div>

      <div className="status-performance-container">
        <div className="img-data-status">
          <img src={images.excellent} alt="" />
          <p>{formatValue(excellent)}</p>
        </div>

        <div className="img-data-status">
          <img src={images.fair} alt="" />
          <p>{formatValue(good)}</p>
        </div>

        <div className="img-data-status">
          <img src={images.poor} alt="" />
          <p>{formatValue(poor)}</p>
        </div>
      </div>

      <div className="status-quantity-container">
        <div className="img-data-status">
          <img src={images.excellent} alt="" />
          <p>{formatPercentage(excellent)}</p>
        </div>

        <div className="img-data-status">
          <img src={images.fair} alt="" />
          <p>{formatPercentage(good)}</p>
        </div>

        <div className="img-data-status">
          <img src={images.poor} alt="" />
          <p>{formatPercentage(poor)}</p>
        </div>
      </div>

      <div className="status-reason-container">
        <div className="img-data-status">
          <img src={images.excellent} alt="" />
          <p style={{ color: excellentColor }}>
            {formatValue(excellentReason)}
          </p>
        </div>

        <div className="img-data-status">
          <img src={images.poor} alt="" />
          <p style={{ color: poorColor }}>
            {formatValue(poorReason)}
          </p>
        </div>
      </div>

      <div className="status-detail-container">
        <button style={{ color: reasonColor, backgroundColor: reasonBackgroundColor }}>+</button>
      </div>
    </div>
  );
}