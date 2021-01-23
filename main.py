# press A to initial target value
def on_button_pressed_a():
    global target, run_timer_flag
    # avoid to change target value when getting players' number
    if not run_timer_flag:
        # set target value (1~3)
        target = randint(1, 3)
        # clear the list
        guess_numbers.clear()
        # for debug
        basic.show_number(target)
        basic.clear_screen()
        basic.pause(1000)
        # signal run_timer_flag
        run_timer_flag = True
input.on_button_pressed(Button.A, on_button_pressed_a)

# timmer (wait 10 sec.)
def run_timer():
    global run_timer_flag, target, correct
    # wait run_timer_flag
    if run_timer_flag:
        # run timmer
        timer = 10
        while timer > 0:
            music.play_tone(Note.C, music.beat(1))
            timer -= 1
            basic.show_number(timer)
            basic.pause(100)
        music.play_tone(Note.C5, music.beat(300))
        # cheack correct or not
        for val in guess_numbers:
            correct = (val == target)
            if not correct:
                break
        # send result to client
        if correct:
            radio.send_string("true")
        elif not correct:
            radio.send_string("false")
        # reset run_timer_flag
        run_timer_flag = False
    # hint press a to initial
    else:       
        basic.show_arrow(ArrowNames.WEST)
        basic.clear_screen()
basic.forever(run_timer)

# get guess number from player
def get_player_number(get_player_number):
    global run_timer_flag
    # wait run_timer_flag
    if run_timer_flag:
        guess_numbers.append(get_player_number)
        music.ring_tone(Note.G)
radio.on_received_number(get_player_number)

'''
initial setting
'''

target = 0
correct = False
guess_numbers: List[number] = []
run_timer_flag = False
basic.show_icon(IconNames.HEART)
radio.set_group(5)
radio.set_transmit_power(3)
basic.clear_screen()