import { Component, OnInit } from '@angular/core';
import { Grid } from 'src/app/_models/grid.model';
import { CanvasHelper } from 'src/app/_helpers/canvas.helper';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  private canvas:any;
  private ctx:CanvasRenderingContext2D;
  
  private grid:Grid;
  private helper:CanvasHelper;

  constructor() { }

  ngOnInit(): void {
    this.canvas = document.getElementById("view");
    this.ctx = this.canvas.getContext("2d");

    this.grid = this.testGrid();

    if(this.grid){
      this.helper = new CanvasHelper(this.canvas.width, this.canvas.height, this.grid);
      this.DrawGrid();
    }
  }

  private DrawGrid():void{
    let height = this.canvas.height;
    let width = this.canvas.width;

    this.helper.DrawGrid(this.ctx);
    
  }

  private testGrid():Grid{
    return {
      AxisX:{
        from:0,
        to:100
      },
      AxisY:{
        from:0,
        to: 100
      },
      stepSize:1,
      highleightStep:5
    }
  }

}
