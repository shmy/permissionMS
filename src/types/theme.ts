export interface Theme {
  title: string;
  name: string;
  backgroundImage?: string;
}
export interface ThemeState {
  list: Theme[];
  actived: string;
}
