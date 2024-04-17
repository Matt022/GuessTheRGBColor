import { Component } from '@angular/core';

@Component({
    selector: 'app-guess',
    templateUrl: './guess.component.html',
    styleUrls: ['./guess.component.scss']
})
export class GuessComponent {
    randomizedColor: string = 'rgb(255, 255, 255)';
    userGuessColor: string = 'rgb(255, 255, 255)';

    red!: number;
    green!: number;
    blue!: number;

    randomize(): void {
        const red: number = Math.floor(Math.random() * 256);
        const green: number = Math.floor(Math.random() * 256);
        const blue: number = Math.floor(Math.random() * 256);
        this.randomizedColor = `rgb(${red}, ${green}, ${blue})`;
    };

    guess(): void {
        this.userGuessColor = `rgb(${this.red}, ${this.green}, ${this.blue})`;
    }
}
