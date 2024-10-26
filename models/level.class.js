/**
 * Represents a game level, containing enemies, clouds, and background objects.
 */
class Level {

    /**
     * Array of enemies present in the level.
     * @type {MoveableObject[]}
     */
    enemies;

    /**
     * Array of clouds present in the level.
     * @type {MoveableObject[]}
     */
    clouds;

    /**
     * Array of background objects present in the level.
     * @type {DrawableObject[]}
     */
    backgroundObjects;

    /**
     * The x-coordinate where the level ends.
     * @type {number}
     */
    level_end_x = 2200;

    /**
     * Creates a new Level instance with specified enemies, clouds, and background objects.
     * @param {MoveableObject[]} enemies - Array of enemy objects in the level.
     * @param {MoveableObject[]} clouds - Array of cloud objects in the level.
     * @param {DrawableObject[]} backgroundObjects - Array of background objects in the level.
     */
    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}
