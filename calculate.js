const DROP_RATE = 0.15
const INCREASE_RATE = 0.02
const WEEKLY_CP = 3340
const WEEKS_PER_SEASON = 13
const BRACKETS = [100, 1000, 4500, 10500, 19000, 30000, 43500, 59500, 78000, 99000, 122500, 148500, 177000, 208000, 241500, 277500, 316000, 357000, 400500, 446500]

class Calculate {
    
    constructor() {

        this.state = {
            CP: 0,
            multiplier: 0
        }

    }

    getMultiplier() {

        // Gets the multiplier based on the brackets

        this.state.multiplier = 0

        BRACKETS.map(item => {
            if (this.state.CP >= item) {
                this.state.multiplier += INCREASE_RATE
            }

        })

    }

    monthlyDrop() {

        // Decrease the player's CPs by 20%

        console.log("\nMonthly drop:")
        console.log("Before: ", this.state.CP)

        this.state.CP = this.state.CP * (1 - DROP_RATE)

        console.log("After: ", this.state.CP)

        this.getMultiplier()
    }

    calculatePoints(seasons) {

        // Takes the number of seasons and calculate the amount of points earned for a constant WEEKLY_CP

        var i = 0;
        this.state.CP = 0;
        this.state.multiplier = 0;

        while (i < seasons) {

            var k = 0;
            var j = 0;

            console.log("\nBefore season " + (i + 1) + ":", this.state)

            while (k < WEEKS_PER_SEASON) {

                this.getMultiplier()
                this.state.CP += WEEKLY_CP * (1 + this.state.multiplier)

                if (j === 3 || j === 7 || j === 11) {
                    this.monthlyDrop()
                }

                k++;
                j++;
            }
            console.log("\nAfter season " + (i + 1) + ":", this.state)
            i++;
        }

        console.log("\n\nIf you earn " + WEEKLY_CP + " Clique Points a week during " + seasons + " seasons, you will have " + Math.round(this.state.CP) + " Clique Points\n")

    }
}


let c = new Calculate()

c.calculatePoints(4)