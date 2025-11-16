// src/app/dashboard/page.tsx

import { InfoIcon, UserCircle, Download } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import Link from "next/link";

// Helper function to safely format dates
function formatDate(value?: string | null) {
  return value ? new Date(value).toLocaleString() : "N/A";
}

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: transcripts, error } = await supabase
    .from("transcripts")
    .select("id, video_title, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching transcripts:", error.message);
  }

  return (
    <>
      {/* Navbar removed here - use global navbar from layout */}
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="bg-secondary/50 text-sm p-3 px-4 rounded-lg text-muted-foreground flex gap-2 items-center">
              <InfoIcon size="14" />
              <span>This page is only visible to authenticated users.</span>
            </div>
          </header>

          {/* User Profile Section */}
          <section className="bg-white rounded-xl p-6 border shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <UserCircle size={48} className="text-primary" />
              <div>
                <h2 className="font-semibold text-xl">User Profile</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="bg-gray-50 p-4 rounded-lg border">
                <span className="font-medium">Email</span>
                <p className="text-gray-800">{user.email}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border">
                <span className="font-medium">Signed Up</span>
                <p className="text-gray-800">{formatDate(user.created_at)}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border">
                <span className="font-medium">Last Sign In</span>
                <p className="text-gray-800">{formatDate(user.last_sign_in_at)}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border">
                <span className="font-medium">Last Updated</span>
                <p className="text-gray-800">{formatDate(user.updated_at)}</p>
              </div>
            </div>
          </section>

          {/* Transcript History Section */}
          <section className="bg-white rounded-xl p-6 border shadow-sm">
            <h2 className="font-semibold text-2xl mb-4">Your Transcripts</h2>

            {transcripts && transcripts.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b p-2">Title</th>
                    <th className="border-b p-2">Created At</th>
                    <th className="border-b p-2">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {transcripts.map(({ id, video_title, created_at }) => (
                    <tr key={id} className="hover:bg-gray-50">
                      <td className="border-b p-2">{video_title || "Untitled"}</td>
                      <td className="border-b p-2">{formatDate(created_at)}</td>
                      <td className="border-b p-2">
                        {["txt", "json", "srt", "vtt", "csv", "md"].map((format) => (
                          <Link
                            key={format}
                            href={`/api/transcripts/download?id=${id}&format=${format}`}
                            className="inline-flex items-center gap-1 mr-2 text-green-600 hover:underline"
                            target="_blank"
                          >
                            <Download size={14} /> {format.toUpperCase()}
                          </Link>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-muted-foreground">No transcripts found.</p>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
