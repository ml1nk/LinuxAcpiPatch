# Linux ACPI Patch to bring back sleep

Some scripts to patch the ACPI table to enable s1 - s3 sleep mode, without decompiling aml but flipping some bytes and fixing the checksum later.

## Preconditions
 - acpidump
 - cpio
 - nodejs
 - pnpm

## Supported
- Dell Latitude 5540 
    - pnpm run latitude5540
    - s3 only works with ac power (tested on kernel 6.8 rc.5) but shows strange behavior if on battery

## Inspired / References

 - [https://dev.to/epassaro/fix-suspend-issues-on-dell-7405-2-in-1-3l1b](https://dev.to/epassaro/fix-suspend-issues-on-dell-7405-2-in-1-3l1b)

## Diff to verify

~~~bash
diff -y <(xxd ./dump/dsdt.dat) <(xxd temp/dsdt.aml) > diff.txt
~~~