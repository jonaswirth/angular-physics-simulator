import { Range } from './range.model';

export class Grid {
    // range of the axis, at least one must be set the other one can be calculated in proportion to the other
    AxisX:Range;
    AxisY:Range;
    // define which lines should be drawn
    stepSize:number;
    // define which lines should be higligted
    highleightStep:number;
}