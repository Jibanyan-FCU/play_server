//  press A to initial target value
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    //  avoid to change target value when getting players' number
    if (!run_timer_flag) {
        //  set target value (1~3)
        target = randint(1, 3)
        //  clear the list
        _py.py_array_clear(guess_numbers)
        //  for debug
        basic.showNumber(target)
        basic.clearScreen()
        basic.pause(1000)
        //  signal run_timer_flag
        run_timer_flag = true
    }
    
})
//  timmer (wait 10 sec.)
basic.forever(function run_timer() {
    let timer: number;
    
    //  wait run_timer_flag
    if (run_timer_flag) {
        //  run timmer
        timer = 10
        while (timer > 0) {
            music.playTone(Note.C, music.beat(1))
            timer -= 1
            basic.showNumber(timer)
            basic.pause(100)
        }
        music.playTone(Note.C5, music.beat(300))
        //  cheack correct or not
        for (let val of guess_numbers) {
            correct = val == target
            if (!correct) {
                break
            }
            
        }
        //  send result to client
        if (correct) {
            radio.sendString("true")
        } else if (!correct) {
            radio.sendString("false")
        }
        
        //  reset run_timer_flag
        run_timer_flag = false
    } else {
        //  hint press a to initial
        basic.showArrow(ArrowNames.West)
        basic.clearScreen()
    }
    
})
//  get guess number from player
radio.onReceivedNumber(function get_player_number(get_player_number: number) {
    
    //  wait run_timer_flag
    if (run_timer_flag) {
        guess_numbers.push(get_player_number)
        music.ringTone(Note.G)
    }
    
})
/** initial setting */
let target = 0
let correct = false
let guess_numbers : number[] = []
let run_timer_flag = false
basic.showIcon(IconNames.Heart)
radio.setGroup(5)
radio.setTransmitPower(3)
basic.clearScreen()
