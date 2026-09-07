import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://bwwpcsloeohvkhqlmrzd.supabase.co';

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'sb_publishable_3oBssMn-gHhT8FtVzzOZBw_ok7AL9tH';

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Mendapatkan Public URL dari Supabase Storage di bucket 'porto'
 * Menerima format:
 * - "projects/armada-kita/1.jpg"
 * - "porto/projects/armada-kita/1.jpg"
 * - "1.jpg" (jika projectSlug disediakan -> "projects/{slug}/1.jpg")
 * - URL lengkap (http://... atau https://...)
 */
export function getStorageImageUrl(
  imagePath: string | null | undefined,
  projectSlug?: string
): string {
  if (!imagePath) return '';

  // Jika sudah merupakan URL lengkap
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Jika path lokal seperti /assets/...
  if (imagePath.startsWith('/assets/')) {
    return imagePath;
  }

  let cleanPath = imagePath.replace(/^\/+/, '');

  // Jika menyertakan nama bucket 'porto/' di depan
  if (cleanPath.startsWith('porto/')) {
    cleanPath = cleanPath.replace(/^porto\//, '');
  }

  // Jika hanya nama file (misal "1.jpg") dan memiliki projectSlug
  if (!cleanPath.includes('/') && projectSlug) {
    cleanPath = `projects/${projectSlug}/${cleanPath}`;
  }

  const { data } = supabase.storage.from('porto').getPublicUrl(cleanPath);
  return data.publicUrl;
}
