import { Application, ICanvas } from "pixi.js";
import { Node } from "./Node";
import gsap from "gsap";

export class RootNode<T extends ICanvas = ICanvas> extends Node {
	private readonly _application: Application<T>;
	private readonly _window: Window;

	public constructor(application: Application<T>, window: Window) {
		super();

		this._application = application;
		this._window = window;

		gsap.ticker.remove(gsap.updateRoot);
	}

	public override start() {
		this._application.stage.addChild(this);

		this._application.ticker.add(this.update.bind(this));
		this._window.addEventListener("resize", this.resize.bind(this));

		super.start();
	}

	public override stop() {
		super.stop();

		this._application.ticker.remove(this.update.bind(this));
		this._window.removeEventListener("resize", this.resize.bind(this));

		this._application.stage.removeChild(this);
	}

	public override resize(): void {
		super.resize(this._application.screen.width, this._application.screen.height);
	}

	public override update(): void {
		super.update(this._application.ticker.deltaMS / 1_000);

		gsap.updateRoot(this._application.ticker.lastTime / 1_000);
	}
}
