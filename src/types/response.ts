import { AxiosResponse } from "axios";

export interface ResponseError extends Error {
  showAlert(): void;
}
export interface BeforeResponse {
  data: any;
  code: number;
  msg: string;
}
export interface AfterResponse extends Array<any> {
  0: any;
  1: ResponseError | null;
  2: AxiosResponse;
}
