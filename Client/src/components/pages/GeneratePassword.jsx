import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import axios from "axios";

export const GeneratePassword = () => {
  const [password, setPassword] = useState();
  const [passowrdExpire, setPassowrdExpire] = useState(150);

  useEffect(() => {
    const password = sessionStorage.getItem("passwordCode");
    setPassword(password);
    setInterval(() => {
      setPassowrdExpire((prev) => prev - 1);
    }, 1000);
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <Label htmlFor="otp">Your Secret Password</Label>
      <InputOTP maxLength={4} value={password}>
        <InputOTPGroup>
          <InputOTPSlot index={0} value="1" />
          <InputOTPSlot index={1} value="2" />
          <InputOTPSlot index={2} value="3" />
          <InputOTPSlot index={3} value="4" />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-muted-foreground text-sm">
        Share this password to your friend.
      </p>
      <p className="text-xs text-muted-foreground">
        Password expiring in{" "}
        <span className="text-red-500 font-semibold">{passowrdExpire}sec</span>
      </p>
    </div>
  );
};
