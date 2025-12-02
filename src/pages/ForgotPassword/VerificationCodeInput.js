// VerificationCodeInput.js
import React from 'react';
import { TextField, Typography, Box } from '@mui/material';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

const VerificationCodeInput = ({ verificationCode, setVerificationCode, timer }) => {
  // 600 sn üzerinden yüzde hesaplıyoruz
  const percentage = (timer / 600) * 100;

  return (
    <>
      <TextField
        label="SMS ile Gelen Kod"
        variant="outlined"
        fullWidth
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        margin="normal"
      />

      <Typography variant="body2" sx={{ marginTop: 1 }}>
        Kod Geçerlilik Süresi:
      </Typography>
      <Box sx={{ width: 70, height: 70, marginTop: 1 }}>
        <CircularProgressbarWithChildren
          value={percentage}
          strokeWidth={5}
          styles={{
            path: {
              stroke: timer >= 300 ? 'green' : timer >= 120 ? 'orange' : 'red',
              strokeLinecap: 'round',
              transition: 'stroke 0.5s ease-in-out',
            },
            text: {
              fill: timer >= 300 ? 'green' : timer >= 120 ? 'orange' : 'red',
              fontSize: '20px',
              fontWeight: 'bold',
              transition: 'fill 0.5s ease-in-out',
            },
          }}
        >
          <div style={{ fontSize: 20, marginTop: -15 }}>
            <strong
              style={{
                color: timer >= 300 ? 'green' : timer >= 120 ? 'orange' : 'red',
                transition: 'color 0.5s ease-in-out',
              }}
            >
              {`${timer}s`}
            </strong>
          </div>
        </CircularProgressbarWithChildren>
      </Box>
    </>
  );
};

export default VerificationCodeInput;
