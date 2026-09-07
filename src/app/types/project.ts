export interface ProjectImage {
  id?: number;
  projects_id: number;
  image: string;
}

export interface Project {
  id: number;
  slug: string;
  name_project_id: string;
  name_project_en: string;
  image: string;
  images?: string[];
  type?: string;
  technology: string[];
  link_demo: string | null;
  link_github?: string | null;
  deskripsi_id: string;
  deskripsi_en: string;
  created_at?: string;
  updated_at?: string;
}