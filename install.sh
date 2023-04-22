#!/bin/bash

set -eu -o pipefail # fail on error and report it, debug all lines

REQUIRED_PKG=( subversion gum )

for PKG in "${REQUIRED_PKG[@]}"
do
    PKG_OK=$(dpkg-query -W --showformat='${Status}\n' $PKG|grep "install ok installed")
    echo Checking for $PKG: $PKG_OK
    if [ "" = "$PKG_OK" ]; then
    echo "No $PKG. Setting up $PKG."
    sudo apt install $PKG --yes
    fi
done

echo Installing scripts

ln -fsr astro-starter.sh ~/.local/bin/

echo Installation complete!

exec "$BASH" # execute new bash shell