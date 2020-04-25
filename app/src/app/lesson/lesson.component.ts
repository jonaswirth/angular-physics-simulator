import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {ViewComponent} from './view/view.component';
import {SettingsComponent} from './settings/settings.component';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params.get("id"));
    });
  }

}
