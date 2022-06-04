const baseURL = 'http://localhost/skripsi-batik';
const config = {
    headers: {
        'Access-Control-Allow-Origin': `*`,
        'Authorization': `$2a$16$V8nX0lYVYeAdzmwd2qaV.egge8PmIYEzrI6uksbt.HmTpWElFOou.`,
        'Content-Type': 'application/x-www-form-urlencoded, multipart/form-data'
    }
};

export const CheckInputValidity = (form) => {
    let result = false;

    let input = document.getElementById(form).querySelectorAll('input[required]');

    if (input.length > 0) {
        let i = 0, lenInput = input.length;
        while (i < lenInput) {
            if (!input[i].checkValidity()) {
                input[i].focus();
                result = false;

                break;
            }

            result = true;

            i++;
        }
    }

    if (result === false) return result;

    let select = document.getElementById(form).querySelectorAll('select[required]');

    if (select.length > 0) {
        let j = 0, lenSelect = select.length;
        while (j < lenSelect) {
            if (!select[j].checkValidity()) {
                select[j].focus();
                result = false;

                break;
            }

            result = true;

            j++;
        }
    }

    return result;
}

const cx = (classname = []) => {
    return classname.join(' ');
}

const GenerateCode = (Initial, data) => {
    let nextCode = data.length > 0 ? parseInt(data.slice(-1).pop().kode.replace( /^\D+/g, '')) + 1 : 1;

    return `${Initial}${nextCode.toString().padStart(4, '0')}`;
}

const GetValue = (id) => {
    return document.getElementById(id).value;
}

const HideLoading = () => {
    document.getElementById('loading').classList.add('d-none');
}

const InputFormatNumber = (event) => {
    event.target.value = event.target.value.replace(/[^.0-9]/g, '').replace(/(\..*?)\..*/g, '0.');
}

const ResetForm = (id) => {
    document.getElementById(id).reset();
}

const SetValue = (id, value) => {
    document.getElementById(id).value = value;
}

const ShowLoading = () => {
    document.getElementById('loading').classList.remove('d-none');
}

export { baseURL, config, cx, GenerateCode, GetValue, HideLoading, InputFormatNumber, ResetForm, SetValue, ShowLoading };