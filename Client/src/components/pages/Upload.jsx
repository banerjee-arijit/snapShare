import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Upload = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);

  const uploadHandler = async () => {
    if (!text.trim()) {
      setError("Text is required to upload.");
      return;
    }

    setError("");
    setLoading(true);
    setDisabled(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/create-text",
        { text },
      );

      if (response.data.passwordCode) {
        sessionStorage.setItem("passwordCode", response.data.passwordCode);
      }

      navigate("/genarate_password");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-4">
      <div className="w-72 space-y-6">
        <div className="space-y-1.5 text-center">
          <h2 className="text-xl font-semibold tracking-tight text-card-foreground">
            Upload Text or Image
          </h2>
          <p className="text-sm text-muted-foreground">
            Select a file and add a description.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Image
              <span className="text-muted-foreground ml-1 text-xs">
                (optional)
              </span>
            </label>
            <Input
              type="file"
              className="cursor-pointer text-foreground"
              accept="image/*"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Text</label>
            <Textarea
              disabled={disabled}
              placeholder="Type your text here..."
              className={`${error ? "border-red-500 focus-visible:ring-red-800 bg-red-100/50" : ""}`}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (error) setError("");
              }}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <Button
            className="w-full cursor-pointer"
            onClick={uploadHandler}
            disabled={loading}
          >
            {loading ? <Spinner className="mr-2 h-4 w-4" /> : "Upload"}
          </Button>
        </div>
      </div>
    </div>
  );
};
