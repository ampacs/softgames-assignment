import { Application } from "pixi.js";
import { MainMenuScene } from "src/scenes/mainmenu/MainMenuScene";
import { RootNode } from "src/node/RootNode";
import { FPSCounter } from "src/fps/FPSCounter";
import { SceneManager } from "./scenes/SceneManager";

function main(): void {
	// Get the canvas element
	const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;

	const app = new Application<HTMLCanvasElement>({
		backgroundColor: 0x333333,
		resizeTo: window,
		antialias: true,
		autoDensity: true,
		resolution: window.devicePixelRatio || 1,
		view: canvas
	});

	const rootNode = new RootNode(app, window);

	const sceneManager = new SceneManager(rootNode, app.renderer);

	const mainMenu = new MainMenuScene();
	sceneManager.showScene(mainMenu);

	const fpsCounter = new FPSCounter(60);
	rootNode.addChild(fpsCounter);

	rootNode.start();
}

main();
