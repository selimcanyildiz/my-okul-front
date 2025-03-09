import React from 'react';
import { TextField, Button } from '@mui/material';

const PhoneNumberInput = ({ phoneNumber, handlePhoneChange, handleSendCode }) => {
  return (
    <>
      <TextField
        label="Telefon Numarası"
        variant="outlined"
        fullWidth
        value={phoneNumber}
        onChange={handlePhoneChange}
        margin="normal"
        inputProps={{ maxLength: 16 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendCode}
        fullWidth
        sx={{ marginTop: 2 }}
      >
        Kod Gönder
      </Button>
    </>
  );
};

export default PhoneNumberInput;
