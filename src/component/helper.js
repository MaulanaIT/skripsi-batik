const baseURL = 'http://localhost/skripsi-batik';
const config = {
    headers: {
        'Access-Control-Allow-Origin': `*`,
        'Authorization': `$2a$16$V8nX0lYVYeAdzmwd2qaV.egge8PmIYEzrI6uksbt.HmTpWElFOou.`,
        'Content-Type': 'application/x-www-form-urlencoded, multipart/form-data'
    }
};

const generateCode = (Initial, Nomor) => {
    return `${Initial}${Nomor.toString().padStart(4, '0')}`;
}

const getInputValue = (id) => {
    return document.getElementById(id).value;
}

export { baseURL, config, generateCode, getInputValue };