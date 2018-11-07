export interface Menu {
  title: string;
  path?: string;
  icon?: string;
  children?: Menu[];
}

export interface MenuState {
  header: Menu[];
  aside: Menu[];
  asideCollapse: boolean;
}
