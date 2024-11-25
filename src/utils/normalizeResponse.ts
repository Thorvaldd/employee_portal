export const normalizeKeys = (data: any): any => {
    if(Array.isArray(data)){
        return data.map(normalizeKeys)
    }else if(data !== null && typeof data === 'object'){
        return Object.keys(data).reduce((result, key) => {
            const normalizedKey = key.charAt(0).toLowerCase() + key.slice(1);
            result[normalizedKey] = normalizeKeys(data[key]);
            return result;
        }, {} as any);
    }

    return data;
};