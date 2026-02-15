"use client";

import { supabase } from "@/lib/supabase";

export default function Login() {

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
    <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md text-center border border-white/20">

      <h1 className="text-3xl font-extrabold text-white mb-3">
        Welcome Back
      </h1>

      <p className="text-gray-300 mb-8">
        Sign in to manage your bookmarks securely.
      </p>

      <button
        onClick={handleLogin}
        className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
      >
        🔐 Login with Google
      </button>

    </div>
  </div>
);

}
