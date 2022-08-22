const baseURL = 'http://leksana-batik.virtusrox.me';
// const baseURL = 'http://localhost/skripsi-batik';
const config = {
    headers: {
        'Access-Control-Allow-Origin': `*`,
        'Authorization': `$2a$16$V8nX0lYVYeAdzmwd2qaV.egge8PmIYEzrI6uksbt.HmTpWElFOou.`,
        'Content-Type': 'application/x-www-form-urlencoded, multipart/form-data'
    }
};

const Calculate = (number = []) => {
    let result = 0;

    number.length > 0 && number.forEach(value => result += parseInt(value === '' ? 0 : value));

    return result;
}

const CheckInputValidity = (form) => {
    let result = false;

    let input = document.getElementById(form).querySelectorAll('input[required]');

    if (input.length > 0) {
        let i = 0, lenInput = input.length;
        while (i < lenInput) {
            if (!input[i].checkValidity()) {
                input[i].focus();
                // if(input[i].nextElementSibling) input[i].nextElementSibling.innerHTML = "Data Invalid";
                result = false;

                break;
            }
            // if(input[i].nextElementSibling) input[i].nextElementSibling.innerHTML = "";

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

const ClosePopupResonse = () => {
    document.getElementById('popup-response').classList.add('d-none');
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
    event.target.value = event.target.value.replace(/[^.0-9]/g, '');
}

const ResetForm = (id) => {
    document.getElementById(id).reset();
}

const SetNumberFormat = (price = 0) => {
    if (price == '0' || price == null || price == '' || price == undefined) return `0`;

    let reverse = parseInt(price).toString().split('').reverse().join('');
    let ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join(',').split('').reverse().join('');

    if (parseInt(price) < 0) return -ribuan;
    return ribuan;
}

const SetPriceFormat = (harga = 0) => {
    if (harga == '0' || harga == '' || harga == null || harga == undefined) return `Rp. 0.00`;

    let price = harga.toString().split('.');
    let reverse = price[0].toString().split('').reverse().join('');
    let ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join(',').split('').reverse().join('');

    if (harga < 0) {
        if (price.length > 1) return `-Rp. ${ribuan}.${price[1].substring(0, 2)}`;
        else return `-Rp. ${ribuan}`;
    } else {
        if (price.length > 1) return `Rp. ${ribuan}.${price[1].substring(0, 2)}`;
        else return 'Rp. ' + ribuan;
    }
}

const SetValue = (id, value) => {
    document.getElementById(id).value = value;
}

const ShowLoading = () => {
    document.getElementById('loading').classList.remove('d-none');
}

const ShowPopupResonse = () => {
    document.getElementById('popup-response').classList.remove('d-none');
}

export { baseURL, Calculate, ClosePopupResonse, CheckInputValidity, config, cx, GenerateCode, GetValue, HideLoading, InputFormatNumber, ResetForm, SetNumberFormat, SetPriceFormat, SetValue, ShowLoading, ShowPopupResonse };