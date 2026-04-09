import React, { useId, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export const Copy = () => {
  const id = useId();
  const navigate = useNavigate();
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const findPasswordFromDB = async (code) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/get-content",
        {
          passwordCode: code,
        },
      );

      sessionStorage.setItem("passwordCode", code);

      setSuccess(true);
      setDisabled(true);
      setError(false);

      console.log(response.data);
    } catch (error) {
      setError(true);
      setSuccess(false);
      console.log(error);
    }
  };

  const handlePasswordVerification = (newValue) => {
    setPassword(newValue);
    setError(false);

    if (newValue.length === 4) {
      findPasswordFromDB(newValue);
    }
  };

  useEffect(() => {
    if (success) {
      navigate("/my-content");
    }
  }, [success]);

  return (
    <div className="h-screen flex justify-center items-center flex-col gap-4">
      <Label htmlFor={id}>Enter Password</Label>

      <InputOTP
        maxLength={4}
        id={id}
        password={password}
        onChange={handlePasswordVerification}
        disabled={disabled}
      >
        <InputOTPGroup>
          <InputOTPSlot
            index={0}
            aria-invalid={error}
            className={error ? "border-red-500 text-red-500" : ""}
          />
          <InputOTPSlot
            index={1}
            aria-invalid={error}
            className={error ? "border-red-500 text-red-500" : ""}
          />
          <InputOTPSlot
            index={2}
            aria-invalid={error}
            className={error ? "border-red-500 text-red-500" : ""}
          />
          <InputOTPSlot
            index={3}
            aria-invalid={error}
            className={error ? "border-red-500 text-red-500" : ""}
          />
        </InputOTPGroup>
      </InputOTP>

      <p className="text-muted-foreground text-xs">
        Enter the 4-digit Secret password to get your content.
      </p>
      {error && <p className="text-red-500 text-xs">Invalid Password</p>}
      {success && (
        <p className="text-green-500 text-xs">Getting your content...</p>
      )}
    </div>
  );
};
