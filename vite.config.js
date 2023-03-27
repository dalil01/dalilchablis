export default {
    root: "src",
    publicDir: "public",
    server: {
        port: 1200
    },
    build: {
        outDir: "../dist",
        rollupOptions: {
            output: {
                // Copie le fichier .htaccess du dossier "public" vers le dossier "dist"
                copy: [{
                    from: "public/.htaccess",
                    to: ".htaccess"
                }]
            }
        }
    }
}