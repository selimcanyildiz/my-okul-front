import React from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

const VerificationCodeInput = ({ verificationCode, setVerificationCode, handleVerifyCode, timer }) => {
  return (
    <>
      <TextField
        label="Doğrulama Kodu"
        variant="outlined"
        fullWidth
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleVerifyCode}
        fullWidth
        sx={{ marginTop: 2 }}
      >
        Kodu Doğrula
      </Button>
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        Kalan Süre:
      </Typography>
      <Box sx={{ width: 70, height: 70, marginTop: 1 }}>
        <CircularProgressbarWithChildren
          value={(timer / 120) * 100}
          strokeWidth={5}
          styles={{
            path: {
              stroke: timer >= 6 ? 'green' : timer >= 3 ? 'yellow' : 'red',
              strokeLinecap: 'round',
              transition: 'stroke 0.5s ease-in-out', // Renk geçişi için transition eklendi
            },
            text: {
              fill: timer >= 60 ? 'green' : timer >= 30 ? 'yellow' : 'red',
              fontSize: '20px',
              fontWeight: 'bold',
              transition: 'fill 0.5s ease-in-out', // Renk geçişi için transition eklendi
            },
          }}
        >
          <div style={{ fontSize: 20, marginTop: -15 }}>
            <strong
              style={{
                color: timer >= 6 ? 'green' : timer >= 3 ? 'yellow' : 'red',
                transition: 'color 0.5s ease-in-out',  // Burada renk geçişine animasyon ekliyoruz
              }}
            >
              {`${timer} s`}
            </strong>
          </div>
        </CircularProgressbarWithChildren>
      </Box>
    </>
  );
};

export default VerificationCodeInput;
