import { supabase, getStorageImageUrl } from '@/lib/supabase';
import { Project } from '@/types';

// Helper untuk normalisasi technology menjadi string array
function parseTechnology(tech: any): string[] {
  if (Array.isArray(tech)) return tech;
  if (typeof tech === 'string') {
    try {
      const parsed = JSON.parse(tech);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // Jika comma-separated: "Next.js, Laravel"
      return tech.split(',').map((t) => t.trim()).filter(Boolean);
    }
  }
  return [];
}

// Helper untuk memformat raw project data dari Supabase
function formatProject(raw: any, images: any[] = []): Project {
  // Ambil list gambar dari project_images atau relasi join
  const rawImages = images.length > 0 ? images : (raw.project_images || []);
  
  const relatedImages = rawImages
    .filter((img: any) => Number(img.projects_id) === Number(raw.id))
    .map((img: any) => getStorageImageUrl(img.image, raw.slug))
    .filter(Boolean);

  // Jika tidak ada di project_images, gunakan konvensi Supabase Storage: projects/{slug}/1.jpg
  const defaultStorageImage = getStorageImageUrl(`projects/${raw.slug}/1.jpg`);
  const primaryImage = relatedImages.length > 0 ? relatedImages[0] : defaultStorageImage;

  return {
    id: raw.id,
    slug: raw.slug,
    name_project_id: raw.name_project_id || '',
    name_project_en: raw.name_project_en || raw.name_project_id || '',
    image: primaryImage,
    images: relatedImages.length > 0 ? relatedImages : [primaryImage],
    technology: parseTechnology(raw.technology),
    link_demo: raw.link_demo || null,
    link_github: raw.link_github || null,
    deskripsi_id: raw.deskripsi_id || '',
    deskripsi_en: raw.deskripsi_en || raw.deskripsi_id || '',
    type: raw.type || 'Web Application',
    created_at: raw.created_at,
    updated_at: raw.updated_at,
  };
}

/**
 * Mengambil semua project langsung dari Supabase (database & storage)
 */
export async function getProjects(): Promise<Project[]> {
  try {
    // 1. Query tabel projects dengan relasi project_images
    let { data, error } = await supabase
      .from('projects')
      .select('*, project_images(*)')
      .order('id', { ascending: true });

    // Fallback jika menggunakan nama tabel singular
    if (error && error.code === 'PGRST205') {
      const singularRes = await supabase
        .from('project')
        .select('*, project_image(*)')
        .order('id', { ascending: true });
      data = singularRes.data;
      error = singularRes.error;
    }

    if (error) {
      console.error('Error fetching projects from Supabase:', error.message);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    // 2. Format data dan generate Supabase Storage URL
    return data.map((p: any) => {
      const images = p.project_images || p.project_image || [];
      return formatProject(p, images);
    });
  } catch (err) {
    console.error('Error in getProjects:', err);
    return [];
  }
}

/**
 * Mengambil satu project berdasarkan slug langsung dari Supabase
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    let { data, error } = await supabase
      .from('projects')
      .select('*, project_images(*)')
      .eq('slug', slug)
      .single();

    if (error && error.code === 'PGRST205') {
      const singularRes = await supabase
        .from('project')
        .select('*, project_image(*)')
        .eq('slug', slug)
        .single();
      data = singularRes.data;
      error = singularRes.error;
    }

    if (error || !data) {
      console.error(`Project not found for slug ${slug}:`, error?.message);
      return null;
    }

    const images = data.project_images || data.project_image || [];
    return formatProject(data, images);
  } catch (err) {
    console.error(`Error in getProjectBySlug (${slug}):`, err);
    return null;
  }
}
