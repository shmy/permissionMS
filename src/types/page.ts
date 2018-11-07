interface Dictionary<T> { [key: string]: T; }
interface Meta {
  pool: boolean;
  title: string;
  cache: boolean;
  requiresAuth: boolean;
}
export interface Page {
  name: string;
  query: Dictionary<string>;
  params: Dictionary<string>;
  meta: Meta;
}
export interface PageState {
  pool: Page[];
  keepAlive: string[];
  current: string;
}
