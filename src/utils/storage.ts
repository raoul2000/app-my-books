const storagePrefix = "my_books_";

const storage = {
    getApiKey: () => {
        //TODO: no need to parse as apiKey is a string NOT an object
        return JSON.parse(
            window.localStorage.getItem(`${storagePrefix}apiKey`) as string
        );
    },
    setApiKey: (apiKey: string) => {
        //TODO: no need to stringify as apiKey is a string NOT an object
        window.localStorage.setItem(
            `${storagePrefix}apiKey`,
            JSON.stringify(apiKey)
        );
    },
    hasApiKey : ():boolean => storage.getApiKey() ? true : false,
    clearApiKey: () => {
        window.localStorage.removeItem(`${storagePrefix}apiKey`);
    },
};

export default storage;
