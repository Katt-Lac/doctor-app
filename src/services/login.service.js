const credentials = {
    username: "test",
    password: "test",
};

export const login = async (userName, password) => {
    if (userName === credentials.username && password === credentials.password) {
        return Promise.resolve({
            name: "John Doe",
            specialization: "Primary Care Physician",
        });
    }

    throw new Error();
};
