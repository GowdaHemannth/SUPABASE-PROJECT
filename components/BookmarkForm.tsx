"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BookmarkForm({ user, onAdd }: any) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleAdd = async () => {
    if (!title || !url) return;

    const { error } = await supabase.from("bookmarks").insert({
      title,
      url,
      user_id: user.id,
    });

    // Usually Supabse Returns the thing in two Sates Like
    // data:  , errro,  so if evthing is fine erro null menas refresh the input boxes 
    // Here error Might be OF THE UserId Mismatch Something Like That

    if (!error) {
      setTitle("");
      setUrl("");
      onAdd();  // ist THE SAME THING THAT WE WERE DOING IN THE REACT STATES AFTER ADDING SOMETHING HERE TAKE UP THE OLD DTAAT 
      // IN THAT DATA ADD THIER WE WERE USING THE STATES 
    }
  };

  return (
    <div className="flex gap-3">
  <input
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  placeholder="Title"
  className="flex-1 border-2 border-black rounded-md px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition"
/>

<input
  value={url}
  onChange={(e) => setUrl(e.target.value)}
  placeholder="URL"
  className="flex-1 border-2 border-black rounded-md px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition"
/>

  <button
    onClick={handleAdd}
    className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition disabled:opacity-50"
  >
    Add
  </button>
</div>

  );
}
