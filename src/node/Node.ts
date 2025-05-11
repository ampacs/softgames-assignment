import { Container, DisplayObject } from "pixi.js";
import { INode } from "./INode";

export class Node extends Container implements INode {
	private _isStarted: boolean;

	protected get isStarted() {
		return this._isStarted;
	}

	public constructor() {
		super();

		this._isStarted = false;
	}

	public start(): void {
		if (this._isStarted) {
			return;
		}

		this._isStarted = true;

		for (const child of this.children) {
			const node = child as Partial<INode>;

			if (node.start) {
				node.start();
			}
		}

		this.resize(this.width, this.height);
	}

	public stop(): void {
		if (!this._isStarted) {
			return;
		}

		this._isStarted = false;

		for (const child of this.children) {
			const node = child as Partial<INode>;

			if (node.stop) {
				node.stop();
			}
		}
	}

	public resize(width: number, height: number): void {
		for (const child of this.children) {
			const node = child as Partial<INode>;

			if (node.resize) {
				node.resize(width, height);
			}
		}
	}

	public update(deltaTime: number): void {
		for (const child of this.children) {
			const node = child as Partial<INode>;

			if (node.update) {
				node.update(deltaTime);
			}
		}
	}

	public override addChild<T extends DisplayObject[]>(...children: T): T[0] {
		const firstChild = super.addChild(...children);

		if (this._isStarted) {
			for (const child of children) {
				const node = child as Partial<INode>;

				if (node.start) {
					node.start();
				}
			}
		}

		return firstChild;
	}

	public override removeChild<T extends DisplayObject[]>(...children: T): T[0] {
		if (this._isStarted) {
			for (const child of children) {
				if (child.parent !== this) {
					continue;
				}

				const node = child as Partial<INode>;

				if (node.stop) {
					node.stop();
				}
			}
		}

		return super.removeChild(...children);
	}

	public override addChildAt<T extends DisplayObject>(child: T, index: number): T {
		child = super.addChildAt(child, index);

		if (this._isStarted) {
			const node = child as Partial<INode>;

			if (node.start) {
				node.start();
			}
		}

		return child;
	}

	public override removeChildAt(index: number): DisplayObject {
		const child = super.getChildAt(index);

		if (this._isStarted) {
			const node = child as Partial<INode>;

			if (node.stop) {
				node.stop();
			}
		}

		return super.removeChildAt(index);
	}

	public override removeChildren(beginIndex?: number, endIndex?: number): DisplayObject[] {
		const start = beginIndex ?? 0;
		const end = endIndex !== undefined && endIndex < this.children.length
			? endIndex
			: this.children.length - 1;

		for (let i = start; i <= end; i++) {
			const child = super.getChildAt(i);
			const node = child as Partial<INode>;

			if (node.stop) {
				node.stop();
			}
		}

		return super.removeChildren(beginIndex, endIndex);
	}
}
