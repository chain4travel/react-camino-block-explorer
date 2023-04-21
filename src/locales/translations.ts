import { ConvertedToObjectType, TranslationJsonType } from './types'

/**
 * This file is seperate from the './i18n.ts' simply to make the Hot Module Replacement work seamlessly.
 * Your components can import this file in 'messages.ts' files which would ruin the HMR if this isn't a separate module
 */
export const translations: ConvertedToObjectType<TranslationJsonType> =
    {} as ConvertedToObjectType<TranslationJsonType>

/*
 * Converts the static JSON file into an object where keys are identical
 * but values are strings concatenated according to syntax.
 * This is helpful when using the JSON file keys and still having the intellisense support
 * along with type-safety
 */
type TranslationObject = { [key: string]: string } // Define el tipo de objeto de traducción

export const convertLanguageJsonToObject = (
    json: { [key: string]: string | Record<string, unknown> },
    objToConvertTo: TranslationObject = translations,
    current?: string,
): void => {
    Object.keys(json).forEach(key => {
        const currentLookupKey = current ? `${current}.${key}` : key
        if (typeof json[key] === 'object') {
            objToConvertTo[key] = {} as TranslationObject
            convertLanguageJsonToObject(
                json[key] as { [key: string]: string | Record<string, unknown> },
                objToConvertTo[key],
                currentLookupKey,
            )
        } else {
            objToConvertTo[key] = currentLookupKey
        }
    })
}
