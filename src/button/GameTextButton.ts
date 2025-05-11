import { ButtonOptions, FancyButton } from "@pixi/ui";
import { IDestroyOptions, ITextStyle, Text, TextStyle } from "pixi.js";
import { Node } from "src/node/Node";

const defaultTextStyle: Partial<ITextStyle> = {
	fontFamily: "Arial",
	fontSize: 20,
	align: "center"
};

/**
 * Standardized game button that can be used throughout the application
 */
export class GameTextButton extends Node {
	private readonly _button: FancyButton;
	private readonly _text: Text;

	/**
	 * Event triggered when the button is pressed
	 */
	public get onPress() {
		return this._button.onPress;
	}

	/**
	 * Change the button's enabled state
	 */
	public set enabled(value: boolean) {
		this._button.enabled = value;
	}

	/**
	 * Get the button's current enabled state
	 */
	public get enabled(): boolean {
		return this._button.enabled;
	}

	/**
	 * Create a new GameButton with standard styling
	 * @param label Text to display on the button
	 * @param width Button width
	 * @param height Button height
	 * @param backgroundColor Button background color (default: 0x4477CC)
	 * @param textColor Text color (default: 0xFFFFFF)
	 */
	public constructor(
		label: string,
		width: number,
		height: number,
		textStyle?: Partial<ITextStyle>,
		buttonOptions?: ButtonOptions
	) {
		super();

		textStyle = new TextStyle({ ...defaultTextStyle, ...textStyle });

		this._text = new Text(label, textStyle);
		this._text.anchor.set(0.5);

		this.width = width;
		this.height = height;

		// Create the fancy button and add it to this node
		this._button = new FancyButton({
			...buttonOptions,
			text: this._text,
			animations: {
				hover: {
					props: {
						scale: {
							x: 1.1,
							y: 1.1
						}
					},
					duration: 100
				},
				pressed: {
					props: {
						scale: {
							x: 0.9,
							y: 0.9
						}
					},
					duration: 100
				}
			}
		});

		this.addChild(this._button);
	}

	public destroy(options?: IDestroyOptions | boolean): void {
		this._button.enabled = false;
		this.removeChild(this._button);
		// FIXME: buttons might still be animating when they're about to be destroyed
		setTimeout(() => this._button.destroy(true));

		super.destroy(options);
	}
}
