import { Node } from "src/node/Node";
import { Text, TextStyle } from "pixi.js";
import { List } from "@pixi/ui";
import { GameTextButton } from "src/button/GameTextButton";
import { MainMenuOption, MainMenuOptions } from "./MainMenuOptions";

/**
 * Main Menu scene with options to navigate to each assignment task
 */
export class MainMenuScene extends Node {
	private readonly _title: Text;
	private readonly _menuList: List;

	public constructor() {
		super();

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
		this.emit("menuSelect", option);
	}
}
