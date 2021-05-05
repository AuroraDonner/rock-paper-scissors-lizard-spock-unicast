input.onButtonPressed(Button.A, function () {
    myHand += 1
    if (myHand == 1) {
        basic.showLeds(`
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            . . . . .
            `)
    } else if (myHand == 2) {
        basic.showLeds(`
            # # . . #
            # # . # .
            . . # . .
            # # . # .
            # # . . #
            `)
    } else if (myHand == 3) {
        // This lizard doesn't really look like a lizard but it gets the point across (I think)
        basic.showLeds(`
            # . # . #
            . # . . #
            # . # # .
            . . # # .
            # # . . #
            `)
    } else if (myHand == 4) {
        // Wow I can't make Spock on this
        basic.showLeds(`
            # . . . #
            . # . # .
            . # # # .
            # # # # #
            . # # # .
            `)
    }
})
input.onButtonPressed(Button.B, function () {
    selected = true
    radio.sendValue("AB" + "CD", myHand)
})
radio.onReceivedValue(function (name, value) {
    if (name.substr(0, 2) == "CD" && name.substr(2, 2) == "AB") {
        recieved = true
        opponentHand = value
    }
})
function reset () {
    basic.pause(1000)
    myHand = 0
    opponentHand = 0
    basic.clearScreen()
}
let recieved = false
let selected = false
let opponentHand = 0
let myHand = 0
radio.setGroup(202)
myHand = 0
opponentHand = 0
basic.forever(function () {
    if (myHand == 0) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    }
    if (selected == true && recieved == true) {
        selected = false
        recieved = false
        if (opponentHand == 0 && myHand == 1 || (opponentHand == 0 && myHand == 4 || (opponentHand == 1 && myHand == 2 || (opponentHand == 1 && myHand == 3 || (opponentHand == 2 && myHand == 0 || (opponentHand == 2 && myHand == 4 || (opponentHand == 3 && myHand == 0 || (opponentHand == 3 && myHand == 2 || (opponentHand == 4 && myHand == 1 || opponentHand == 4 && myHand == 3))))))))) {
            basic.showIcon(IconNames.Happy)
            reset()
        } else if (myHand == 0 && opponentHand == 1 || (myHand == 0 && opponentHand == 4 || (myHand == 1 && opponentHand == 2 || (myHand == 1 && opponentHand == 3 || (myHand == 2 && opponentHand == 0 || (myHand == 2 && opponentHand == 4 || (myHand == 3 && opponentHand == 0 || (myHand == 3 && opponentHand == 2 || (myHand == 4 && opponentHand == 1 || myHand == 4 && opponentHand == 3))))))))) {
            basic.showIcon(IconNames.Sad)
            reset()
        } else if (myHand == opponentHand) {
            basic.showIcon(IconNames.Surprised)
            reset()
        }
    }
})
