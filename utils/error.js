const getError = (err) => err?.response?.data?.message || err?.message;

export { getError };
