"use client";

import Button from "@/components/ui/button/button";
import Title from "@/components/ui/title/title";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { URL } from "@/constants/url";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminSignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];
  
      if (!token) return;
  
      try {
        const response = await fetch(`${URL}${API_ENDPOINTS.ADMIN_DASHBOARD}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });
  
        if (response.ok) {
          router.push("/dashboard/admin");
        }
      } catch (err) {
        console.error("Token validation failed:", err);
      }
    };
  
    checkToken();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${URL}${API_ENDPOINTS.ADMIN_SIGN_IN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          throw new Error("Invalid email or password.");
        }
        throw new Error(errorData.message || "Something went wrong.");
      }

      const data = await response.json();
      document.cookie = `token=${data.token}; path=/; max-age=3600`;

      router.push("/dashboard/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[50vw]">
        <Title className="!mb-5 text-center font-bold">Admin Sign In</Title>
        <form className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              className="border border-black w-full px-4 py-2"
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
              className="border border-black w-full px-4 py-2"
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
