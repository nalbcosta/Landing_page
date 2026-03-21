export const isValidExternalUrl = (url: string): boolean => {
    if (!url) return false;
    const trimmedUrl = url.trim();
    return /^https?:\/\//i.test(trimmedUrl);
};
