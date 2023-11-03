import i18n from 'i18next';
import measure from "./i18n/measure.i18n"
import {initReactI18next} from "react-i18next";

export const resources = {
    ru: {
        measure
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
    ns: typeof resources['ru'],
    initImmediate: false,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
