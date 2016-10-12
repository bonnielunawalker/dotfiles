set nocompatible

filetype on

set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

Plugin 'VundleVim/Vundle.vim'
Plugin 'vim-airline/vim-airline'
Plugin 'vim-airline/vim-airline-themes'
Plugin 'wincent/command-t'
Plugin 'Lokaltog/vim-powerline'
Plugin 'solarized/xresources'
Plugin 'scrooloose/syntastic'
Plugin 'OrangeT/vim-csharp'
Plugin 'powerline/powerline', {'rtp': 'powerline/bindlings/vim/'}

call vundle#end()

filetype plugin indent on


" --- General settings ---
set backspace=indent,eol,start
set ruler
set number
set showcmd
set incsearch
set hlsearch


" --- Theme settings ---
syntax enable 
" let g:solarized_termcolors=256
set background=dark
colorscheme solarized


" --- Airline settings ---
" let g:airline#extensions#tabline#enabled = 1 
" let g:airline_theme='cool'
" set laststatus=2


" --- Powerline settings ---
set rtp+=/usr/local/lib/python2.7/dist-packages/powerline/bindings/vim/

" Always show statusline
set laststatus=2
"
" " Use 256 colours (Use this setting only if your terminal supports 256
" colours)
set t_Co=256

" --- Whitespace settings ---
set expandtab
set shiftwidth=4
set softtabstop=4
set autoindent
set smartindent

" --- Syntastic settings --
set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*

let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0
