#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

alias ls='ls --color=auto'
PS1='[\W]: '

export TERM=xterm-256color

powerline-daemon -q
POWERLINE_BASH_CONTINUATION=1
POWERLINE_BASH_SELECT=1
. /home/bryn/.local/lib/python3.5/site-packages/powerline/bindings/bash/powerline.sh

archey
