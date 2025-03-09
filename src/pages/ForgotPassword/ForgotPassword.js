import React, { useState, useEffect } from 'react';
import { Typography, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PhoneNumberInput from './PhoneNumberInput';
import VerificationCodeInput from './VerificationCodeInput';
import NewPasswordInput from './NewPasswordInput';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState('0 5');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(10);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [isPhoneInputActive, setIsPhoneInputActive] = useState(true);

  useEffect(() => {
    let interval;
    if (timer > 0 && isCodeSent && !isCodeVerified) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && !isCodeVerified) {
      clearInterval(interval);
      setMessage('Kod süresi doldu. Lütfen tekrar telefon numarasını girin.');
      setIsCodeSent(false);
      setVerificationCode('');
      setTimer(10);
      setIsPhoneInputActive(true); // Numara tekrar girilebilsin
      setPhoneNumber('0 5'); // Numara sıfırlanıyor
    }
    return () => clearInterval(interval);
  }, [timer, isCodeSent, isCodeVerified]);
  
  

  const handleSendCode = () => {
    if (!phoneNumber) {
      setMessage('Lütfen geçerli bir telefon numarası girin.');
    } else {
      setMessage('Kod gönderildi. Lütfen gelen kodu girin.');
      setIsCodeSent(true);
      setIsPhoneInputActive(false);
    }
  };

  const handleVerifyCode = () => {
    if (verificationCode === '123456') {
      setIsCodeVerified(true);
      setMessage('Kod doğrulandı. Lütfen yeni şifrenizi girin.');
    } else {
      setMessage('Geçersiz kod. Lütfen tekrar deneyin.');
    }
  };

  const handleSubmitNewPassword = () => {
    if (newPassword && newPassword === confirmPassword) {
      setMessage('Şifreniz başarıyla değiştirildi, yönlendiriliyorsunuz...');
      setTimeout(() => {
        navigate("/giris");
      }, 1000);
    } else {
      setMessage('Şifreler uyuşmuyor veya geçersiz.');
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Sadece sayıları kabul et
    if (value.length <= 4) {
      value = `0 5${value.slice(2)}`; // Başlangıçta 0 ve 5 sabit olacak
    } else if (value.length <= 7) {
      value = `0 5${value.slice(2, 4)} ${value.slice(4)} `; // İlk 3 haneli grup sabit 534
    } else if (value.length < 10) {
      value = `0 5${value.slice(2, 4)} ${value.slice(4, 7)} ${value.slice(7)} `; // İkinci grup sabit
    } else {
      value = `0 5${value.slice(2, 4)} ${value.slice(4, 7)} ${value.slice(7, 9)} ${value.slice(9, 11)} `; // Son grup
    }
    setPhoneNumber(value);
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
        <Typography variant="h6" gutterBottom>
          Şifremi Unuttum
        </Typography>

        {/* Telefon Numarası */}
        {isPhoneInputActive && !isCodeSent && (
          <PhoneNumberInput
            phoneNumber={phoneNumber}
            handlePhoneChange={handlePhoneChange}
            handleSendCode={handleSendCode}
          />
        )}

        {/* Kod Doğrulama */}
        {isCodeSent && !isCodeVerified && (
          <VerificationCodeInput
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            handleVerifyCode={handleVerifyCode}
            timer={timer}
          />
        )}

        {/* Yeni Şifre ve Onay */}
        {isCodeVerified && (
          <NewPasswordInput
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            setNewPassword={setNewPassword}
            setConfirmPassword={setConfirmPassword}
            handleSubmitNewPassword={handleSubmitNewPassword}
          />
        )}

        {/* Mesaj */}
        {message && (
          <Typography variant="body2" color={message.includes('başarıyla') ? 'success.main' : 'error.main'} sx={{ marginTop: 2 }}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ForgotPassword;
