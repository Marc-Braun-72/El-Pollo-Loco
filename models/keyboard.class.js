/**
 * Represents the state of the keyboard inputs for controlling the character in the game.
 * Contains boolean flags for each key or touch control.
 */
class Keyboard {

    /**
     * Indicates if the left arrow key is pressed.
     * @type {boolean}
     */
    LEFT = false;

    /**
     * Indicates if the right arrow key is pressed.
     * @type {boolean}
     */
    RIGHT = false;

    /**
     * Indicates if the up arrow key is pressed.
     * @type {boolean}
     */
    UP = false;

    /**
     * Indicates if the down arrow key is pressed.
     * @type {boolean}
     */
    DOWN = false;

    /**
     * Indicates if the space bar is pressed, often used for jumping.
     * @type {boolean}
     */
    SPACE = false;

    /**
     * Indicates if the 'D' key is pressed, often used for throwing objects.
     * @type {boolean}
     */
    D = false;

    /**
     * Indicates if the touch control for moving left is active.
     * @type {boolean}
     */
    TOUCH_LEFT = false;

    /**
     * Indicates if the touch control for moving right is active.
     * @type {boolean}
     */
    TOUCH_RIGHT = false;

    /**
     * Indicates if the touch control for jumping is active.
     * @type {boolean}
     */
    TOUCH_JUMP = false;

    /**
     * Indicates if the touch control for throwing objects is active.
     * @type {boolean}
     */
    TOUCH_THROW = false;
}
