import { Container, IRenderer } from "pixi.js";
import { CardTextureFactory } from "./CardTextureFactory";
import { Card } from "./Card";

const defaultCardCreationOptions: Partial<CardCreationOptions> = {
	count: 144,
	width: 120,
	height: 180
} as const;

export type CardCreationOptions = {
	count: number;
	width: number;
	height: number;
};

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CardsFactory {
	private constructor() {
		/* disable instantiation */
	}

	public static createCards(container: Container, renderer: IRenderer, options?: Partial<CardCreationOptions>): Card[] {
		const cardCreationOptions = { ...defaultCardCreationOptions, ...options } as CardCreationOptions;

		const texture = CardTextureFactory.createCardTexture(renderer, cardCreationOptions.width, cardCreationOptions.height);

		const cards: Card[] = new Array<Card>(cardCreationOptions.count);
		for (let i = 0; i < cardCreationOptions.count; i++) {
			const card = new Card(texture, cardCreationOptions.width, cardCreationOptions.height);

			cards[i] = card;

			container.addChild(card);
		}

		return cards;
	}
}
