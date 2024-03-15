import { Translation } from "./src/app/translations/Translation.js";

const translatorDir = "./src/app/ui/translator/";

const translationConfig = {
    translationEnum: Translation,
    outputDir: translatorDir + "translations",
    locales: ["EN", "FR"],
}

// TODO
const translationEnum = translationConfig.translationEnum;

console.log(translationEnum);
