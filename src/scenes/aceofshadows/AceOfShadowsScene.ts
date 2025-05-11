import { Node } from "src/node/Node";
import { Container, IDestroyOptions, IPointData, IRenderer } from "pixi.js";
import { BackButton } from "src/button/BackButton";
import { Card } from "./card/Card";
import { CardsFactory } from "./card/CardsFactory";
import { CardsStack } from "./card/CardsStack";
import { SceneManager } from "../SceneManager";
import { MainMenuScene } from "../mainmenu/MainMenuScene";
import { CircularCardTransformProvider, RandomCardTransformProvider } from "./card/CardTransformProvider";

const otherCardStacksCount = 4;
const otherCardStacksRotationOffset = Math.PI / 8;
const otherCardStacksDistance = 400;

/**
 * Ace of Shadows scene: displays 144 sprites stacked as cards.
 * The top card moves to a different stack every 1 second with a 2-second animation
 */
export class AceOfShadowsScene extends Node {
	private readonly _renderer: IRenderer;
	private readonly _sceneManager: SceneManager;

	private readonly _cardContainer: Container;
	private readonly _backButton: BackButton;

	private readonly _cards: Card[];
	private readonly _centralCardsStack: CardsStack;
	private readonly _otherCardsStacks: CardsStack[] = [];

	private _currentCardStackIndex = 0;

	private _moveTimer = 0;

	public constructor(renderer: IRenderer, sceneManager: SceneManager) {
		super();

		this._renderer = renderer;
		this._sceneManager = sceneManager;

		this.width = renderer.width;
		this.height = renderer.height;

		// Create a container for all cards
		this._cardContainer = new Container();
		this._cardContainer.sortableChildren = true;
		this.addChild(this._cardContainer);

		this._cards = CardsFactory.createCards(this._cardContainer, renderer);

		this._centralCardsStack = new CardsStack(new CircularCardTransformProvider(this._cardContainer), this._cards);

		const rotationStep = Math.PI / otherCardStacksCount;
		for (let i = 0; i < otherCardStacksCount; i++) {
			const offset: IPointData = {
				x: this._cardContainer.x + Math.cos(i * rotationStep + otherCardStacksRotationOffset) * otherCardStacksDistance,
				y: this._cardContainer.y + Math.sin(i * rotationStep + otherCardStacksRotationOffset) * otherCardStacksDistance
			};

			this._otherCardsStacks.push(new CardsStack(new RandomCardTransformProvider(this._cardContainer, offset)));
		}

		// Create back button
		this._backButton = new BackButton();
		this._backButton.y = 250;
		this._backButton.onPress.connect(this._onBackButtonClick.bind(this));
		this.addChild(this._backButton);
	}

	public override destroy(options?: IDestroyOptions | boolean): void {
		this._backButton.destroy(options);

		super.destroy(options);
	}

	public override stop(): void {
		this._centralCardsStack.stop();

		for (const stack of this._otherCardsStacks) {
			stack.stop();
		}
	}

	public override update(deltaTime: number): void {
		super.update(deltaTime);

		this._moveTimer += deltaTime;
		if (this._moveTimer < 1) {
			return;
		}

		this._moveTimer = 0;

		const card = this._centralCardsStack.popCard();
		if (!card) {
			return;
		}

		void this._otherCardsStacks[this._currentCardStackIndex].pushCard(card);

		this._currentCardStackIndex = (this._currentCardStackIndex + 1) % this._otherCardsStacks.length;
	}

	public override resize(width: number, height: number): void {
		this.position.set(width / 2, height / 2);

		super.resize(width, height);
	}

	private _onBackButtonClick(): void {
		this._sceneManager.showScene(new MainMenuScene(this._renderer, this._sceneManager));
	}
}
