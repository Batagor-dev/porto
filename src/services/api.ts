// src/services/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export const getProjects = async () => {
  const res = await fetch(`${API_BASE_URL}/projects`);
  if (!res.ok) throw new Error('Gagal mengambil data project');
  return res.json();
};

export const getCertificates = async () => {
  const res = await fetch(`${API_BASE_URL}/sertifikats`);
  if (!res.ok) throw new Error('Gagal mengambil data sertifikat');
  return res.json();
};