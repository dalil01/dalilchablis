// https://github.com/tancredi/fantasticon

const dcIconDir = "./src/app/ui/dcIcons/";
const dcIconCssDir = dcIconDir + "css/";
const dcIconFontsDir = dcIconDir + "fonts/";

module.exports = {
    name: "dcIcons",
    inputDir: dcIconDir + "svg",
    outputDir: dcIconDir,
    fontTypes: ["eot", "svg", "ttf", "woff", "woff2"],
    assetTypes: ["css", "ts"],
    fontHeight: 300,
    descent : 45,
    normalize : true,
    fontsUrl: "../fonts",
    prefix: "dcIcon",
    formatOptions: {
        ts: {
            // select what kind of types you want to generate (default `['enum', 'constant', 'literalId', 'literalKey']`)
            types: ["enum"]
        }
    },
    // Use a custom Handlebars template
    templates: {
        css: dcIconCssDir + "dcIcons.css.hbs"
    },
    pathOptions: {
        eot: dcIconFontsDir + "dcIcons.eot",
        svg: dcIconFontsDir + "dcIcons.svg",
        ttf: dcIconFontsDir + "dcIcons.ttf",
        woff: dcIconFontsDir + "dcIcons.woff",
        woff2: dcIconFontsDir + "dcIcons.woff2",
        css: dcIconCssDir + "dcIcons.css",
        ts: dcIconDir + "dcIcons.ts"
    },
    // Customize generated icon IDs (unavailable with `.json` config file)
    getIconId: ({
        basename, // `string` - Example: 'foo';
        relativeDirPath, // `string` - Example: 'sub/dir/foo.svg'
        absoluteFilePath, // `string` - Example: '/var/icons/sub/dir/foo.svg'
        relativeFilePath, // `string` - Example: 'foo.svg'
        index // `number` - Example: `0`
    }) => ["dcIcon-" + basename].join('-')
};