import { Employee, employees } from './employees';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.css'],
})
export class ExtraComponent {
  se: string = '';
  multiselect: string = '';
  gridData1: string = '';
  drop: string = '';
  d1: string = '';
  d2: string = '';
  constructor() {}

  ngOnInit(): void {}
  public listItems: Array<string> = [
    'Baseball',
    'Basketball',
    'Cricket',
    'Field Hockey',
    'Football',
    'Table Tennis',
    'Tennis',
    'Volleyball',
  ];

  public gridData: Employee[] = employees;

  public treeItems: any[] = [
    {
      text: 'Furniture',
      id: 1,
      items: [
        { text: 'Tables & Chairs', id: 2 },
        { text: 'Sofas', id: 3 },
        { text: 'Occasional Furniture', id: 4 },
      ],
    },
    {
      text: 'Decor',
      id: 5,
      items: [
        { text: 'Bed Linen', id: 6 },
        { text: 'Carpets', id: 7 },
      ],
    },
  ];

  public value = ['Basketball', 'Cricket'];
  public complexValue = { text: 'Decor', id: 5 };
  public complexArrayValue = [{ text: 'Sofas', id: 3 }];

  public toggleText = 'Hide';
  private show = true;

  public onToggle(): void {
    this.show = !this.show;
    this.toggleText = this.show ? 'Hidе' : 'Show';
  }
}
