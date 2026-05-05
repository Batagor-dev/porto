import { Project, Sertifikat } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

// ─── Projects ────────────────────────────────────────────────
export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${BASE_URL}/projects`, {
    next: { revalidate: 60 }, // ISR cache 60 detik
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data?.projects ?? [];
}

export async function getProject(slug: string): Promise<Project | null> {
  const res = await fetch(`${BASE_URL}/projects/${slug}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data ?? null;
}

// ─── Sertifikats ─────────────────────────────────────────────
export async function getSertifikats(): Promise<Sertifikat[]> {
  const res = await fetch(`${BASE_URL}/sertifikats`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data?.sertifikats ?? [];
}

export async function getSertifikat(slug: string): Promise<Sertifikat | null> {
  const res = await fetch(`${BASE_URL}/sertifikats/${slug}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data ?? null;
}