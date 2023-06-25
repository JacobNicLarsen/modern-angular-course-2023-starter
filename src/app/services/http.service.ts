import { Injectable } from '@angular/core';
import {
  EndPointsKeys,
  MemeEndPointsKeys,
  api,
  api2,
} from '../configs/axios.configs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  async get<T>(endpoint: EndPointsKeys) {
    return await api.get<T>(`${endpoint}?_start=0&_limit=10`);
  }
  async delete<T>(endpoint: EndPointsKeys, id: number) {
    return api.delete<T>(`${endpoint}/${id}`);
  }
  async post<T>(endpoint: EndPointsKeys, data: any) {
    return await api.post<T>(`${endpoint}?_start=0&_limit=10`, data);
  }
  async put<ResponseT, BodyT>(
    endpoint: EndPointsKeys,
    id: number,
    data: BodyT
  ) {
    return api.put<ResponseT>(`${endpoint}/${id}`, data);
  }

  async getMemes<T>(endpoint: MemeEndPointsKeys) {
    return await api2.get<T>(`${endpoint}`);
  }
}
