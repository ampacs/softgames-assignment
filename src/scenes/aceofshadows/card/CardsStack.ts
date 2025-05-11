import { Card } from "./Card";
import { ICardsStack } from "./ICardsStack";
import gsap from "gsap";
import { ICardTransformProvider } from "./CardTransformProvider";

export class CardsStack implements ICardsStack {
	private readonly _cards: Card[];

	private readonly _cardTransformProvider: ICardTransformProvider;

	private _currentCardIndex = 0;

	private _animations: GSAPAnimation[] = [];

	public constructor(cardTransformProvider: ICardTransformProvider, cards: Card[] = []) {
		this._cardTransformProvider = cardTransformProvider;
		this._cards = cards;

		for (let i = 0; i < this._cards.length; i++) {
			const card = this._cards[i];

			this._setupCard(card, i);
		}

		this._currentCardIndex = this._cards.length - 1;
	}

	public stop(): void {
		for (const animation of this._animations) {
			animation.kill();
		}

		this._animations = [];
	}

	public async pushCard(card: Card): Promise<void> {
		let index = this._cards.findIndex(c => card === c);
		// if the card is present in the stack of cards
		if (index !== -1) {
			// move it to the top of the stack
			for (let i = index + 1; i <= this._currentCardIndex; i++) {
				this._cards[i - 1] = this._cards[i];

				this._setupCard(this._cards[i - 1], i - 1);
			}

			this._cards[this._currentCardIndex] = card;
		} else {
			// else, add it to the top of the stack
			this._cards.push(card);

			index = this._cards.length;

			this._currentCardIndex++;
		}

		await this._animateCardSetup(card, index);
	}

	public popCard(): Card | undefined {
		const card = this._cards[this._currentCardIndex];

		this._currentCardIndex--;

		return card;
	}

	private async _animateCardSetup(card: Card, index: number): Promise<void> {
		const transform = this._cardTransformProvider.getCardTransform(card, index);

		if (card.zIndex < transform.zIndex) {
			card.zIndex = transform.zIndex;
		}

		const animation = gsap.to(card, {
			x: transform.x,
			y: transform.y,
			rotation: transform.rotation,
			delay: 1,
			duration: 2
		});

		this._animations.push(animation);
		await animation;
		this._animations.splice(this._animations.findIndex(anim => anim === animation), 1);
		animation.kill();

		card.zIndex = transform.zIndex;
	}

	private _setupCard(card: Card, index: number): void {
		const transform = this._cardTransformProvider.getCardTransform(card, index);

		card.position.set(transform.x, transform.y);
		card.rotation = transform.rotation;
		card.zIndex = transform.zIndex;
	}
}
