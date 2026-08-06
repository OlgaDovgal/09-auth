import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

interface NotesByTagProps {
  params: Promise<{ slug: string[] }>;
}
export async function generateMetadata({
  params,
}: NotesByTagProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];
  return {
    title: `Tag: ${tag}`,
    description: `Search by tag ${tag}`,
    openGraph: {
      title: `Tag: ${tag}`,
      description: `Search by tag ${tag}`,
      url: "https://notehub.com/",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          alt: "Notehub Meta",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
const NotesByTag = async ({ params }: NotesByTagProps) => {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes(1, "", tag),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};
export default NotesByTag;
