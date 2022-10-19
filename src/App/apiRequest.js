const apiRequest = async (url = '', optionIbj = null, errMsg = null) => {
    try {
        const response = await fetch(url, optionIbj);
        if (!response.ok) throw Error('Please reload the app');
    } catch (err) {
        errMsg = err.message;
    } finally {
        return errMsg;
    }
}

export default apiRequest;