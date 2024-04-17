import { Component } from '@angular/core';

@Component({
    selector: 'app-guess',
    templateUrl: './guess.component.html',
    styleUrls: ['./guess.component.scss']
})
export class GuessComponent {
    backgroundColor: string = 'rgb(0, 0, 0)';
    
    randomize(): void {
        const red: number = Math.floor(Math.random() * 256);
        const green: number = Math.floor(Math.random() * 256);
        const blue: number = Math.floor(Math.random() * 256);
        this.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
        console.log(this.backgroundColor);
    };
}
