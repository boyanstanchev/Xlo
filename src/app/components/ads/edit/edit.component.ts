import {Component, OnInit} from '@angular/core';
import {AdsService} from '../../../core/services/ads.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: []
})
export class EditComponent implements OnInit {
  adModel: any

  constructor(private adsService: AdsService,
              private route: ActivatedRoute) {
  }

  edit() {
    this.adsService.editAdById(this.route.snapshot.params['id'], this.adModel)
  }

  ngOnInit() {
    this.adsService.getAdById(this.route.snapshot.params['id']).subscribe((ad) => {
        this.adModel = ad
      })
  }

}
