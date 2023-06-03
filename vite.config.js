import { viteStaticCopy } from "vite-plugin-static-copy";
import {dcGlobalVars} from "./src/app/global/dcGlobalVars";

export default {
    base: "./",
    root: "src",
    publicDir: "public",
    server: {
        port: 1200
    },
    build: {
        outDir: "../dist",
        emptyOutDir: true
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