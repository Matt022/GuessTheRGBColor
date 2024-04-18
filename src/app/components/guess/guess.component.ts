import { Component } from '@angular/core';

@Component({
    selector: 'app-guess',
    templateUrl: './guess.component.html',
    styleUrls: ['./guess.component.scss']
})
export class GuessComponent {
    randomizedColor: string = 'rgb(255, 255, 255)';
    userGuessColor: string = 'rgb(255, 255, 255)';

    userRed!: number;
    userGreen!: number;
    userBlue!: number;

    guessRed!: number;
    guessGreen!: number;
    guessBlue!: number;

    private _red: number = 0;
    private _green: number = 0;
    private _blue: number = 0;

    randomize(): void {
        this._red = Math.floor(Math.random() * 256);
        this._green = Math.floor(Math.random() * 256);
        this._blue = Math.floor(Math.random() * 256);
        this.randomizedColor = `rgb(${this._red}, ${this._green}, ${this._blue})`;
    };

    guess(): void {
        this.userGuessColor = `rgb(${this.userRed}, ${this.userGreen}, ${this.userBlue})`;
        setTimeout(() => {
            this.guessRed = this._red;
            this.guessGreen = this._green;
            this.guessBlue = this._blue;
        }, 3000);
    }
}
