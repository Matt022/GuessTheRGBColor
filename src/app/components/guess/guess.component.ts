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

    userRed!: number | string;
    userGreen!: number | string;
    userBlue!: number | string;

    guessRed!: number | string;
    guessGreen!: number | string;
    guessBlue!: number | string;

    private _red: number | string = 0;
    private _green: number | string = 0;
    private _blue: number | string = 0;

    yourScore: number = 0;
    count: number = 3;
    show: boolean = false;
    allowToGuess: boolean = true;

    private subscription: Subscription | undefined | null;

    randomize(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.reset();

        this._red = Math.floor(Math.random() * 256);
        this._green = Math.floor(Math.random() * 256);
        this._blue = Math.floor(Math.random() * 256);
        this.randomizedColor = `rgb(${this._red}, ${this._green}, ${this._blue})`;
        this.count = 4;
    };

    guess(): void {
        this.allowToGuess = false;

        setTimeout(() => {
            this.show = true;
            this.subscription = interval(1000).subscribe(() => {
                if (this.count > 0 && this.show) {
                    this.count--;

                    if (this.count === 0) {
                        this.guessRed = this._red;
                        this.guessGreen = this._green;
                        this.guessBlue = this._blue;

                        this.userGuessColor = `rgb(${this.userRed}, ${this.userGreen}, ${this.userBlue})`;

                        this.yourScore += this.countScore();
                        this.show = false;
                        this.allowToGuess = true;
                    }
                }
            });
        }, 1000);

        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    private countScore(): number {
        let score: number = 0;

        if (+this._red > +this.userRed) {
            score += +this._red - +this.userRed;
        } else if (+this._red < +this.userRed) {
            score += +this.userRed - +this._red;
        }

        if (+this._green > +this.userGreen) {
            score += +this._green - +this.userGreen;
        } else if (+this._green < +this.userGreen) {
            score += +this.userGreen - +this._green;
        }

        if (+this._blue > +this.userBlue) {
            score += +this._blue - +this.userBlue;
        } else if (+this._blue < +this.userBlue) {
            score += +this.userBlue - +this._blue;
        }

        return score;
    }

    resetScore(): void {
        this.yourScore = 0;
        this.randomize();
    }

    nextGuess(): void {
        this.subscription = null;
        this.reset();
        this.randomize();
    }

    private reset(): void {
        this.guessRed = "";
        this.guessGreen = "";
        this.guessBlue = "";

        this.userRed = "";
        this.userGreen = "";
        this.userBlue = "";

        this._red = "";
        this._green = "";
        this._blue = "";

        this.userGuessColor = 'rgb(255, 255, 255)';
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
