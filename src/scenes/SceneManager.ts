import { Container, IRenderer } from "pixi.js";
import { Node } from "src/node/Node";

/**
 * Interface for scenes that can be managed by SceneManager
 */
export interface ManagedScene {
    /**
     * Called when the scene is being shown
     */
    onShow?(): void;

    /**
     * Called when the scene is being hidden
     */
    onHide?(): void;
}

/**
 * SceneManager handles switching between different scenes in the application
 */
export class SceneManager {
	private readonly _container: Container;
	private readonly _renderer: IRenderer;
	private _activeScene: Node | null = null;

	/**
     * Creates a new SceneManager
     * @param container The container to add scenes to
     * @param renderer The renderer instance
     */
	public constructor(container: Container, renderer: IRenderer) {
		this._container = container;
		this._renderer = renderer;
	}

	/**
     * Get the active scene
     */
	public get activeScene(): Node | null {
		return this._activeScene;
	}

	/**
     * Show a scene directly (without requiring registration)
     * @param scene The scene to show
     */
	public showScene(scene: Node): void {
		// hide and destroy the current scene if one is active
		if (this._activeScene) {
			this._container.removeChild(this._activeScene);

			this._activeScene.destroy({
				children: true
			});
		}

		// show new scene
		this._activeScene = scene;
		this._container.addChild(scene);

		scene.resize(this._renderer.width, this._renderer.height);
	}
}
