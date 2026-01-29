
{
  description = "A simple flake";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs-unstable";
  };

  outputs = { self, nixpkgs }: {
    devShells.x86_64-linux.default = nixpkgs.legacyPackages.x86_64-linux.mkShell {
      buildInputs = [
        nixpkgs.legacyPackages.x86_64-linux.gnumake
        nixpkgs.legacyPackages.x86_64-linux.gcc
        nixpkgs.legacyPackages.x86_64-linux.zlib
        nixpkgs.legacyPackages.x86_64-linux.openssl
        nixpkgs.legacyPackages.x86_64-linux.libffi
        nixpkgs.legacyPackages.x86_64-linux.sqlite
        nixpkgs.legacyPackages.x86_64-linux.bzip2
        nixpkgs.legacyPackages.x86_64-linux.gdbm
        nixpkgs.legacyPackages.x86_64-linux.ncurses
        nixpkgs.legacyPackages.x86_64-linux.readline
        nixpkgs.legacyPackages.x86_64-linux.xz
        nixpkgs.legacyPackages.x86_64-linux.tcl
        nixpkgs.legacyPackages.x86_64-linux.tk
        nixpkgs.legacyPackages.x86_64-linux.python311
      ];
    };
  };
}
