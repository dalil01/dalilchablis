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
        rollupOptions: {
            input: {
                './assets/videos/video.mp4': dcGlobalVars.OUTSIDE_VIDEO
            }
        }
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