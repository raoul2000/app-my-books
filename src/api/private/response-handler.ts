export const handleErrorJson = (response: Response) => {
    if (!response.ok) {
        return response.json().then((data) => {
            throw data;
        });
    } else {
        return response.json();
    }
};

export const handleErrorNoResponse = (response: Response) => {
    if (!response.ok) {
        throw response.statusText;
    } else {
        return true;
    }
};