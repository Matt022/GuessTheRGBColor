import { Component, OnDestroy } from '@angular/core';
import { interval } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
    selector: 'app-guess',
    templateUrl: './guess.component.html',
    styleUrls: ['./guess.component.scss']
})
export class GuessComponent implements OnDestroy {
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

    yourScore: number = 0;
    count: number = 3;
    show: boolean = false;

    private subscription: Subscription | undefined | null;

    randomize(): void {
        this._red = Math.floor(Math.random() * 256);
        this._green = Math.floor(Math.random() * 256);
        this._blue = Math.floor(Math.random() * 256);
        this.randomizedColor = `rgb(${this._red}, ${this._green}, ${this._blue})`;
    };

    guess(): void {
        this.count = 3;

        setTimeout(() => {

            this.show = true;

            this.subscription = interval(1000).subscribe(() => {
                if (this.count > 0) {
                    this.count--;

                    if (this.count === 0) {
                        this.guessRed = this._red;
                        this.guessGreen = this._green;
                        this.guessBlue = this._blue;

                        this.userGuessColor = `rgb(${this.userRed}, ${this.userGreen}, ${this.userBlue})`;

                        this.yourScore += this.countScore();
                        this.show = false;
                    }
                }
            });
        }, 1000);
    }

    private countScore(): number {
        let score: number = 0;

        if (this._red > this.userRed) {
            score += this._red - this.userRed;
        } else if (this._red < this.userRed) {
            score += this.userRed - this._red;
        }

        if (this._green > this.userGreen) {
            score += this._green - this.userGreen;
        } else if (this._green < this.userGreen) {
            score += this.userGreen - this._green;
        }

        if (this._blue > this.userBlue) {
            score += this._blue - this.userBlue;
        } else if (this._blue < this.userBlue) {
            score += this.userBlue - this._blue;
        }

        return score;
    }

    resetScore(): void {
        this.yourScore = 0;
    }

    nextGuess(): void {
        this.subscription = null;
        this.guessRed = 0;
        this.guessGreen = 0;
        this.guessBlue = 0;
        this.randomize();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
