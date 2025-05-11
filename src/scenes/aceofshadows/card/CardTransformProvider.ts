import { Container, IPointData } from "pixi.js";
import { Card } from "./Card";
import gsap from "gsap";

export type CardTransform = {
	x: number,
	y: number,
	rotation: number,
	zIndex: number
}

export interface ICardTransformProvider {
	getCardTransform(card: Card, increment: number): CardTransform
}

const defaultCardPlacementOptions = {
	rotationIncrement: Math.PI * 2,
	rotationVariation: Math.PI / 8,
	positionOffset: 10
} as const;

export class RandomCardTransformProvider implements ICardTransformProvider {
	private readonly _container: Container;
	private readonly _offset: IPointData;

	public constructor(container: Container, offset: IPointData) {
		this._container = container;
		this._offset = offset;
	}

	public getCardTransform(card: Card, increment: number): CardTransform {
		// spin the card so that it's more or less aligned with the container's rotation
		let rotationOffset = card.rotation + defaultCardPlacementOptions.rotationIncrement;
		rotationOffset += this._container.rotation % (Math.PI * 2) - rotationOffset % (Math.PI * 2);
		rotationOffset += gsap.utils.random(-defaultCardPlacementOptions.rotationVariation, defaultCardPlacementOptions.rotationVariation);

		const xOffset = gsap.utils.random(-defaultCardPlacementOptions.positionOffset, defaultCardPlacementOptions.positionOffset);
		const yOffset = gsap.utils.random(-defaultCardPlacementOptions.positionOffset, defaultCardPlacementOptions.positionOffset);

		return {
			x: this._offset.x + card.x + xOffset,
			y: this._offset.y + card.y + yOffset,
			rotation: rotationOffset,
			zIndex: increment
		};
	}
}

const defaultCircularCardPlacementOptions = {
	angleStep: 0.2,
	distanceStep: 0.5
} as const;

export class CircularCardTransformProvider implements ICardTransformProvider {
	private readonly _container: Container;

	public constructor(container: Container) {
		this._container = container;
	}

	public getCardTransform(card: Card, increment: number): CardTransform {
		const rotationOffset = increment * defaultCircularCardPlacementOptions.angleStep;
		const distanceOffset = increment * defaultCircularCardPlacementOptions.distanceStep;

		return {
			x: this._container.x + Math.cos(rotationOffset) * distanceOffset,
			y: this._container.y + Math.sin(rotationOffset) * distanceOffset,
			rotation: this._container.rotation + rotationOffset,
			zIndex: increment
		};
	}
}
