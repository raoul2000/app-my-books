const storagePrefix = "my_books_";

const storage = {
    getApiKey: () => {
        return JSON.parse(
            window.localStorage.getItem(`${storagePrefix}apiKey`) as string
        );
    },
    setApiKey: (apiKey: string) => {
        window.localStorage.setItem(
            `${storagePrefix}apiKey`,
            JSON.stringify(apiKey)
        );
    },
    clearApiKey: () => {
        window.localStorage.removeItem(`${storagePrefix}apiKey`);
    },
};

export default storage;
