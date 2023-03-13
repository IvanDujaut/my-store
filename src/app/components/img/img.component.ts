import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() img: string = '';
  @Output() loaded = new EventEmitter<string>();
  imgDefault = '../../../assets/images/default.png';

  constructor() {
    //before render
    //No async -- once time
    console.log('constructor', 'imgValue => ', this.img);
  }

  ngOnChanges(): void {
    // before - during render
    // changes input -- time
    console.log('ngOnChanges', 'imgValue => ', this.img);
  }

  ngOnInit(): void {
    // before render
    // async - fetch, promisses -- once time. Cuando hacemos una
    // llamada a la API, el componente alista los datos para usarlos
    console.log('ngOnInit', 'imgValue => ', this.img);
  }

  ngAfterViewInit(): void {
    // after render
    // handler children. Se ven en directivas. Corre despues del
    // render, normalmente manejamos los hijos de forma programatica
    // y no del template, este deberia ser donde hacer eso
    console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    // delete
    console.log('ngOnDestroy');
  }

  public imgError(): void {
    this.img = this.imgDefault;
  }

  public imgLoaded(): void {
    console.log('log hijo');
    this.loaded.emit(this.img);
  }

}
