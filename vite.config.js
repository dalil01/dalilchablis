import { replaceCodePlugin } from "vite-plugin-replace";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default {
    base: "./",
    root: "src",
    publicDir: "public",
    server: {
        port: 1200
    },
    build: {
        outDir: "../dist",
    },
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: ".htaccess",
                    dest: "../dist"
                },
                {
                    src: "assets",
                    dest: "../dist"
                },
                {
                    src: "libs",
                    dest: "../dist"
                }
            ]
        })
    ]
}