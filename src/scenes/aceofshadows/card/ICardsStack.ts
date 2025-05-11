import { Card } from "./Card";

export interface ICardsStack {
	pushCard(card: Card): Promise<void>
	popCard(): Card | undefined
}
