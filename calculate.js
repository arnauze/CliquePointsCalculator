const DROP_RATE = 0.1
const INCREASE_RATE = 0.05
const WEEKLY_CP = parseInt(process.argv[3])
const SEASONS = parseInt(process.argv[2])
const WEEKS_PER_SEASON = 13
const BRACKETS = [
    {
        points: 100,
        name: 'Bronze 4'
    },
    {
        points: 1000,
        name: 'Bronze 3'
    },
    {
        points: 4500,
        name: 'Bronze 2'
    },
    {
        points: 10500,
        name: 'Bronze 1'
    },
    {
        points: 19000,
        name: 'Silver 4'
    },
    {
        points: 30000,
        name: 'Silver 3'
    },
    {
        points: 43500,
        name: 'Silver 2'
    },
    {
        points: 59500,
        name: 'Silver 1'
    },
    {
        points: 78000,
        name: 'Gold 4'
    },
    {
        points: 99000,
        name: 'Gold 3'
    },
    {
        points: 122500,
        name: 'Gold 2'
    },
    {
        points: 148500,
        name: 'Gold 1'
    },
    {
        points: 177000,
        name: 'Platinum 4'
    },
    {
        points: 208000,
        name: 'Platinum 3'
    },
    {
        points: 241500,
        name: 'Platinum 2'
    },
    {
        points: 277500,
        name: 'Platinum 1'
    },
    {
        points: 316000,
        name: 'Diamond 4'
    },
    {
        points: 357000,
        name: 'Diamond 3'
    },
    {
        points: 400500,
        name: 'Diamond 2'
    },
    {
        points: 446500,
        name: 'Diamond 1'
    }
]

class Calculate {
    
    constructor() {

        this.state = {
            CP: 0,
            multiplier: 0
        }

        this.division = ''

    }

    getMultiplier() {

        // Gets the multiplier based on the brackets

        this.state.multiplier = 0
        BRACKETS.map((item, index) => {
            if (this.state.CP >= item.points) {
                this.state.multiplier += (INCREASE_RATE + (Math.floor(index / 4) / 100))
            }

        })

    }

    getDivision() {
        BRACKETS.map(item => {
            if (this.state.CP >= item.points) {
                this.division = item.name
            }
        })
        return this.division;
    }

    monthlyDrop() {

        // Decrease the player's CPs by 15%

        console.log("\nMonthly drop:")
        console.log("Before: ", this.state.CP)

        this.state.CP = this.state.CP * (1 - DROP_RATE)

        console.log("After: ", this.state.CP)

        this.getMultiplier()
    }

    calculatePoints() {

        // Takes the number of seasons and calculate the amount of points earned for a constant WEEKLY_CP

        var i = 0;
        this.state.CP = 0;
        this.state.multiplier = 0;

        while (i < SEASONS) {

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

        console.log("\n\nIf you earn " + WEEKLY_CP + " Clique Points a week during " + SEASONS + " seasons, you will have " + Math.round(this.state.CP) + " Clique Points and be " + this.getDivision() + ".\n")

    }
}


// Here this is what happens at runtime 

let c = new Calculate()

console.log("\n\n==============================>START<==============================")

c.calculatePoints(SEASONS)

console.log("\n===============================>END<===============================\n\n")
