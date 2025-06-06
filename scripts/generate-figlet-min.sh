#!/bin/bash

# Lista de fuentes a usar (separadas por espacio)
FONTS=("3D-ASCII" "3d_diagonal" "3-d" "3d" "4max" "5lineoblique" "5x7" "6x10" "abraxas" "alligator2" "alligator3" "alligator" "alpha" "amcaaa01" "amcneko" "amcrazo2" "amcslash" "amcslder" "amcthin" "amctubes" "amcun1" "ansi_new_roman" "ANSI_Shadow" "arrows" "ascii___" "avatar" "banner3-D" "banner3" "Banner3" "banner4" "banner" "barbwire" "basic" "bear" "bell" "bigchief" "big" "Big_Money-ne" "Big_Money-nw" "Big_Money-se" "Big_Money-sw" "block" "Bloody" "bolger" "braced" "bright" "briteb" "broadway" "broadway_kb" "bulbhead" "calgphy2" "caligraphy" "Calvin_S" "c_ascii_" "catwalk" "charact1" "charact2" "charact3" "charact4" "charact5" "chiseled" "Chiseled" "clb6x10" "cli8x8" "coinstak" "cola" " colossal" "com_sen_" "contrast" "contessa" "cosmic" "cosmike" "crawford" "cursive" "cybermedium" "defleppard" "Delta_Corps_Priest_1" "diamond" "dietcola" "doh" "doom" "DOS_Rebel" "dotmatrix" "double" "Elite" "epic" "fbr2____" "fender" "fire_font-k" "fraktur" "georgi16")

# Texto a imprimir (usa el argumento recibido)
TEXT="$1"

# Si no se pasa argumento, usa un valor por defecto
if [ -z "$TEXT" ]; then
  TEXT="webhacking"
fi

# Iterar sobre la lista de fuentes
for fontname in "${FONTS[@]}"; do
    echo "=== Fuente: $fontname ==="
    figlet -w 400 -f "$fontname" "$TEXT" 2>/dev/null
    echo -e "\n"
done