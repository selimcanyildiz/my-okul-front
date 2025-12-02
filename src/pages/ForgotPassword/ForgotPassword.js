// ForgotPassword.js
import React, { useState, useEffect } from "react";
import { Typography, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

import PhoneNumberInput from "./PhoneNumberInput"; // username için kullanıyoruz
import VerificationCodeInput from "./VerificationCodeInput";
import NewPasswordInput from "./NewPasswordInput";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL; // 👈 Login sayfasıyla aynı

  // username = öğrenci kullanıcı adı (TC)
  const [username, setUsername] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(600); // 600 sn = 10 dk
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Kod süresi sayacı
  useEffect(() => {
    let interval;
    if (isCodeSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCodeSent, timer]);

  // 1) KOD GÖNDER
  const handleSendCode = async () => {
    const cleanUsername = username.trim();

    if (!cleanUsername) {
      setMessage("Lütfen TC / kullanıcı adınızı girin.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(`${apiUrl}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: cleanUsername }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Kod gönderilirken bir hata oluştu.");
      }

      setIsCodeSent(true);
      setTimer(600); // 10 dk
      setMessage("Şifre yenileme kodu kayıtlı veli telefonuna gönderildi.");
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Kod gönderilirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  // 2) ŞİFREYİ GERÇEKTEN DEĞİŞTİR (kod + yeni şifre)
  const handleSubmitNewPassword = async () => {
    const cleanUsername = username.trim();

    if (!verificationCode) {
      setMessage("Lütfen SMS ile gelen kodu girin.");
      return;
    }

    if (!newPassword || newPassword.length < 4) {
      setMessage("Yeni şifre en az 4 karakter olmalı.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Şifreler uyuşmuyor.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(`${apiUrl}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: cleanUsername,
          code: verificationCode,
          new_password: newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Şifre değiştirilirken bir hata oluştu.");
      }

      setMessage("Şifreniz başarıyla değiştirildi, yönlendiriliyorsunuz...");
      setTimeout(() => {
        navigate("/giris");
      }, 1500);
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Şifre değiştirilirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  // Username (TC / kullanıcı adı) input değişimi
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Şifremi Unuttum
        </Typography>

        {/* 1. Adım: Kullanıcı adı / TC girme */}
        {!isCodeSent && (
          <PhoneNumberInput
            phoneNumber={username}
            handlePhoneChange={handleUsernameChange}
            handleSendCode={handleSendCode}
            loading={loading}
          />
        )}

        {/* 2. Adım: Kod + yeni şifre */}
        {isCodeSent && (
          <>
            <VerificationCodeInput
              verificationCode={verificationCode}
              setVerificationCode={setVerificationCode}
              timer={timer}
            />

            <NewPasswordInput
              newPassword={newPassword}
              confirmPassword={confirmPassword}
              setNewPassword={setNewPassword}
              setConfirmPassword={setConfirmPassword}
              handleSubmitNewPassword={handleSubmitNewPassword}
              loading={loading}
            />
          </>
        )}

        {/* Mesaj */}
        {message && (
          <Typography
            variant="body2"
            color={
              message.toLowerCase().includes("başarıyla")
                ? "success.main"
                : "error.main"
            }
            sx={{ marginTop: 2, textAlign: "center" }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ForgotPassword;
