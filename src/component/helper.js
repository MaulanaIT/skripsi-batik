const baseURL = 'http://localhost/skripsi-batik';
const config = {
    headers: {
        'Access-Control-Allow-Origin': `*`,
        'Authorization': `$2a$16$V8nX0lYVYeAdzmwd2qaV.egge8PmIYEzrI6uksbt.HmTpWElFOou.`,
        'Content-Type': 'application/x-www-form-urlencoded, multipart/form-data'
    }
};

const GenerateCode = (Initial, Nomor) => {
    return `${Initial}${Nomor.toString().padStart(4, '0')}`;
}

const GetInputValue = (id) => {
    return document.getElementById(id).value;
}

const HideLoading = () => {
    document.getElementById('loading').classList.add('d-none');
}

const InputFormatNumber = (event) => {
    event.target.value = event.target.value.replace(/[^.0-9]/g, '').replace(/(\..*?)\..*/g, '0.');
}

const ShowLoading = () => {
    document.getElementById('loading').classList.remove('d-none');
}

export { baseURL, config, GenerateCode, GetInputValue, HideLoading, InputFormatNumber, ShowLoading };