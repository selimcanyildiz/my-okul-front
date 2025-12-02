// PhoneNumberInput.js
import React from 'react';
import { TextField, Button } from '@mui/material';

const PhoneNumberInput = ({ phoneNumber, handlePhoneChange, handleSendCode, loading }) => {
  return (
    <>
      <TextField
        label="TC / Kullanıcı Adı"
        variant="outlined"
        fullWidth
        value={phoneNumber}
        onChange={handlePhoneChange}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendCode}
        fullWidth
        sx={{ marginTop: 2 }}
        disabled={loading}
      >
        {loading ? 'Gönderiliyor...' : 'Kod Gönder'}
      </Button>
    </>
  );
};

export default PhoneNumberInput;
