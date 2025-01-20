// https://github.com/tancredi/fantasticon

const iconsDir = "./src/app/icons/";
const iconCssDir = iconsDir + "css/";
const iconFontsDir = iconsDir + "fonts/";

module.exports = {
    name: "Icons",
    inputDir: iconsDir + "svg",
    outputDir: iconsDir,
    fontTypes: ["eot", "svg", "ttf", "woff", "woff2"],
    assetTypes: ["ts", "css"],
    fontHeight: 300,
    descent : 45,
    normalize : true,
    fontsUrl: "../fonts",
    formatOptions: {
        ts: {
            // select what kind of types you want to generate (default `['enum', 'constant', 'literalId', 'literalKey']`)
            types: ["enum"]
        }
    },
    // Use a custom Handlebars template
    templates: {
        css: iconCssDir + "icons.css.hbs"
    },
    pathOptions: {
        eot: iconFontsDir + "Icons.eot",
        svg: iconFontsDir + "Icons.svg",
        ttf: iconFontsDir + "Icons.ttf",
        woff: iconFontsDir + "Icons.woff",
        woff2: iconFontsDir + "Icons.woff2",
        css: iconCssDir + "icons.css",
        ts: iconsDir + "Icons.ts"
    },
    // Customize generated icon IDs (unavailable with `.json` config file)
    getIconId: ({
        basename, // `string` - Example: 'foo';
        relativeDirPath, // `string` - Example: 'sub/dir/foo.svg'
        absoluteFilePath, // `string` - Example: '/var/icons/sub/dir/foo.svg'
        relativeFilePath, // `string` - Example: 'foo.svg'
        index // `number` - Example: `0`
    }) => ["icon-" + basename].join('-')
};