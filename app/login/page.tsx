"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
  e.preventDefault();

  const res = await fetch("/api/admin-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (res.ok) {
    localStorage.setItem("admin", "true");
    router.push("/admin/projects");
  } else {
    alert("Login gagal");
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleLogin}
        className="bg-[#111122] p-8 rounded-xl space-y-4 w-80"
      >
        <h2 className="text-2xl font-bold text-center">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-black border border-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-black border border-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-purple-600 py-2 rounded hover:bg-purple-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
