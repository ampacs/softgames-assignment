import { Application } from "pixi.js";
import { RootNode } from "src/node/RootNode";

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

	rootNode.start();
}

main();
