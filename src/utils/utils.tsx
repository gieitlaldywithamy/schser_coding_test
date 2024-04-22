export const removeDuplicates = (input: string[]): string[] => input.filter((element, index) => {
    return input.indexOf(element) === index;
});

export const replaceSpaceWithPlus = (input: string): string => input.replace(/ /g, '+');

export const splitByComma = (input: string): string[] => input.split(',');

export const stringSearchParamsToArray = (searchQuery: string): string[] => splitByComma(searchQuery.replace(/ /g, '+'));