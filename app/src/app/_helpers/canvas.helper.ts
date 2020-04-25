import { Grid } from '../_models/grid.model';
import { Range } from '../_models/range.model';
import { Position } from '../_models/position.model';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';

export class CanvasHelper{
    private canvasWidth:number;
    private canvasHeight:number;
    private grid:Grid;

    //Control variables
    private widthX:number;
    private heightY:number;

    private widthPerStep:number;

    constructor (width:number, height:number, grid:Grid){
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.grid = grid;
        this.Initialize();
    }

    private Initialize(){
        this.widthX = this.grid.AxisX.to - this.grid.AxisX.from;
        this.heightY = this.grid.AxisY.to - this.grid.AxisY.from;

        console.log("height: " + this.heightY + " width: " + this.widthX);

        this.widthPerStep = this.canvasWidth / (this.widthX * this.grid.stepSize);
    }

    public GetOrigin():Position{
        return {
            x:5,
            y:0
        };
    }

    public DrawGrid(ctx:CanvasRenderingContext2D){
        let countLinesX = Math.round(this.canvasWidth/ this.widthPerStep);
        let countLinesY = Math.round(this.canvasHeight/ (this.heightY * this.grid.stepSize));

        let origin = this.GetOrigin();

        console.log(this.canvasWidth);
        console.log(this.widthX * this.grid.stepSize);
        console.log(countLinesX);

        for(let i = 0; i <= countLinesX; i++){
            ctx.beginPath();

            if(i == origin.x){
                ctx.strokeStyle = "#000000";
            }
            else{
                ctx.strokeStyle = "#e9e9e9";
            }

            ctx.moveTo(i * this.widthPerStep * this.grid.stepSize, 0);
            console.log("move to: " + i * this.widthPerStep * this.grid.stepSize + ", 0");
            ctx.lineTo(i * this.widthPerStep * this.grid.stepSize, this.canvasHeight);
            console.log("line to: " + i * this.widthPerStep * this.grid.stepSize + ", " + this.canvasHeight);
            ctx.stroke();
        }
    }
}