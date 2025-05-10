import { Application } from "pixi.js";
import { RootNode } from "src/node/RootNode";
import { FPSCounter } from "./fps/FPSCounter";

function main(): void {
	const app = new Application<HTMLCanvasElement>({
		backgroundColor: 0x333333,
		resizeTo: window,
		antialias: true,
		autoDensity: true,
		resolution: window.devicePixelRatio || 1
	});

	document.body.appendChild(app.view);

	const rootNode = new RootNode(app, window);

	const fpsCounter = new FPSCounter(60);
	rootNode.addChild(fpsCounter);

	rootNode.start();
}

main();
