import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerServiceService {

  constructor() { }

  bannerImagesSource = new BehaviorSubject<string[]>([]);
  bannerImages$ = this.bannerImagesSource.asObservable(); 

  public updateBannerImages(images: string[]) {
    this.bannerImagesSource.next(images);
  }
}
