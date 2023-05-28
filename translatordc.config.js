import {dcTranslation} from "./src/app/ui/dcTranslator/dcTranslation";

const translatorDir = "./src/app/ui/dcTranslator/";

const translationConfig = {
    translationEnum: dcTranslation,
    outputDir: translatorDir + "translations",
    locales: ["EN", "FR"],
}

// TODO
const translationEnum = translationConfig.translationEnum;

console.log(translationEnum);
