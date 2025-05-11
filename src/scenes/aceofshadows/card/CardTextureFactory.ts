import { Graphics, IRenderer, Texture } from "pixi.js";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CardTextureFactory {
	private constructor() {
		/* disable instantiation */
	}

	public static createCardTexture(renderer: IRenderer, cardWidth: number, cardHeight: number): Texture {
		const graphics = new Graphics();

		// draw card background
		graphics.beginFill(0x333333);
		graphics.lineStyle(2, 0xFFFFFF);
		graphics.drawRoundedRect(0, 0, cardWidth, cardHeight, 10);
		graphics.endFill();

		// draw card design (simple pattern)
		graphics.beginFill(0x4477CC);
		graphics.drawRoundedRect(10, 10, cardWidth - 20, cardHeight - 20, 5);
		graphics.endFill();

		// add some decorative elements
		graphics.lineStyle(2, 0xFFFFFF);
		graphics.drawCircle(cardWidth / 2, cardHeight / 2, 30);

		// draw a simple star pattern
		const centerX = cardWidth / 2;
		const centerY = cardHeight / 2;
		const spikes = 5;
		const outerRadius = 25;
		const innerRadius = 15;

		graphics.beginFill(0xF9D64A);

		let rotation = Math.PI / 2 * 3;
		const step = Math.PI / spikes;

		graphics.moveTo(centerX, centerY - outerRadius);

		for (let i = 0; i < spikes; i++) {
			graphics.lineTo(
				centerX + Math.cos(rotation) * outerRadius,
				centerY + Math.sin(rotation) * outerRadius
			);
			rotation += step;

			graphics.lineTo(
				centerX + Math.cos(rotation) * innerRadius,
				centerY + Math.sin(rotation) * innerRadius
			);
			rotation += step;
		}

		graphics.lineTo(centerX, centerY - outerRadius);
		graphics.endFill();

		return renderer.generateTexture(graphics);
	}
}
