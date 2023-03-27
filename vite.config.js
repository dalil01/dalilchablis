import { viteStaticCopy } from "vite-plugin-static-copy";

export default {
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
                }
            ]
        })
    ]
}