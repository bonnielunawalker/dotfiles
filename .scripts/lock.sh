#!/bin/bash
scrot /home/bryn/tmp/screenshot.png
convert /home/bryn/tmp/screenshot.png -blur 0x5 /home/bryn/tmp/screenshotblur.png
i3lock -i /home/bryn/tmp/screenshotblur.png
