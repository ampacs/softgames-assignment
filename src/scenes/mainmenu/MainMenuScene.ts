import { Node } from "src/node/Node";
import { IRenderer, Text, TextStyle } from "pixi.js";
import { List } from "@pixi/ui";
import { GameTextButton } from "src/button/GameTextButton";
import { MainMenuOption, MainMenuOptions } from "./MainMenuOptions";
import { SceneManager } from "../SceneManager";
import { AceOfShadowsScene } from "../aceofshadows/AceOfShadowsScene";

/**
 * Main Menu scene with options to navigate to each assignment task
 */
export class MainMenuScene extends Node {
	private readonly _title: Text;
	private readonly _menuList: List;

	private readonly _renderer: IRenderer;
	private readonly _sceneManager: SceneManager;

	public constructor(renderer: IRenderer, sceneManager: SceneManager) {
		super();

		this._renderer = renderer;
		this._sceneManager = sceneManager;

		// create title
		const titleStyle = new TextStyle({
			fontFamily: "Arial",
			fontSize: 36,
			fontWeight: "bold",
			fill: "#ffffff"
		});

		this._title = new Text("SOFTGAMES Assignment", titleStyle);
		this._title.y = -125;
		this._title.anchor.set(0.5, 1);
		this.addChild(this._title);

		// create menu list
		this._menuList = new List({
			type: "vertical",
			elementsMargin: 20
		});
		this._menuList.y = 25;
		this._title.anchor.set(0.5, 0);
		this.addChild(this._menuList);

		for (const option of MainMenuOptions) {
			const button = new GameTextButton(
				option,
				240, // width
				60, // height
				{
					fill: 0xFFFFFF
				}
			);
			button.onPress.connect(this.onMenuItemClick.bind(this, option));

			this._menuList.addChild(button);
		}
	}

	public override resize(width: number, height: number): void {
		this.position.set(
			width / 2,
			height / 2
		);

		super.resize(width, height);
	}

	private onMenuItemClick(option: MainMenuOption): void {
		// create and show the selected scene
		switch (option) {
		case MainMenuOption.ACE_OF_SHADOWS: {
			const scene = new AceOfShadowsScene(this._renderer, this._sceneManager);

			this._sceneManager.showScene(scene);
			break;
		}
		case MainMenuOption.MAGIC_WORDS:
			// TODO: Implement Magic Words scene
			console.log("Magic Words scene not yet implemented");
			break;

		case MainMenuOption.PHOENIX_FLAME:
			// TODO: Implement Phoenix Flame scene
			console.log("Phoenix Flame scene not yet implemented");
			break;
		}
	}
}
