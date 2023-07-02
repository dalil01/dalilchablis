import { viteStaticCopy } from "vite-plugin-static-copy";
import gltfPlugin from 'vite-plugin-gltf';

export default {
    base: "./",
    root: "src",
    publicDir: "public",
    server: {
        port: 1200,
        sourcemap: true
    },
    build: {
        emptyOutDir: true,
        outDir: "../dist",
        assetsDir: "app"
    },
    plugins: [
        gltfPlugin(),
        viteStaticCopy({
            targets: [
                {
                    src: ".htaccess",
                    dest: "../dist"
                },
                {
                    src: "robots.txt",
                    dest: "../dist"
                },
                {
                    src: "libs/draco/gltf/*.{js,wasm}",
                    dest: "../dist/libs/draco/"
                }
            ]
        })
    ]
}