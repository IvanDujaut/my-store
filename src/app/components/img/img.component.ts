import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {

  @Input() img: string = '';
  @Output() loaded = new EventEmitter<string>();
  imgDefault = '../../../assets/images/default.png';

  constructor() { }

  ngOnInit(): void {
  }

  public imgError(): void {
    this.img = this.imgDefault;
  }

  public imgLoaded(): void {
    console.log('log hijo');
    this.loaded.emit(this.img);
  }

}
