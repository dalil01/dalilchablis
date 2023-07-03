import { viteStaticCopy } from "vite-plugin-static-copy";
import gltfPlugin from 'vite-plugin-gltf';
import { VitePWA } from 'vite-plugin-pwa';

const MANIFEST_ICONS_URL = "https://dalilchablis.com/manifest_icons/";

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
        assetsDir: "app",
        sourcemap: true,
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                },
            },
        },
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
                    src: "libs/draco/*.{js,wasm}",
                    dest: "../dist/libs/draco"
                },
                {
                    src: "libs/draco/gltf/*.{js,wasm}",
                    dest: "../dist/libs/draco/gltf"
                },
                {
                    src: "assets/images/manifest_icons/*.png",
                    dest: "../dist/manifest_icons"
                }
            ]
        }),
        VitePWA({
            registerType: "autoUpdate",
            manifest: {
                name: "Dalil CHABLIS",
                short_name: "Dalil CHABLIS",
                start_url: "https://dalilchablis.com/",
                display: "standalone",
                background_color: "#F7F7F7",
                background_color_dark: "#242424",
                theme_color: "#F7F7F7",
                theme_color_dark: "#242424",
                icons: [
                    {
                        src: MANIFEST_ICONS_URL + "dcLogoWhite192.png",
                        sizes: "192x192",
                        type: "image/png",
                        media: "(prefers-color-scheme: light)"
                    },
                    {
                        src: MANIFEST_ICONS_URL + "dcLogoWhite196.png",
                        sizes: "196x196",
                        type: "image/png",
                        purpose: "any maskable",
                        media: "(prefers-color-scheme: light)"
                    },
                    {
                        src: MANIFEST_ICONS_URL + "dcLogoWhite512.png",
                        sizes: "512x512",
                        type: "image/png",
                        media: "(prefers-color-scheme: light)"
                    },
                    {
                        src: MANIFEST_ICONS_URL + "dcLogoBlack192.png",
                        sizes: "192x192",
                        type: "image/png",
                        media: "(prefers-color-scheme: dark)"
                    },
                    {
                        src: MANIFEST_ICONS_URL + "dcLogoBlack196.png",
                        sizes: "196x196",
                        type: "image/png",
                        purpose: "any maskable",
                        media: "(prefers-color-scheme: dark)"
                    },
                    {
                        src: MANIFEST_ICONS_URL + "dcLogoBlack512.png",
                        sizes: "512x512",
                        type: "image/png",
                        media: "(prefers-color-scheme: dark)"
                    }
                ]
            },
            workbox: {
                cleanupOutdatedCaches: true
            }
        })
    ]
}