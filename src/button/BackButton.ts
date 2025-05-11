import { GameTextButton } from "./GameTextButton";

export class BackButton extends GameTextButton {
	public constructor() {
		super(
			"Back to Main Menu",
			200, // width
			50, // height
			{
				fill: 0xFFFFFF,
				fontSize: 18
			}
		);
	}
}
