import { Sprite, Texture } from "pixi.js";
import { Node } from "src/node/Node";

export class Card extends Node {
	private readonly _sprite: Sprite;

	public get sprite() : Sprite {
		return this._sprite;
	}

	public constructor(texture: Texture, width: number, height: number) {
		super();

		this._sprite = new Sprite(texture);
		this._sprite.anchor.set(0.5);
		this.addChild(this._sprite);

		this.width = width;
		this.height = height;
	}
}
