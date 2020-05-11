/*!
simulate.js

Created by David Rowe on 9 Dec 2018.
Copyright 2018 David Rowe.

Information: http://ctrlaltstudio.com/vircadia/radar

Simulates AvatarManager function for testing purposes.
To use, append the following line to radar.js:
    Script.include(Script.resolvePath("simulate.js"));

Distributed under the Apache License, Version 2.0.
See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
*/

/* global SimulateAvatarManager:true, AvatarManager, MyAvatar, Uuid, Vec3 */

var SimulateAvatarManager = (function () {

    "use strict";

    var NUMBER_OF_AVATARS = 100,
        AVATATR_UPDATE_SKIP_DISTANCE = 10,
        RANGE = 50,
        palData = [];

    function updateMyAvatarData() {
        palData[0] = {
            position: MyAvatar.position,
            sessionDisplayName: MyAvatar.sessionDisplayName,
            sessionUUID: MyAvatar.sessionUUID
        };
    }

    function updateSomeAvatarPositions() {
        var i = 1,
            length = palData.length,
            deltaX, deltaY, deltaZ;

        while (i < length) {
            deltaX = RANGE / 100 * (Math.random() - 0.5);
            deltaY = 0;
            deltaZ = RANGE / 100 * (Math.random() - 0.5);
            palData[i].position = Vec3.sum(palData[i].position, { x: deltaX, y: deltaY, z: deltaZ });
            i += AVATATR_UPDATE_SKIP_DISTANCE;
        }
    }

    function getAvatarsInRange(position, radius) {
        // ["{ef1076f3-c190-4092-bc64-6fc6701ca4da}", "{ba2456b3-da3c-4c32-9973-be7a44193f22}"]
        var result = [],
            i, length;
        updateMyAvatarData();
        for (i = 0, length = palData.length; i < length; i += 1) {
            if (Vec3.distance(position, palData[i].position) <= radius) {
                result.push(palData[i].sessionUUID);
            }
        }
        return result;
    }

    function getPalData(avatarIDs) {
        // [{ "audioLoudness": 0, "isReplicated": false, "palOrbOffset": 0.272033154964447,
        //   "position": { "x": 55.047298431396484, "y": -9.522367477416992, "z": -73.89450073242188 },
        //   "sessionDisplayName": "ctrlaltdavid",
        //   "sessionUUID": ""},...]
        var result = [],
            i, length;

        updateMyAvatarData();
        updateSomeAvatarPositions();

        for (i = 0, length = palData.length; i < length; i += 1) {
            if (avatarIDs.indexOf(palData[i].sessionUUID) !== -1) {
                result.push(palData[i]);
            }
        }

        return {
            data: result
        };
    }

    function generatePalData(numAvatars, position, range) {
        // Generate avatars in horizontal range centered on specified location, with somewhat varying elevations.
        var deltaX, deltaY, deltaZ,
            i;

        updateMyAvatarData();
        for (i = 0; i < numAvatars; i += 1) {
            deltaX = 2 * (Math.random() - 0.5) * range;
            deltaY = 2 * (Math.random() - 0.5) * 1.0;
            deltaZ = 2 * (Math.random() - 0.5) * range;

            palData.push({
                position: Vec3.sum(position, { x: deltaX, y: deltaY, z: deltaZ }),
                sessionDisplayName: "Simulation_" + i.toString(),
                sessionUUID: Uuid.generate()
            });
        }
    }

    // Wait a bit for MyAvatar.position to become valid.
    Script.setTimeout(function () {
        generatePalData(NUMBER_OF_AVATARS / 3, MyAvatar.position, RANGE);
        generatePalData(NUMBER_OF_AVATARS / 3, Vec3.sum(MyAvatar.position, { x: 0, y: RANGE / 2, z: 0 }), RANGE);
        generatePalData(NUMBER_OF_AVATARS - palData.length, Vec3.sum(MyAvatar.position, { x: 0, y: -RANGE / 2, z: 0 }), RANGE);
    }, 1000);

    return {
        getAvatarsInRange: getAvatarsInRange,
        getPalData: getPalData
    };
}());

// Override select methods.
AvatarManager.getAvatarsInRange = SimulateAvatarManager.getAvatarsInRange;
AvatarManager.getPalData = SimulateAvatarManager.getPalData;
