/*!
avatarDisperser.js

Created by David Rowe on 19 Apr 2020
Copyright 2020 David Rowe.

Disperses avatars spawning in a domain so that they don't land at the same coordinates as each other. Set up this script as a
client entity script in an (invisible, collisionless) entity at the landing point in the domain.

Distributed under the Apache License, Version 2.0.
See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
*/

/* global Entities, MyAvatar, Vec3 */

(function () {

    "use strict";

    var SPAWN_POINT_RADIUS_TOLERANCE = 0.1,
        SPAWN_POINT_ELEVATION_TOLERANCE = 2,
        DISPERSAL_MIN_RADIUS = 1.0,
        DISPERSAL_MAX_RADIUS = 5.0;

    this.preload = function (entityID) {
        var spawnPosition, spawnHPosition, spawnVPosition,
            avatarPosition, avatarHPosition, avatarVPosition,
            randomAngle, randomRadius, randomPosition;

        spawnPosition = Entities.getEntityProperties(entityID, "position").position,
        spawnHPosition = Vec3.multiplyVbyV(spawnPosition, { x: 1, y: 0, z: 1 }),
        spawnVPosition = spawnPosition.y,

        avatarPosition = MyAvatar.position,
        avatarHPosition = Vec3.multiplyVbyV(avatarPosition, { x: 1, y: 0, z: 1 }),
        avatarVPosition = avatarPosition.y;

        if (Vec3.distance(avatarHPosition, spawnHPosition) <= SPAWN_POINT_RADIUS_TOLERANCE
            && (Math.abs(avatarVPosition - spawnVPosition)) <= SPAWN_POINT_ELEVATION_TOLERANCE) {
            randomAngle = Math.random() * 2.0 * Math.PI,
            randomRadius = DISPERSAL_MIN_RADIUS + Math.random() * (DISPERSAL_MAX_RADIUS - DISPERSAL_MIN_RADIUS),
            randomPosition = Vec3.sum(avatarPosition, Vec3.fromPolar({
                x: 0,
                y: randomAngle,
                z: randomRadius
            }));
            MyAvatar.position = randomPosition;
        }
    };

})
