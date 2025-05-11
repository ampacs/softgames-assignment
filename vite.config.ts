import { defineConfig, Plugin, Rollup } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from "fs";
import path from "path";

const handleIndexHtml: Plugin = {
	name: "handle-index-html",
	writeBundle(options: Rollup.NormalizedOutputOptions): void {
		fs.cpSync(
			path.resolve(options.dir ?? "dist", "public", "index.html"),
			path.resolve(options.dir ?? "dist", "index.html")
		);
		fs.rmSync(path.resolve(options.dir ?? "dist", "public"), {
			recursive: true,
			force: true
		});
	}
};

export default defineConfig({
	base: "https://ampacs.github.io/softgames-assignment/",
	root: "./",
	publicDir: "public",
	build: {
		outDir: "dist",
		emptyOutDir: true,
		sourcemap: true,
		rollupOptions: {
			input: {
				main: path.resolve(__dirname, "public", "index.html")
			}
		}
	},
	resolve: {
		alias: {
			src: "/src"
		}
	},
	server: {
		host: true,
		open: true
	},
	plugins: [
		tsconfigPaths(),
		handleIndexHtml
	]
});
