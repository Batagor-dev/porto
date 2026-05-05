export interface Project {
  id: number;
  slug: string;
  name_project_id: string;
  name_project_en: string;
  image: string;
  type: string;
  technology: string[] | null;
  link_demo: string | null;
  link_github?: string | null;
  deskripsi_id: string;
  deskripsi_en: string;
  created_at: string;
  updated_at: string;
}

export interface Sertifikat {
  id: number;
  slug: string;
  name_sertifikat_id: string;
  name_sertifikat_en: string;
  image: string;
  published_at: string;
  deskripsi_id: string;
  deskripsi_en: string;
  created_at: string;
  updated_at: string;
}