import {Component, OnInit} from '@angular/core';
import {AdsService} from '../../../core/services/ads.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: []
})
export class EditComponent implements OnInit {
  adModel: any;

  constructor(private adsService: AdsService,
              private route: ActivatedRoute) {
  }

  edit() {
    this.adsService.editAdById(this.route.snapshot.params['id'], this.adModel)
  }

  ngOnInit() {
    this.adsService.getAdById(this.route.snapshot.params['id'])
      .subscribe((ads) => {
        ads.forEach((ad) => {
          this.adModel = {
            title: ad.payload.val()['title'],
            category: ad.payload.val()['category'],
            subCategory: ad.payload.val()['subCategory'],
            condition: ad.payload.val()['condition'],
            featured: ad.payload.val()['featured'],
            model: ad.payload.val()['model'],
            price: ad.payload.val()['price'],
            imageUrl: ad.payload.val()['imageUrl'],
            creator: ad.payload.val()['creator']
          }
        })
      });
  }

}
