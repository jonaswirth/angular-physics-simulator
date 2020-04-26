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
    private heightPerStep:number;

    //Display
    private margin:number = 5;

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
        this.heightPerStep = this.canvasHeight / (this.heightY * this.grid.stepSize);
    }

    public GetOrigin():Position{
        return {
            x:3,
            y:3
        };
    }

    public DrawGrid(ctx:CanvasRenderingContext2D){
        let countLinesX = Math.round(this.canvasWidth/ this.widthPerStep);
        let countLinesY = Math.round(this.canvasHeight/ this.heightPerStep);

        let origin = this.GetOrigin();

        ctx.lineWidth = 1;

        //Draw vertical (x) lines
        for(let i = 0; i <= countLinesX; i++){
            ctx.beginPath();

            if(i == origin.x){
                ctx.strokeStyle = "#000000";
            }
            else if(i % this.grid.highleightStep == 0){
                ctx.strokeStyle = "#d1d1d1";
            }
            else{
                ctx.strokeStyle = "#e9e9e9";
            }

            ctx.moveTo(i * this.widthPerStep * this.grid.stepSize + this.margin + 0.5, 0 + 0.5);
            ctx.lineTo(i * this.widthPerStep * this.grid.stepSize + this.margin + 0.5, this.canvasHeight + 0.5);
            ctx.stroke();
        }

        //Draw horizontal (y) lines
        for(let i = 0; i <= countLinesY; i++){
            ctx.beginPath();

            if(i == origin.y){
                ctx.strokeStyle = "#000000";
            }
            else if(i % this.grid.highleightStep == 0){
                ctx.strokeStyle = "#d1d1d1";
            }
            else{
                ctx.strokeStyle = "#e9e9e9";
            }

            ctx.moveTo(0 + this.margin + 0.5, this.heightY * this.heightPerStep - (i * this.heightPerStep * this.grid.stepSize) + 0.5);
            ctx.lineTo(this.canvasWidth + 0.5,  this.heightY * this.heightPerStep - (i * this.heightPerStep * this.grid.stepSize) + 0.5);
            ctx.stroke();
        }

        // Draw ticks along the x axis
        for(let i = 0; i < countLinesX;i++){
            ctx.beginPath();
            ctx.strokeStyle = "#000000";

            ctx.moveTo(i * this.widthPerStep + this.margin + 0.5, this.canvasHeight - (origin.y * this.heightPerStep) + 3 + 0.5);
            ctx.lineTo(i * this.widthPerStep + this.margin + 0.5, this.canvasHeight - (origin.y * this.heightPerStep) - 3 + 0.5);
            ctx.stroke();
        }

        // Draw ticks along the y axis
        for(let i = 0; i < countLinesY;i++){
            ctx.beginPath();
            ctx.strokeStyle = "#000000";

            ctx.moveTo(origin.x * this.widthPerStep - 3 + this.margin + 0.5, this.canvasHeight - i * this.heightPerStep + 0.5);
            ctx.lineTo(origin.x * this.widthPerStep + 3 + this.margin + 0.5, this.canvasHeight - i * this.heightPerStep + 0.5);
            ctx.stroke();
        }
    }
}