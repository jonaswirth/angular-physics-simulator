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
    private margin:number = 25;

    constructor (width:number, height:number, grid:Grid){
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.grid = grid;
        this.Initialize();
    }

    private Initialize(){

        if(this.grid.AxisX != null && this.grid.AxisY != null){
            this.widthX = this.grid.AxisX.to - this.grid.AxisX.from;
            this.heightY = this.grid.AxisY.to - this.grid.AxisY.from;

            this.widthPerStep = this.canvasWidth / (this.widthX * this.grid.stepSize);
            this.heightPerStep = this.canvasHeight / (this.heightY * this.grid.stepSize);
        }
        else if(this.grid.AxisX != null && this.grid.AxisY == null){
            this.widthX = this.grid.AxisX.to - this.grid.AxisX.from;
            this.widthPerStep = this.canvasWidth / (this.widthX * this.grid.stepSize);

            this.heightPerStep = this.widthPerStep;
            this.heightY = Math.round(this.canvasHeight / (this.heightPerStep * this.grid.stepSize));
        }
        else if(this.grid.AxisX == null && this.grid.AxisY != null){
            throw Error("Currently not supported");
        }
        else{
            throw Error("No axis defined");
        }
        console.log("height: " + this.heightY + " width: " + this.widthX);
    }

    public GetOrigin():Position{
        return {
            x:0,
            y:0
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
            else if((i - origin.x) % this.grid.highleightStep == 0){
                ctx.strokeStyle = "#d1d1d1";
            }
            else{
                ctx.strokeStyle = "#e9e9e9";
            }

            ctx.moveTo(i * this.widthPerStep * this.grid.stepSize + this.margin + 0.5, 0 + 0.5);
            ctx.lineTo(i * this.widthPerStep * this.grid.stepSize + this.margin + 0.5, this.canvasHeight + 0.5 - this.margin);
            ctx.stroke();
        }

        //Draw horizontal (y) lines
        for(let i = 0; i <= countLinesY; i++){
            ctx.beginPath();

            if(i == origin.y){
                ctx.strokeStyle = "#000000";
            }
            else if((i - origin.y) % this.grid.highleightStep == 0){
                ctx.strokeStyle = "#d1d1d1";
            }
            else{
                ctx.strokeStyle = "#e9e9e9";
            }

            ctx.moveTo(0 + this.margin + 0.5, this.heightY * this.heightPerStep - (i * this.heightPerStep * this.grid.stepSize) + 0.5 - this.margin);
            ctx.lineTo(this.canvasWidth + 0.5,  this.heightY * this.heightPerStep - (i * this.heightPerStep * this.grid.stepSize) + 0.5 - this.margin);
            ctx.stroke();
        }

        // Draw ticks along the x axis
        for(let i = 1; i < countLinesX;i++){
            ctx.beginPath();
            ctx.strokeStyle = "#000000";

            ctx.moveTo(i * this.widthPerStep + this.margin + 0.5, this.canvasHeight - (origin.y * this.heightPerStep) + 3 + 0.5 - this.margin);
            ctx.lineTo(i * this.widthPerStep + this.margin + 0.5, this.canvasHeight - (origin.y * this.heightPerStep) - 3 + 0.5 - this.margin);
            ctx.stroke();

            if(i > 0 && i % 5 == 0){
            ctx.font = '8px Arial';
            ctx.textAlign = 'start';
            ctx.fillText(String(i), (i + origin.x) * this.widthPerStep + this.margin - 2, this.canvasHeight - (origin.y * this.heightPerStep) + 10 + 0.5 - this.margin);
            }
        }

        // Draw ticks along the y axis
        for(let i = 1; i < countLinesY;i++){
            ctx.beginPath();
            ctx.strokeStyle = "#000000";

            ctx.moveTo(origin.x * this.widthPerStep - 3 + this.margin + 0.5, this.canvasHeight - i * this.heightPerStep + 0.5 - this.margin);
            ctx.lineTo(origin.x * this.widthPerStep + 3 + this.margin + 0.5, this.canvasHeight - i * this.heightPerStep + 0.5 - this.margin);
            ctx.stroke();

            if(i > 0 && i % 5 == 0){
                ctx.font = '8px Arial';
                ctx.textAlign = 'start';
                ctx.fillText(String(i), origin.x * this.widthPerStep - 13 + this.margin, this.canvasHeight - (i + origin.y) * this.heightPerStep + 2.5 - this.margin);
            }
        }
    }
}