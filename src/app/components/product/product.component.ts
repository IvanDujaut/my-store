import { Component, OnInit, Input } from '@angular/core';

import { Product_Response } from '../../models/product.models'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product_Response = {
    id: '',
    price: 0,
    image: '',
    name: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

}
