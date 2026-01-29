
{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.gnumake
    pkgs.gcc
    pkgs.zlib
    pkgs.openssl
    pkgs.libffi
    pkgs.sqlite
    pkgs.bzip2
    pkgs.gdbm
    pkgs.ncurses
    pkgs.readline
    pkgs.xz
    pkgs.tcl
    pkgs.tk
    pkgs.python314
  ];
}
