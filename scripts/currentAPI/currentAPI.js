/*!
currentAPI.js

Created by Clément Brisset on 5/30/14.
Copyright 2014 High Fidelity, Inc.

Modified by David Rowe:
- ESLint.
- Ignore Qt functions.
- List top-level objects.
- List build version.
- Code switch to list root items only.
- Make able to run as client or server entity script.

Distributed under the Apache License, Version 2.0.
See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
*/

/* Client entity and server entity scripts require use of _this. */
var _this = this;

/* Interface, avatar, and assignment client scripts call function expression. */
try {
    if (Script.context === "client" || Script.context === "agent") {
        Script.setTimeout(function () {
            f();
        }, 500);
    }
} catch (e) {
    /* Script object isn't available when evaluating client entity and server entity scripts. */
}

/* Client entity and server entity script require function expression with no "var". */
f = function () {

    "use strict";

    var ROOT_ITEMS_ONLY = false,
        array = [],
        buffer,
        i,
        length;

    function listKeys(string, object) {
        var keys,
            IGNORE_ITEMS = ["_this", "f"],
            QT_IGNORE_ITEMS = ["destroyed", "objectName", "objectNameChanged"],
            i,
            length;

        if (IGNORE_ITEMS.indexOf(string) !== -1) {
            return;
        }

        if (typeof object !== "object" || object === null) {
            array.push(string + " " + typeof object);
            return;
        }

        keys = Object.keys(object);
        for (i = 0, length = keys.length; i < length; i++) {
            if (string === "") {
                if (object === _this && typeof object[keys[i]] === "object" && keys[i] !== "_this") {
                    array.push(keys[i] + " object"); /* Top-level item */
                }
                listKeys(keys[i], object[keys[i]]);
            } else if (keys[i] !== "parent"
                    && !ROOT_ITEMS_ONLY
                    && QT_IGNORE_ITEMS.indexOf(keys[i].split("(")[0]) === -1) {
                listKeys(string + "." + keys[i], object[keys[i]]);
            }
        }
    }

    listKeys("", _this);
    array.sort();

    buffer = "\n========== JS API =========";
    buffer += "\nScript context: " + Script.context;
    if (Script.context !== "entity_server" && Script.context !== "agent") {
        /* HifiAbout is not available to server entity or assignment client scripts. */
        buffer += "\nBuild version: " + HifiAbout.buildVersion;
    }
    buffer += "\n";
    for (i = 0, length = array.length; i < length; i++) {
        buffer += "\n" + array[i];
    }
    buffer += "\n========= API END =========\n";

    print(buffer);

};
