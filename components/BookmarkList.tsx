"use client";

import { supabase } from "@/lib/supabase";

export default function BookmarkList({ bookmarks, onDelete }: any) {
  return (
   <ul className="space-y-3">
  {bookmarks.map((bookmark: any) => (
    <li
      key={bookmark.id}
      className="border border-gray-300 rounded-lg p-4 flex justify-between items-center"
    >
      <div className="flex flex-col">
        <span className="font-medium text-gray-900">
          {bookmark.title}
        </span>

        <a
          href={bookmark.url}
          target="_blank"
          className="text-sm text-blue-600 hover:underline"
        >
          {bookmark.url}
        </a>
      </div>

      <button
        onClick={() => onDelete(bookmark.id)}
        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Delete
      </button>
    </li>
  ))}
</ul>

  );
}
