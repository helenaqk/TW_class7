# TW_class7

Access to many of the device’s sensors in a webpage running on a local server is only available through an HTTPS connection.

To enable HTTPS locally, you’ll need to install OpenSSL and generate self-signed certificates:

1. Open PowerShell/Terminal as administrator

2. Run the following code using your OS' package manager to install OpenSSL:

# 2.1 Windows
`winget install openssl`
(If winget is not available, install App Installer from Microsoft Store.)

# 2.2 Mac
`brew install openssl`
`brew install openssl@3`
(Try one of these, depending on your setup)

# 2.3 Linux
`sudo apt install openssl` (Debian/Ubuntu)
`sudo dnf install openssl` (Fedora)
`sudo pacman -S openssl` (Arch)

3. In VS Code or any terminal inside your project folder, run:
`mkdir certs`
`cd certs`
`openssl req -nodes -new -x509 -keyout key.pem -out cert.pem -days 365`

3.1. If 'openssl' is not recognized as the name of a cmdlet, function, script file, or operable program, run:
`$env:Path += ";C:\Program Files\OpenSSL-Win64\bin"` (Windows)
`export PATH="$PATH:/opt/homebrew/opt/openssl@3/bin"` or `export PATH="$PATH:/usr/local/opt/openssl@3/bin"` (Mac)
and try step 3. again.

4. You can skip through the whole Distinguished Name (DN) fields protocol (press Enter repeatedly).

5. All done!