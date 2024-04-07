import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ToastrModule} from "ngx-toastr";
import {TabsModule} from "ngx-bootstrap/tabs";
import {GalleryModule} from "ng-gallery";
import {NgxSpinnerModule} from "ngx-spinner";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right",
    }),
    TabsModule.forRoot(),
    GalleryModule,
    NgxSpinnerModule.forRoot({
      type: 'line-scale-party'
    })
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,
    TabsModule,
    GalleryModule,
    NgxSpinnerModule
  ]
})
export class SharedModule { }
