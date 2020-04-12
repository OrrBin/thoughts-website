import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserIndex, User } from '../objects/user';
import { SnapshotIndex } from '../objects/snapshot';
import { Feelings } from '../objects/feelings';
import { Pose } from '../objects/pose';
import { ColorImage } from '../objects/color_image';
import { DepthImage } from '../objects/depth_image';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root',
})
export class ThoughtsService {
  constructor(private httpClient: HttpClient, private env: EnvService) {}

  getUsers(): Observable<UserIndex[]> {
    return this.httpClient.get<UserIndex[]>(`${this.env.apiUrl}/users`);
  }

  getUser(userId: number):  Observable<User> {
    return this.httpClient.get<User>(`${this.env.apiUrl}/users/${userId}`);
  }

  getSnapshots(userId: number): Observable<SnapshotIndex[]> {
    return this.httpClient.get<SnapshotIndex[]>(`${this.env.apiUrl}/users/${userId}/snapshots`);
  }

  getSnapshot(userId: number, snapshotId: string): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.env.apiUrl}/users/${userId}/snapshots/${snapshotId}`);
  }

  getNextSnapshot(userId: number, snapshotId: string): Observable<SnapshotIndex> {
    return this.httpClient.get<SnapshotIndex>(`${this.env.apiUrl}/users/${userId}/snapshots/${snapshotId}/next`);
  }

   getPrevSnapshot(userId: number, snapshotId: string): Observable<SnapshotIndex> {
    return this.httpClient.get<SnapshotIndex>(`${this.env.apiUrl}/users/${userId}/snapshots/${snapshotId}/prev`);
  }

  getFeelings(userId: number, snapshotId: string): Observable<Feelings> {
    return this.httpClient.get<Feelings>(`${this.env.apiUrl}/users/${userId}/snapshots/${snapshotId}/feelings`);
  }

  getPose(userId: number, snapshotId: string): Observable<Pose> {
    return this.httpClient.get<Pose>(`${this.env.apiUrl}/users/${userId}/snapshots/${snapshotId}/pose`);
  }

  getColorImage(userId: number, snapshotId: string): Observable<ColorImage> {
    return this.httpClient.get<ColorImage>(`${this.env.apiUrl}/users/${userId}/snapshots/${snapshotId}/color_image`);
  }

  getDepthImage(userId: number, snapshotId: string): Observable<DepthImage> {
    return this.httpClient.get<DepthImage>(`${this.env.apiUrl}/users/${userId}/snapshots/${snapshotId}/depth_image`);
  }

  getColorImageData(userId: number, snapshotId: string): Observable<Blob> {
    return this.httpClient.get(`${this.env.apiUrl}/users/${userId}/snapshots/${snapshotId}/color_image/data`, {
      responseType: "blob"
    });
  }

  getDepthImageData(userId: number, snapshotId: string): Observable<Blob> {
    return this.httpClient.get(`${this.env.apiUrl}/users/${userId}/snapshots/${snapshotId}/depth_image/data`, {
      responseType: "blob"
    });
  }

}
