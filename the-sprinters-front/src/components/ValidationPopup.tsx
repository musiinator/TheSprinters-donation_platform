import React, { useEffect, useState } from 'react';
import { Notification } from '@mantine/core';
import { useWindowDimensions } from '../hooks/use-window-dimensions.hook';

interface ValidationPopupProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

const validationPopupStyles = (isMobile: boolean) => ({
  popupStyles: {
      marginBottom: 15,
      left: "12%",
      width: '40%',
      marginLeft: '20%',
      position: 'fixed', 
      top: '14%',
      transform: 'translateY(-50%)',
  },

  isMobilePopupStyles: {
    marginBottom: 15,
    width: '80%',
    left: '50%',
    position: 'fixed',
    top: '10%',
    transform: 'translateX(-50%) translateY(-50%)', // Center horizontally and vertically
  }
});

const ValidationPopup: React.FC<ValidationPopupProps> = ({ type, message, onClose }) => {
  const isMobile = useWindowDimensions().isMobile;
  const classes = validationPopupStyles(isMobile);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [onClose]);

  return (
    <div style={isMobile ? classes.isMobilePopupStyles : classes.popupStyles }>
      <Notification
        color={type === 'success' ? 'teal' : 'red'}
        title={type === 'success' ? 'Success' : 'Something went wrong'}
        onClose={onClose}
        style={{ padding: '0 20px'}}
      >
        {message}
      </Notification>
    </div>
  );
};

export default ValidationPopup;