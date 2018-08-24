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
    this.adsService.getAdById(this.route.snapshot.params['id']) // ADD ALL THE FIELDS!
      .then((snapshot) => {
        this.adModel = {
          title: snapshot.val().title,
          category: snapshot.val().category,
          subCategory: snapshot.val().subCategory,
          condition: snapshot.val().condition,
          featured: snapshot.val().featured,
          model: snapshot.val().model,
          price: snapshot.val().price,
          imageUrl: snapshot.val().imageUrl,
          creator: snapshot.val().creator
        }
      });
  }

}
