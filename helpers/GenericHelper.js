const fieldNullOrEmpty = (value, output) => {
    if(value === undefined || value === ''){
        output.statusCode = 422
        output.messages = [...output.messages, `Empty ${nameof(value)}.`]
        return false
    }
    return true
}

const fieldkNullOrEmpty = (key, value, output) => {
    if(value === undefined || value === ''){
        output.statusCode = 422
        output.messages = [...output.messages, `Empty ${key}.`]
        return false
    }
    return true
}

module.exports = {
    FieldNullOrEmpty: fieldNullOrEmpty,
    FieldsNullOrEmpty: (object, output) => {
        let correct = true;
        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
                const element = object[key];
                correct &= fieldkNullOrEmpty(key,element,output)
            }
        }
        if(correct)
            output.statusCode = 200
    }
}