export interface INode {
	/**
	 * Starts a scene. Meant for initialization when the scene is loaded and displayed.
	 * Should only be called once after creating a scene, or after calling `stop`.
	 */
	start?(): void
	/**
	 * Starts a scene. Meant for uninitialization when the scene is unloaded.
	 * Should only be called once after starting a scene by calling `start`.
	 */
	stop?(): void
	/**
	 * Updates the elements of a scene each frame.
	 *
	 * @param {number} deltaTime the time since the last frame.
	 */
	update(deltaTime: number): void
	/**
	 * Called when the game canvas is resized.
	 *
	 * @param width new width of the window
	 * @param height new height of the window
	 */
	resize(width: number, height: number): void
}
