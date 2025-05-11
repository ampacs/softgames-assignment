import { Node } from "src/node/Node";
import { Text, TextStyle } from "pixi.js";

export class FPSCounter extends Node {
	private readonly _text: Text;
	private readonly _samplesCount: number;

	private _currentDeltaTimeIndex: number;
	private _frameDeltaTimeBuffer: number[];

	public constructor(samplesCount: number) {
		super();

		this._text = new Text("FPS: 0.00", new TextStyle({
			fontFamily: "Arial",
			fontSize: 16,
			fill: 0xffffff,
			align: "left"
		}));
		this._text.x = 10;
		this._text.y = 10;

		this._samplesCount = samplesCount;

		this._currentDeltaTimeIndex = 0;
		this._frameDeltaTimeBuffer = new Array<number>(this._samplesCount);
		for (let i = 0; i < this._frameDeltaTimeBuffer.length; i++) {
			this._frameDeltaTimeBuffer[i] = 0;
		}

		this.addChild(this._text);
	}

	public override update(deltaTime: number): void {
		this._frameDeltaTimeBuffer[this._currentDeltaTimeIndex] = deltaTime;
		this._currentDeltaTimeIndex = (this._currentDeltaTimeIndex + 1) % this._samplesCount;

		let accumulatedFrameTime = 0;
		for (const frameDeltaTime of this._frameDeltaTimeBuffer) {
			accumulatedFrameTime += frameDeltaTime;
		}
		accumulatedFrameTime -= deltaTime;

		const fps = Math.round(this._samplesCount / accumulatedFrameTime);
		this._text.text = `FPS: ${fps.toString()}`;
	}
}
