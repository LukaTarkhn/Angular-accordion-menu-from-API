import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface CategoryData {
  categoryId: number;
  categoryName: string;
  level: number;
  parentCategory: number;
  eventsCount: number;
  sortOrder: number;
  active: boolean;
}

export interface Fetch {
  data: any[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public apiUrl = 'https://www.lionsbet.com/rest/market/categories';

  public main: CategoryData[] = [];
  public subMain: CategoryData[] = [];
  public subSubMain: CategoryData[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Fetch>(this.apiUrl)
      .subscribe(res => {
        this.main = res.data.filter(menu => menu.level === 1);
        this.subMain = res.data.filter(menu => menu.level === 2);
        this.subSubMain = res.data.filter(menu => menu.level === 3);
      });
  }

    toggle(index: number) {
      this.main[index].active = !this.main[index].active;
      this.main.filter(
        (menu, i) => i !== index && menu.active
      ).forEach(menu => menu.active = !menu.active);
    }

    subToggle(index: number) {
      this.subMain[index].active = !this.subMain[index].active;
    }

}
