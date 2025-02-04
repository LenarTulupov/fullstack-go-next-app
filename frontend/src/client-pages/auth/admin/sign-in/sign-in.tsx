"use client"

import Button from "@/components/ui/button/button"
import Title from "@/components/ui/title/title"
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { URL } from "@/constants/url";
import { useState } from "react"

export default function AdminSignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${URL}${API_ENDPOINTS.ADMIN_SIGN_IN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseText = await response.text();
      console.log("Response from server:", responseText);


      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      console.log("Login successful:", data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred during login.");
      }
    
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="w-[50vw]">
        <Title className="!mb-[20px] text-center font-bold">Admin Sign In</Title>
        <form className="flex flex-col gap-y-[10px]" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              className="border border-black w-full !px-[15px] !py-[10px]"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              className="border border-black w-full !px-[15px] !py-[10px]"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}