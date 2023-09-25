export const convertURLtofile = async (fileURL) => {
    try {
        const response = await fetch(fileURL);
        const blob = await response.blob();
        return blob
    } catch (error) {
        return {
            type: "error",
            message:error
        }
    }
}