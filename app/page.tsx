"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };

    getUser();
  }, []);

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
    fetchBookmarks();
  };

  const handleLogout = async () => {
    // Here we are Handling the SignOut
    await supabase.auth.signOut();
    setUser(null);
  };

  /// Big Question is Why Does We use Effect Becuase here If We use like think when evr the user log are prest then fetch the dta
  // when ever the user thier call fertch
  useEffect(() => {
    if (user) fetchBookmarks();
  }, [user]);

  if (loading) return <p className="p-10">Checking session...</p>;

  if (!user)
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/image/bg.jpg')",
        }}
      >
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Bookmark Manager
          </h1>

          <p className="text-gray-600 mb-6">
            Save and manage your favorite links securely.
          </p>

          <a
            href="/login"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Login with Google
          </a>
        </div>
      </div>
    );

  return (
   <div className="min-h-screen bg-gray-100">

 
  <div className="bg-white shadow-sm">
    <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">
        Bookmark Manager
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {user.email}
        </span>

        <button
          onClick={handleLogout}
          className="px-4 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  </div>

 <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
  <BookmarkForm user={user} onAdd={fetchBookmarks} />
  <BookmarkList bookmarks={bookmarks} onDelete={deleteBookmark} />
</div>


</div>

  );
}
