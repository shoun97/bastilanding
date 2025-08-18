import axios, { AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.API_BASE_URL ||
    "https://api.blandskron.com/api",
  timeout: 15000,
});

export function setAuthToken(token?: string) {
  if (!token) {
    delete api.defaults.headers.common["Authorization"];
    return;
  }
  api.defaults.headers.common["Authorization"] =
    token.startsWith("Bearer ") ? token : `Bearer ${token}`;
}

type Query = Record<string, string | number | boolean | null | undefined>;

const clean = (q?: Query) =>
  q ? Object.fromEntries(Object.entries(q).filter(([, v]) => v != null)) : q;

const normalize = (p: string) => {
  const withSlash = p.startsWith("/") ? p : `/${p}`;
  return withSlash.replace(/^\/api\/?/, "/");
};

export async function get<T = unknown>(
  path: string,
  query?: Query,
  config?: AxiosRequestConfig
): Promise<T> {
  const { data } = await api.get<T>(normalize(path), {
    params: clean(query),
    ...(config || {}),
  });
  return data;
}


export type Cv = unknown;
export const getCv = (query?: Query, config?: AxiosRequestConfig) =>
  get<Cv>("/cv/", query, config);

export type Education = unknown;
export const getEducation = (query?: Query, config?: AxiosRequestConfig) =>
  get<Education[]>("/education/", query, config);

export type GalleryItem = unknown;
export const getGallery = (query?: Query, config?: AxiosRequestConfig) =>
  get<GalleryItem[]>("/gallery/", query, config);


export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type JobGalleryItem = {
  id: number;
  title: string;
  width: number;
  high: number;       
  url: string;
  section: string;
  type: string;
  job: number;
};

export type Job = {
  title: string;
  description: string;
  gallery: JobGalleryItem[];
  date_start: string;   
  date_finish: string;  
  img_portada: string;  
  tecnologias: string; 
}

export type JobsQuery = {
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
  [k: string]: any;
};

export const getJobs = (
  query?: JobsQuery,
  config?: AxiosRequestConfig
) => get<Paginated<Job>>("/jobs/", query, config);

/** Conveniencia: solo el array `results` */
export const listJobs = async (
  query?: JobsQuery,
  config?: AxiosRequestConfig
) => {
  const page = await getJobs(query, config);
  console.log({page})
  return page.results;
};

/* ------------------------------------------------------- */

export type Schema = unknown;
export const getSchema = (query?: Query, config?: AxiosRequestConfig) =>
  get<Schema>("/schema/", query, config);

export type Service = unknown;
export const getServices = (query?: Query, config?: AxiosRequestConfig) =>
  get<Service[]>("/services/", query, config);

export type SocialNetwork = unknown;
export const getSocialNetwork = (query?: Query, config?: AxiosRequestConfig) =>
  get<SocialNetwork[]>("/social-network/", query, config);
