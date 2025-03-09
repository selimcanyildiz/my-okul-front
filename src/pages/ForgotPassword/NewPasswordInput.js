import React from 'react';
import { TextField, Button } from '@mui/material';

const NewPasswordInput = ({ newPassword, confirmPassword, setNewPassword, setConfirmPassword, handleSubmitNewPassword }) => {
  return (
    <>
      <TextField
        label="Yeni Şifre"
        type="password"
        variant="outlined"
        fullWidth
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Yeni Şifre Onayı"
        type="password"
        variant="outlined"
        fullWidth
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmitNewPassword}
        fullWidth
        sx={{ marginTop: 2 }}
      >
        Şifreyi Değiştir
      </Button>
    </>
  );
};

export default NewPasswordInput;
