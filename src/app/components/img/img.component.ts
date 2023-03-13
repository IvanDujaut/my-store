import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  img: string = '';

  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
    console.log('change just img =>', this.img);
    // code
  }
  @Input() alt: string = '';
  @Output() loaded = new EventEmitter<string>();
  imgDefault = '../../../assets/images/default.png';
  counter = 0;
  // counterFn: number | undefined;

  constructor() {
    //before render
    //No async -- once time
    console.log('constructor', 'imgValue => ', this.img);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // before - during render
    // changes input -- time
    console.log('ngOnChanges', 'imgValue => ', this.img);
    console.log('changes', changes);
  }

  ngOnInit(): void {
    // before render
    // async - fetch, promisses -- once time. Cuando hacemos una
    // llamada a la API, el componente alista los datos para usarlos
    console.log('ngOnInit', 'imgValue => ', this.img);
    // this.counterFn = window.setInterval(() => {
    //   this.counter++;
    //   console.log('run counter' ,this.counter);
    // }, 1000);
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
    // window.clearInterval(this.counterFn);
  }

  public imgError(): void {
    this.img = this.imgDefault;
  }

  public imgLoaded(): void {
    console.log('log hijo');
    this.loaded.emit(this.img);
  }

}
