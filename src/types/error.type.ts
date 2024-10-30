
export type ModifiedError = Error & {
    failed: string;
    message: string;
    errors: {
        [key: string]: string;
    }
};
