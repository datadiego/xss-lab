#!/bin/bash

# Directorio de fuentes
FONTDIR="/usr/share/figlet"

# Texto a imprimir (usa el argumento recibido)
TEXT="$1"


# Si no se pasa argumento, usa un valor por defecto
if [ -z "$TEXT" ]; then
  TEXT="webhacking"
fi

# Iterar sobre todas las fuentes .flf
for font in "$FONTDIR"/*.flf; do
    fontname=$(basename "$font" .flf)
    echo "=== Fuente: $fontname ==="
    figlet -w 400 -f "$font" "$TEXT" 2>/dev/null
    echo -e "\n"
done