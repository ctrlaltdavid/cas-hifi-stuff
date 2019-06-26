# currentAPI.js

CtrlAltStudio's modified version of High Fidelity's original currentAPI.js script that writes the API to the log file (i.e., 
prior to the UI being added to the script).

Modifications:
- ESLint.
- Ignore Qt functions.
- List top-level objects.
- List build version.
- Code switch to list root items only.
- Make work in all script contexts (i.e., Interface, client entity, etc.).

[LICENSE](LICENSE)
