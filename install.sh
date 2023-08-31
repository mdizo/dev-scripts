#!/bin/bash

set -eu -o pipefail # fail on error and report it, debug all lines

REQUIRED_PKG=( subversion gpg curl )

echo Checking and installing required packages

sudo apt update

for PKG in "${REQUIRED_PKG[@]}"
do
    PKG_OK=$(dpkg-query -W --showformat='${Status}\n' $PKG|grep "install ok installed")
    echo Checking for $PKG: $PKG_OK
    if [ "" = "$PKG_OK" ]; then
    echo "No $PKG. Setting up $PKG."
    sudo apt install $PKG --yes
    fi
done

PKG_GUM=$(dpkg-query -W --showformat='${Status}\n' $PKG|grep "install ok installed")
echo Checking for GUM: $PKG_GUM
if [ "" = "$PKG_GUM" ]; then
    echo "Gum not installed. Setting up Gum."
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://repo.charm.sh/apt/gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/charm.gpg
    echo "deb [signed-by=/etc/apt/keyrings/charm.gpg] https://repo.charm.sh/apt/ * *" | sudo tee /etc/apt/sources.list.d/charm.list
    sudo apt update && sudo apt install gum --yes
fi

echo Installing scripts

mkdir -p ~/.local/bin
ln -fsr ./astro-starter ~/.local/bin/astro-starter

echo Installation complete!