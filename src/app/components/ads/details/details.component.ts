import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdsService} from '../../../core/services/ads.service';
import {CategoriesService} from '../../../core/services/categories.service';
import {AuthService} from '../../../core/services/auth.service';
import {ModalService} from '../../shared/modal/modal.service';
import {MessagesService} from '../../../core/services/messages.service';
import {ToastrService} from 'ngx-toastr';
import * as firebase from 'firebase';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: []
})
export class DetailsComponent implements OnInit {
  ad
  isCreator: boolean = false

  constructor(private route: ActivatedRoute,
              private adsService: AdsService,
              public authService: AuthService,
              public categoriesService: CategoriesService,
              private modalService: ModalService,
              private messagesService: MessagesService,
              private toastr: ToastrService) {}

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  message(form, profileId, adTitle) {
    let message = form.value.message
    this.messagesService.sendMessage(message, profileId, this.route.snapshot.params['id'], adTitle)
      .then(() => {
        this.toastr.success('Message send.')
        this.closeModal('custom-modal-1')
      })
      .catch(err => this.toastr.error(err.message))
  }

  ngOnInit() {
    this.adsService.getAdById(this.route.snapshot.params['id'])
      .then((snapshot) => {
        this.categoriesService.getCategoryNameById(snapshot.val().category, false)
          .then((snapshot) => {
            this.ad['categoryName'] = snapshot.val().name
          })

        this.categoriesService.getCategoryNameById(snapshot.val().subCategory, true)
          .then((snapshot) => {
            this.ad['subCategoryName'] = snapshot.val().name
          })

        this.authService.getUserNameById(snapshot.val().creator)
          .then((snapshot) => {
            snapshot.forEach((child) => {
              this.ad['creatorUserName'] = child.val().displayName
            });
          })

        if (firebase.auth().currentUser) {
          this.isCreator = this.authService.userId === snapshot.val().creator;
        }


        this.ad = {
          id: snapshot.key,
          title: snapshot.val().title,
          condition: snapshot.val().condition,
          category: snapshot.val().category,
          subCategory: snapshot.val().subCategory,
          featured: snapshot.val().featured,
          model: snapshot.val().model,
          price: snapshot.val().price,
          imageUrl: snapshot.val().imageUrl,
          creator: snapshot.val().creator
        }
      })
  }

}
