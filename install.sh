#!/bin/bash
rm -R kernel 2>/dev/null
mkdir -p kernel/firmware/acpi
cp $1 kernel/firmware/acpi/dsdt.aml
find kernel | cpio -H newc --create > ./temp/acpi_override
sudo rm /boot/acpi_override | true
sudo cp ./temp/acpi_override /boot
rm -R kernel 2>/dev/null
echo "finished"