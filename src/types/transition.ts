export interface Transition {
  title: string;
  name: string;
}
export interface TransitionState {
  list: Transition[];
  actived: string;
}
