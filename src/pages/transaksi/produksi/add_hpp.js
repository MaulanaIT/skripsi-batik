import React, { forwardRef, useEffect, useState } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { FiXCircle } from 'react-icons/fi';
import { baseURL, CheckInputValidity, config, cx, GenerateCode, HideLoading, InputFormatNumber, ShowLoading } from '../../../component/helper';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/produksi/daftar_produksi.module.css';
import { useImperativeHandle } from 'react';

const CustomSelect = {
    control: (provided, state) => ({
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        color: 'white',
        cursor: 'pointer',
        display: 'flex',
        fontSize: 12
    }),
    input: (provided, state) => ({
        ...provided,
        color: 'white'
    }),
    menu: (provided, state) => ({
        backgroundColor: 'rgba(0, 0, 0, 3)',
        fontSize: 12,
        position: 'absolute',
        width: '100%',
        zIndex: 1
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.4)',
        fontSize: 12
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: 'rgba(255, 255, 255, 0.6)',
        whiteSpace: 'nowrap'
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: 'white',
        fontSize: 12
    })
}

const Add_hpp = (props, ref) => {

    const [getHTMLTableDaftarBahanBaku, setHTMLTableDaftarBahanBaku] = useStateWithCallbackLazy([]);
    const [getHTMLTableDaftarAlat, setHTMLTableDaftarAlat] = useStateWithCallbackLazy([]);
    const [getHTMLTableDaftarPenolong, setHTMLTableDaftarPenolong] = useStateWithCallbackLazy([]);
    const [getHTMLTableDaftarTenagaKerja, setHTMLTableDaftarTenagaKerja] = useStateWithCallbackLazy([]);

    const [getDataAlat, setDataAlat] = useState([]);
    const [getDataBahanBaku, setDataBahanBaku] = useState([]);
    const [getDataPenolong, setDataPenolong] = useState([]);
    const [getDataTenagaKerja, setDataTenagaKerja] = useState([]);

    const [getDataDetailAlat, setDataDetailAlat] = useState([]);
    const [getDataDetailBahanBaku, setDataDetailBahanBaku] = useState([]);
    const [getDataDetailPenolong, setDataDetailPenolong] = useState([]);
    const [getDataDetailTenagaKerja, setDataDetailTenagaKerja] = useState([]);

    const [getDataSelectKodeAlat, setDataSelectKodeAlat] = useState([]);
    const [getDataSelectNamaAlat, setDataSelectNamaAlat] = useState([]);
    const [getDataSelectBahanBaku, setDataSelectBahanBaku] = useState([]);
    const [getDataSelectPenolong, setDataSelectPenolong] = useState([]);
    const [getDataSelectKodeTenagaKerja, setDataSelectKodeTenagaKerja] = useState([]);
    const [getDataSelectNamaTenagaKerja, setDataSelectNamaTenagaKerja] = useState([]);

    const [getValueKodeAlat, setValueKodeAlat] = useState([]);
    const [getValueNamaAlat, setValueNamaAlat] = useState([]);
    const [getValueBahanBaku, setValueBahanBaku] = useState([]);
    const [getValueDepartemen, setValueDepartemen] = useState('');
    const [getValueHarga, setValueHarga] = useState(0);
    const [getValueJumlah, setValueJumlah] = useState(0);
    const [getValueKodeBiayaAlat, setValueKodeBiayaAlat] = useState('');
    const [getValueKodeBiayaBahanBaku, setValueKodeBiayaBahanBaku] = useState('');
    const [getValueKodeBiayaPenolong, setValueKodeBiayaPenolong] = useState('');
    const [getValueKodeBiayaTenagaKerja, setValueKodeBiayaTenagaKerja] = useState('');
    const [getValuePenolong, setValuePenolong] = useState([]);
    const [getValueTanggal, setValueTanggal] = useState(moment().format('YYYY-MM-DD'));
    const [getValueKodeTenagaKerja, setValueKodeTenagaKerja] = useState([]);
    const [getValueNamaTenagaKerja, setValueNamaTenagaKerja] = useState([]);
    const [getValueTotalHarga, setValueTotalHarga] = useState(0);

    const [getSelectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        GetAlat();
        GetBahanBaku();
        GetPenolong();
        GetTenagaKerja();
        GetDetailAlat();
        GetDetailBahanBaku();
        GetDetailPenolong();
        GetDetailTenagaKerja();

        setValueDepartemen(localStorage.getItem('leksana_jabatan'));
    }, []);

    useEffect(() => {
        setValueHarga(0);
        setValueJumlah(0);
        setValueBahanBaku([]);
        setValuePenolong([]);
        setValueKodeAlat([]);
        setValueNamaAlat([]);
        setValueKodeTenagaKerja([]);
        setValueNamaTenagaKerja([]);
    }, [getSelectedTab]);

    useEffect(() => {
        setValueTotalHarga(+getValueHarga * +getValueJumlah);
    }, [getValueJumlah, getValueHarga]);

    useEffect(() => {
        let dataSelected = getDataAlat?.find(item => item.kode === getValueKodeAlat?.value);

        setValueHarga(dataSelected?.bop ?? 0);
    }, [getValueKodeAlat, getValueNamaAlat]);

    useEffect(() => {
        let dataSelected = getDataBahanBaku?.find(item => item.kode === getValueBahanBaku?.value);

        setValueHarga(dataSelected?.harga ?? 0);
    }, [getValueBahanBaku]);

    useEffect(() => {
        let dataSelected = getDataPenolong?.find(item => item.kode === getValuePenolong?.value);

        setValueHarga(dataSelected?.harga ?? 0);
    }, [getValuePenolong]);

    useEffect(() => {
        let dataSelected = getDataTenagaKerja?.find(item => item.kode === getValueKodeTenagaKerja?.value);

        setValueHarga(dataSelected?.upah ?? 0);
    }, [getValueKodeTenagaKerja, getValueNamaTenagaKerja]);

    useEffect(() => {
        if (props?.isUpdate) SaveDetail();
    }, [getDataDetailAlat, getDataDetailBahanBaku, getDataDetailPenolong, getDataDetailTenagaKerja]);

    useImperativeHandle(ref, () => ({
        InsertDetailAlat, InsertDetailBahanBaku, InsertDetailPenolong, InsertDetailTenagaKerja
    }));

    const AddDetailAlat = () => {
        if (!CheckInputValidity('form-data') || getValueKodeAlat.length <= 0) {
            alert('Isi data dengan benar');
            return;
        }

        ShowLoading();

        $('#table-data-bop-alat').DataTable().destroy();

        let dataDetailAlat = getDataDetailAlat;
        let htmlTableDaftarAlat = [];

        let checkIndex = dataDetailAlat.findIndex(item => item.kode_alat === getValueKodeAlat.value && item.tanggal === getValueTanggal);

        if (checkIndex < 0) {
            dataDetailAlat.push({
                tanggal: getValueTanggal,
                kode_alat: getValueKodeAlat.value,
                nama_alat: getValueNamaAlat.label,
                jumlah: getValueJumlah,
                harga: getValueHarga,
                total_harga: getValueTotalHarga
            });
        } else {
            dataDetailAlat[checkIndex].jumlah = +dataDetailAlat[checkIndex].jumlah + +getValueJumlah;
            dataDetailAlat[checkIndex].total_harga = +dataDetailAlat[checkIndex].total_harga + +getValueTotalHarga;
        }

        if (dataDetailAlat && dataDetailAlat.length > 0) {
            dataDetailAlat.forEach((item, index) => {
                htmlTableDaftarAlat.push(
                    <tr key={index} className={'align-middle'}>
                        <td>{index + 1}.</td>
                        <td>{item.kode_alat}</td>
                        <td>{item.nama_alat}</td>
                        <td>{item.jumlah}</td>
                        <td>{item.harga}</td>
                        <td>{item.total_harga}</td>
                    </tr>
                );
            });
        }

        setDataDetailAlat(dataDetailAlat);
        setHTMLTableDaftarAlat(htmlTableDaftarAlat, () => {
            $('#table-data-bop-alat').DataTable();

            HideLoading();
        });
    }

    const AddDetailBahanBaku = () => {
        if (!CheckInputValidity('form-data') || getValueBahanBaku.length <= 0) {
            alert('Isi data dengan benar');
            return;
        }

        ShowLoading();

        $('#table-data-biaya-bahan-baku').DataTable().destroy();

        let dataDetailBahanBaku = getDataDetailBahanBaku;
        let htmlTableDaftarBahanBaku = [];

        let checkIndex = dataDetailBahanBaku.findIndex(item => item.kode_bahan === getValueBahanBaku.value && item.tanggal === getValueTanggal);

        if (checkIndex < 0) {
            dataDetailBahanBaku.push({
                tanggal: getValueTanggal,
                kode_bahan: getValueBahanBaku.value,
                nama_bahan: getValueBahanBaku.label,
                jumlah: getValueJumlah,
                harga: getValueHarga,
                total_harga: getValueTotalHarga
            });
        } else {
            dataDetailBahanBaku[checkIndex].jumlah = +dataDetailBahanBaku[checkIndex].jumlah + +getValueJumlah;
            dataDetailBahanBaku[checkIndex].total_harga = +dataDetailBahanBaku[checkIndex].total_harga + +getValueTotalHarga;
        }

        if (dataDetailBahanBaku && dataDetailBahanBaku.length > 0) {
            dataDetailBahanBaku.forEach((item, index) => {
                htmlTableDaftarBahanBaku.push(
                    <tr key={index} className={'align-middle'}>
                        <td>{index + 1}.</td>
                        <td>{item.kode_bahan}</td>
                        <td>{item.nama_bahan}</td>
                        <td>{item.jumlah}</td>
                        <td>{item.harga}</td>
                        <td>{item.total_harga}</td>
                    </tr>
                );
            });
        }

        setDataDetailBahanBaku(dataDetailBahanBaku);

        setHTMLTableDaftarBahanBaku(htmlTableDaftarBahanBaku, () => {
            $('#table-data-biaya-bahan-baku').DataTable();

            HideLoading();
        });
    }

    const AddDetailPenolong = () => {
        if (!CheckInputValidity('form-data') || getValuePenolong.length <= 0) {
            alert('Isi data dengan benar');
            return;
        }

        ShowLoading();

        $('#table-data-bop-penolong').DataTable().destroy();

        let dataDetailPenolong = getDataDetailPenolong;
        let htmlTableDaftarPenolong = [];

        let checkIndex = dataDetailPenolong.findIndex(item => item.kode_penolong === getValuePenolong.value && item.tanggal === getValueTanggal);

        if (checkIndex < 0) {
            dataDetailPenolong.push({
                tanggal: getValueTanggal,
                kode_penolong: getValuePenolong.value,
                nama_penolong: getValuePenolong.label,
                jumlah: getValueJumlah,
                harga: getValueHarga,
                total_harga: getValueTotalHarga
            });
        } else {
            dataDetailPenolong[checkIndex].jumlah = +dataDetailPenolong[checkIndex].jumlah + +getValueJumlah;
            dataDetailPenolong[checkIndex].total_harga = +dataDetailPenolong[checkIndex].total_harga + +getValueTotalHarga;
        }

        if (dataDetailPenolong && dataDetailPenolong.length > 0) {
            dataDetailPenolong.forEach((item, index) => {
                htmlTableDaftarPenolong.push(
                    <tr key={index} className={'align-middle'}>
                        <td>{index + 1}.</td>
                        <td>{item.kode_penolong}</td>
                        <td>{item.nama_penolong}</td>
                        <td>{item.jumlah}</td>
                        <td>{item.harga}</td>
                        <td>{item.total_harga}</td>
                    </tr>
                );
            });
        }

        setDataDetailPenolong(dataDetailPenolong);
        setHTMLTableDaftarPenolong(htmlTableDaftarPenolong, () => {
            $('#table-data-bop-penolong').DataTable();

            HideLoading();
        });
    }

    const AddDetailTenagaKerja = () => {
        if (!CheckInputValidity('form-data') || getValueKodeTenagaKerja.length <= 0) {
            alert('Isi data dengan benar');
            return;
        }

        ShowLoading();

        $('#table-data-biaya-tenaga-kerja').DataTable().destroy();

        let dataDetailTenagaKerja = getDataDetailTenagaKerja;
        let htmlTableDaftarTenagaKerja = [];

        let checkIndex = dataDetailTenagaKerja.findIndex(item => item.kode_tenaga_kerja === getValueKodeTenagaKerja.value && item.tanggal === getValueTanggal);

        if (checkIndex < 0) {
            dataDetailTenagaKerja.push({
                tanggal: getValueTanggal,
                kode_tenaga_kerja: getValueKodeTenagaKerja.value,
                nama_tenaga_kerja: getValueNamaTenagaKerja.label,
                departemen: getValueDepartemen,
                jumlah: getValueJumlah,
                harga: getValueHarga,
                total_harga: getValueTotalHarga
            });
        } else {
            dataDetailTenagaKerja[checkIndex].jumlah = +dataDetailTenagaKerja[checkIndex].jumlah + +getValueJumlah;
            dataDetailTenagaKerja[checkIndex].total_harga = +dataDetailTenagaKerja[checkIndex].total_harga + +getValueTotalHarga;
        }

        if (dataDetailTenagaKerja && dataDetailTenagaKerja.length > 0) {
            dataDetailTenagaKerja.forEach((item, index) => {
                htmlTableDaftarTenagaKerja.push(
                    <tr key={index} className={'align-middle'}>
                        <td>{index + 1}.</td>
                        <td>{item.kode_tenaga_kerja}</td>
                        <td>{item.nama_tenaga_kerja}</td>
                        <td>{item.jumlah}</td>
                        <td>{item.harga}</td>
                        <td>{item.total_harga}</td>
                    </tr>
                );
            });
        }


        setDataDetailTenagaKerja(dataDetailTenagaKerja);
        setHTMLTableDaftarTenagaKerja(htmlTableDaftarTenagaKerja, () => {
            $('#table-data-biaya-tenaga-kerja').DataTable();

            HideLoading();
        });
    }

    const CloseDetail = () => {
        document.getElementById('add_hpp').classList.add('d-none');

        setDataDetailAlat([]);
        setDataDetailBahanBaku([]);
        setDataDetailPenolong([]);
        setDataDetailTenagaKerja([]);
    }

    const GetAlat = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/master/inventory/alat/select.php`, config).then(response => {
            let data = response.data.data;

            let dataSelectKodeAlat = [];
            let dataSelectNamaAlat = [];

            if (data && data.length > 0) {
                for (const item of data) {
                    dataSelectKodeAlat.push({
                        value: item.kode,
                        label: item.kode
                    });

                    dataSelectNamaAlat.push({
                        value: item.kode,
                        label: item.nama
                    });
                }
            }

            setDataSelectKodeAlat(dataSelectKodeAlat);
            setDataSelectNamaAlat(dataSelectNamaAlat);
            setDataAlat(data);

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const GetBahanBaku = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/master/inventory/bahan-baku/select.php`, config).then(response => {
            let data = response.data.data;

            let dataSelectBahanBaku = [];

            if (data && data.length > 0) {
                for (const item of data) {
                    dataSelectBahanBaku.push({
                        value: item.kode,
                        label: item.nama
                    });
                }
            }

            setDataSelectBahanBaku(dataSelectBahanBaku);
            setDataBahanBaku(data);

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const GetPenolong = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/master/inventory/bahan-penolong/select.php`, config).then(response => {
            let data = response.data.data;

            let dataSelectPenolong = [];

            if (data && data.length > 0) {
                for (const item of data) {
                    dataSelectPenolong.push({
                        value: item.kode,
                        label: item.nama
                    });
                }
            }

            setDataSelectPenolong(dataSelectPenolong);
            setDataPenolong(data);

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const GetTenagaKerja = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/master/tenaga-kerja/select.php`, config).then(response => {
            let jabatan = localStorage.getItem('leksana_jabatan');

            let data = jabatan === 'Super Admin' ? response.data.data : response.data.data.filter(item => item.departemen === jabatan);

            let dataSelectKodeTenagaKerja = [];
            let dataSelectNamaTenagaKerja = [];

            if (data && data.length > 0) {
                for (const item of data) {
                    dataSelectKodeTenagaKerja.push({
                        value: item.kode,
                        label: item.nama
                    });

                    dataSelectNamaTenagaKerja.push({
                        value: item.kode,
                        label: item.nama
                    });
                }
            }

            setDataSelectKodeTenagaKerja(dataSelectKodeTenagaKerja);
            setDataSelectNamaTenagaKerja(dataSelectNamaTenagaKerja);
            setDataTenagaKerja(data);

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const GetDetailAlat = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/transaksi/produksi/detail-alat/select.php`, config).then(response => {
            let data = response.data.data;

            if (props.isUpdate && data) {
                let filter = data.filter(item => item.kode_produksi === props.dataSelected.kode_produksi);
                let htmlTableDaftarAlat = [];
                let dataDetailAlat = [];
                let kodeBiayaAlat = '';

                if (filter && filter.length > 0) {
                    filter.forEach((item, index) => {
                        kodeBiayaAlat = item.kode;

                        htmlTableDaftarAlat.push(
                            <tr key={`alat-${index}`} className={'align-middle'}>
                                <td>{index + 1}.</td>
                                <td>{item.kode_alat}</td>
                                <td>{item.nama_alat}</td>
                                <td>{item.jumlah}</td>
                                <td>{item.harga}</td>
                                <td>{item.total_harga}</td>
                            </tr>
                        );

                        dataDetailAlat.push({
                            tanggal: item.tanggal,
                            kode_alat: item.kode_alat,
                            nama_alat: item.nama_alat,
                            jumlah: item.jumlah,
                            harga: item.harga,
                            total_harga: item.total_harga
                        });
                    });
                }

                setDataDetailAlat(dataDetailAlat);
                setValueKodeBiayaAlat(kodeBiayaAlat === '' ? GenerateCode('BOPAlat', data) : kodeBiayaAlat);
                setHTMLTableDaftarAlat(htmlTableDaftarAlat, () => {
                    $('#table-data-bop-alat').DataTable();

                    HideLoading();
                });
            } else {
                setValueKodeBiayaAlat(GenerateCode('BOPAlat', data));
                setHTMLTableDaftarAlat([], () => {
                    $('#table-data-bop-alat').DataTable();

                    HideLoading();
                });
            }
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const GetDetailBahanBaku = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/transaksi/produksi/detail-bahan-baku/select.php`, config).then(response => {
            let data = response.data.data;

            if (props.isUpdate && data) {
                let filter = data.filter(item => item.kode_produksi === props.dataSelected.kode_produksi);
                let htmlTableDaftarBahanBaku = [];
                let dataDetailBahanBaku = [];
                let kodeBiayaBahanBaku = '';

                if (filter && filter.length > 0) {
                    filter.forEach((item, index) => {
                        kodeBiayaBahanBaku = item.kode;

                        htmlTableDaftarBahanBaku.push(
                            <tr key={`bahan-${index}`} className={'align-middle'}>
                                <td>{index + 1}.</td>
                                <td>{item.kode_bahan_baku}</td>
                                <td>{item.nama_bahan_baku}</td>
                                <td>{item.jumlah}</td>
                                <td>{item.harga}</td>
                                <td>{item.total_harga}</td>
                            </tr>
                        );

                        dataDetailBahanBaku.push({
                            tanggal: item.tanggal,
                            kode_bahan: item.kode_bahan_baku,
                            nama_bahan: item.nama_bahan_baku,
                            jumlah: item.jumlah,
                            harga: item.harga,
                            total_harga: item.total_harga
                        });
                    });
                }

                setDataDetailBahanBaku(dataDetailBahanBaku);
                setValueKodeBiayaBahanBaku(kodeBiayaBahanBaku === '' ? GenerateCode('BBB', data) : kodeBiayaBahanBaku);
                setHTMLTableDaftarBahanBaku(htmlTableDaftarBahanBaku, () => {
                    $('#table-data-biaya-bahan-baku').DataTable();

                    HideLoading();
                });
            } else {
                setValueKodeBiayaBahanBaku(GenerateCode('BBB', data));
                setHTMLTableDaftarBahanBaku([], () => {
                    $('#table-data-biaya-bahan-baku').DataTable();

                    HideLoading();
                });
            }
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const GetDetailPenolong = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/transaksi/produksi/detail-penolong/select.php`, config).then(response => {
            let data = response.data.data;

            if (props.isUpdate && data) {
                let filter = data.filter(item => item.kode_produksi === props.dataSelected.kode_produksi);
                let htmlTableDaftarPenolong = [];
                let dataDetailPenolong = [];
                let kodeBiayaPenolong = '';

                if (filter && filter.length > 0) {
                    filter.forEach((item, index) => {
                        kodeBiayaPenolong = item.kode;

                        htmlTableDaftarPenolong.push(
                            <tr key={`penolong-${index}`} className={'align-middle'}>
                                <td>{index + 1}.</td>
                                <td>{item.kode_penolong}</td>
                                <td>{item.nama_penolong}</td>
                                <td>{item.jumlah}</td>
                                <td>{item.harga}</td>
                                <td>{item.total_harga}</td>
                            </tr>
                        );

                        dataDetailPenolong.push({
                            tanggal: item.tanggal,
                            kode_penolong: item.kode_penolong,
                            nama_penolong: item.nama_penolong,
                            jumlah: item.jumlah,
                            harga: item.harga,
                            total_harga: item.total_harga
                        });
                    });
                }

                setDataDetailPenolong(dataDetailPenolong);
                setValueKodeBiayaPenolong(kodeBiayaPenolong === '' ? GenerateCode('BBP', data) : kodeBiayaPenolong);
                setHTMLTableDaftarPenolong(htmlTableDaftarPenolong, () => {
                    $('#table-data-bop-bahan-penolong').DataTable();

                    HideLoading();
                });
            } else {
                setValueKodeBiayaPenolong(GenerateCode('BBP', data));
                setHTMLTableDaftarPenolong([], () => {
                    $('#table-data-bop-bahan-penolong').DataTable();

                    HideLoading();
                });
            }
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const GetDetailTenagaKerja = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/transaksi/produksi/detail-tenaga-kerja/select.php`, config).then(response => {
            let data = response.data.data;

            if (props.isUpdate && data) {
                let filter = data.filter(item => item.kode_produksi === props.dataSelected.kode_produksi);
                let htmlTableDaftarTenagaKerja = [];
                let dataDetailTenagaKerja = [];
                let kodeBiayaTenagaKerja = '';

                if (filter && filter.length > 0) {
                    filter.forEach((item, index) => {
                        kodeBiayaTenagaKerja = item.kode;

                        htmlTableDaftarTenagaKerja.push(
                            <tr key={`tenaga-kerja-${index}`} className={'align-middle'}>
                                <td>{index + 1}.</td>
                                <td>{item.kode_tenaga_kerja}</td>
                                <td>{item.nama_tenaga_kerja}</td>
                                <td>{item.jumlah}</td>
                                <td>{item.harga}</td>
                                <td>{item.total_harga}</td>
                                =                            </tr>
                        );

                        dataDetailTenagaKerja.push({
                            tanggal: item.tanggal,
                            kode_tenaga_kerja: item.kode_tenaga_kerja,
                            nama_tenaga_kerja: item.nama_tenaga_kerja,
                            jumlah: item.jumlah,
                            harga: item.harga,
                            total_harga: item.total_harga
                        });
                    });
                }

                setDataDetailTenagaKerja(dataDetailTenagaKerja);
                setValueKodeBiayaTenagaKerja(kodeBiayaTenagaKerja === '' ? GenerateCode('BTKL', data) : kodeBiayaTenagaKerja);
                setHTMLTableDaftarTenagaKerja(htmlTableDaftarTenagaKerja, () => {
                    $('#table-data-biaya-tenaga-kerja').DataTable();

                    HideLoading();
                });
            } else {
                setValueKodeBiayaTenagaKerja(GenerateCode('BTKL', data));
                setHTMLTableDaftarTenagaKerja([], () => {
                    $('#table-data-biaya-tenaga-kerja').DataTable();

                    HideLoading();
                });
            }
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const InsertDetailAlat = () => {
        ShowLoading();

        const formData = new FormData();

        formData.append('kode', getValueKodeBiayaAlat);
        if (props.isUpdate) {
            formData.append('kode_hpp', props.dataSelected.kode);
            formData.append('kode_produksi', props.dataSelected.kode_produksi);
            formData.append('kode_permintaan', props.dataSelected.kode_permintaan);
        } else {
            formData.append('kode_hpp', props.kodeHPP);
            formData.append('kode_produksi', props.kodeProduksi);
            formData.append('kode_permintaan', props.kodePermintaan);
        }
        formData.append('tanggal', getValueTanggal);
        formData.append('data', JSON.stringify(getDataDetailAlat));

        axios.post(`${baseURL}/api/transaksi/produksi/detail-alat/insert.php`, formData, config).then(() => {
            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const InsertDetailBahanBaku = () => {
        ShowLoading();

        const formData = new FormData();

        formData.append('kode', getValueKodeBiayaBahanBaku);
        if (props.isUpdate) {
            formData.append('kode_hpp', props.dataSelected.kode);
            formData.append('kode_produksi', props.dataSelected.kode_produksi);
            formData.append('kode_permintaan', props.dataSelected.kode_permintaan);
        } else {
            formData.append('kode_hpp', props.kodeHPP);
            formData.append('kode_produksi', props.kodeProduksi);
            formData.append('kode_permintaan', props.kodePermintaan);
        }
        formData.append('tanggal', getValueTanggal);
        formData.append('data', JSON.stringify(getDataDetailBahanBaku));

        axios.post(`${baseURL}/api/transaksi/produksi/detail-bahan-baku/insert.php`, formData, config).then(response => {
            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const InsertDetailPenolong = () => {
        ShowLoading();

        const formData = new FormData();

        formData.append('kode', getValueKodeBiayaPenolong);
        if (props.isUpdate) {
            formData.append('kode_hpp', props.dataSelected.kode);
            formData.append('kode_produksi', props.dataSelected.kode_produksi);
            formData.append('kode_permintaan', props.dataSelected.kode_permintaan);
        } else {
            formData.append('kode_hpp', props.kodeHPP);
            formData.append('kode_produksi', props.kodeProduksi);
            formData.append('kode_permintaan', props.kodePermintaan);
        }
        formData.append('tanggal', getValueTanggal);
        formData.append('data', JSON.stringify(getDataDetailPenolong));

        axios.post(`${baseURL}/api/transaksi/produksi/detail-penolong/insert.php`, formData, config).then(response => {
            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const InsertDetailTenagaKerja = () => {
        ShowLoading();

        const formData = new FormData();

        formData.append('kode', getValueKodeBiayaTenagaKerja);

        console.log(getDataDetailTenagaKerja)

        if (props.isUpdate) {
            formData.append('kode_hpp', props.dataSelected.kode);
            formData.append('kode_produksi', props.dataSelected.kode_produksi);
            formData.append('kode_permintaan', props.dataSelected.kode_permintaan);
        } else {
            formData.append('kode_hpp', props.kodeHPP);
            formData.append('kode_produksi', props.kodeProduksi);
            formData.append('kode_permintaan', props.kodePermintaan);
        }

        formData.append('tanggal', getValueTanggal);
        formData.append('data', JSON.stringify(getDataDetailTenagaKerja));

        axios.post(`${baseURL}/api/transaksi/produksi/detail-tenaga-kerja/insert.php`, formData, config).then(response => {
            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const SaveDetail = () => {
        let BahanBaku = 0;
        let TenagaKerja = 0;
        let Overhead = 0;

        getDataDetailBahanBaku?.forEach(item => BahanBaku += +item?.total_harga);
        getDataDetailTenagaKerja?.forEach(item => TenagaKerja += +item?.total_harga);
        getDataDetailAlat?.forEach(item => Overhead += +item?.total_harga);
        getDataDetailPenolong?.forEach(item => Overhead += +item?.total_harga);

        props.setHpp(BahanBaku, TenagaKerja, Overhead);
        props.setDetailData(getDataDetailAlat, getDataDetailBahanBaku, getDataDetailPenolong, getDataDetailTenagaKerja);

        document.getElementById('add_hpp').classList.add('d-none');
    }

    const SelectAlat = (e) => {
        let data = e?.value;

        let valueKode = getDataSelectKodeAlat.find(item => item.value === data);
        let valueNama = getDataSelectNamaAlat.find(item => item.value === data);

        if (data) {
            setValueKodeAlat(valueKode);
            setValueNamaAlat(valueNama);
        } else {
            setValueKodeAlat(null);
            setValueNamaAlat(null);
        }
    }

    const SelectTenagaKerja = (e) => {
        let data = e?.value;

        let valueKode = getDataSelectKodeTenagaKerja.find(item => item.value === data);
        let valueNama = getDataSelectNamaTenagaKerja.find(item => item.value === data);

        if (data) {
            setValueKodeTenagaKerja(valueKode);
            setValueNamaTenagaKerja(valueNama);
        } else {
            setValueKodeTenagaKerja(null);
            setValueNamaTenagaKerja(null);
        }
    }

    return (
        <React.Fragment>
            <div id='add_hpp' className={`${global.popup_detail} d-none`}>
                <FiXCircle className={global.toggle} onClick={CloseDetail} />
                <div className={style.content}>
                    <div className={global.card_detail}>
                        <p className={global.title}>Tambah Perhitungan Harga Pokok Produksi</p>
                        <div className={`col-12 col-md-7 ps-md-2 pt-2 pt-md-0`}>
                            <div className={`${global.tab_card} pb-2`}>
                                <div className={`${global.item} ${+getSelectedTab === 0 ? global.active : ''}`} onClick={() => setSelectedTab(0)}>
                                    <p className={`${global.name}`}>Bahan Baku</p>
                                </div>
                                <div className={`${global.item} ${+getSelectedTab === 1 ? global.active : ''}`} onClick={() => setSelectedTab(1)}>
                                    <p className={`${global.name}`}>BOP (Penolong)</p>
                                </div>
                                <div className={`${global.item} ${+getSelectedTab === 2 ? global.active : ''}`} onClick={() => setSelectedTab(2)}>
                                    <p className={`${global.name}`}>BOP (Alat)</p>
                                </div>
                                <div className={`${global.item} ${+getSelectedTab === 3 ? global.active : ''}`} onClick={() => setSelectedTab(3)}>
                                    <p className={`${global.name}`}>BTKL</p>
                                </div>
                            </div>
                        </div>
                        <form id='form-data' className={`${global.card}`}>
                            {+getSelectedTab === 0 &&
                                <React.Fragment>
                                    <div className='d-flex'>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Kode Biaya Bahan Baku <span className={global.important}>*</span></p>
                                            <input type="text" id='input-kode-biaya-bahan-baku' name='input-biaya-bahan-baku' value={getValueKodeBiayaBahanBaku} required={true} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-4 px-2`}>
                                            <p className={global.title}>Tanggal <span className={global.important}>*</span></p>
                                            <input type="date" id='input-tanggal-bbb' name='input-tanggal-bbb' value={getValueTanggal} onChange={e => setValueTanggal(e.target.value)} required={true} />
                                        </div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Kode Produksi <span className={global.important}>*</span></p>
                                            <input type="text" id='input-kode-produksi' name='input-kode-produksi' value={props.isUpdate ? props.dataSelected.kode_produksi : props.kodeProduksi} required={true} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-8 ps-2`}>
                                            <p className={global.title}>Kode Permintaan Bahan <span className={global.important}>*</span></p>
                                            <input type="text" id='input-kode-permintaan-bahan' name='input-kode-permintaan-bahan' value={props.isUpdate ? props.dataSelected.kode_permintaan : props.kodePermintaan} required={true} readOnly={true} />
                                        </div>
                                    </div>
                                    <div className={`d-flex`}>
                                        <div className={`${global.input_group} col-8 pe-2`}>
                                            <p className={global.title}>Pilih Bahan Baku <span className={global.important}>*</span></p>
                                            <Select id='select-nama-bahan-bahan-baku' name='select-nama-bahan-bahan-baku' isClearable={true} isSearchable={true} options={getDataSelectBahanBaku} placeholder={'Select Nama Bahan...'} value={getValueBahanBaku} styles={CustomSelect} onChange={e => setValueBahanBaku(e)} />
                                        </div>
                                        <div className={`${global.input_group} col-4 ps-2`}>
                                            <p className={global.title}>Harga <span className={global.important}>*</span></p>
                                            <input type="text" id='input-harga-bahan-baku' name='input-harga-bahan-baku' value={getValueHarga} required={true} readOnly={true} />
                                        </div>
                                    </div>
                                    <div className={`d-flex`}>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Jumlah <span className={global.important}>*</span></p>
                                            <input type="text" id='input-jumlah-bahan-baku' name='input-jumlah-bahan-baku' value={getValueJumlah} onInput={InputFormatNumber} onChange={e => setValueJumlah(e.target.value)} required={true} />
                                        </div>
                                        <div className={`${global.input_group} col-4 px-2`}>
                                            <p className={global.title}>Biaya <span className={global.important}>*</span></p>
                                            <input type="text" id='input-biaya-bahan-baku' name='input-biaya-bahan-baku' value={getValueTotalHarga} required={true} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-3 ms-auto ps-2`}>
                                            <p className={global.title}>Aksi</p>
                                            <button type='button' className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }} onClick={AddDetailBahanBaku}><MdAdd /> Tambah</button>
                                        </div>
                                    </div>
                                </React.Fragment>
                            }
                            {+getSelectedTab === 1 &&
                                <React.Fragment>
                                    <div className='d-flex'>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Kode Biaya Bahan Penolong </p>
                                            <input type="text" id='input-kode-biaya-bahan-penolong' name='input-biaya-bahan-penolong' value={getValueKodeBiayaPenolong} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-4 ps-2`}>
                                            <p className={global.title}>Tanggal </p>
                                            <input type="date" id='input-tanggal-bop-penolong' name='input-tanggal-bop-penolong' value={getValueTanggal} onChange={e => setValueTanggal(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Kode Produksi <span className={global.important}>*</span></p>
                                            <input type="text" id='input-kode-produksi' name='input-kode-produksi' value={props.isUpdate ? props.dataSelected.kode_produksi : props.kodeProduksi} required={true} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-8 ps-2`}>
                                            <p className={global.title}>Kode Permintaan Bahan <span className={global.important}>*</span></p>
                                            <input type="text" id='input-kode-permintaan-bahan' name='input-kode-permintaan-bahan' value={props.isUpdate ? props.dataSelected.kode_permintaan : props.kodePermintaan} required={true} readOnly={true} />
                                        </div>
                                    </div>
                                    <div className={`d-flex`}>
                                        <div className={`${global.input_group} col-8 pe-2`}>
                                            <p className={global.title}>Pilih Bahan Penolong <span className={global.important}>*</span></p>
                                            <Select id='select-nama-bahan-bahan-penolong' name='select-nama-bahan-bahan-penolong' isClearable={true} isSearchable={true} options={getDataSelectPenolong} placeholder={'Select Nama Bahan...'} value={getValuePenolong} styles={CustomSelect} onChange={e => setValuePenolong(e)} />
                                        </div>
                                        <div className={`${global.input_group} col-4 ps-2`}>
                                            <p className={global.title}>Harga <span className={global.important}>*</span></p>
                                            <input type="text" id='input-harga-bahan-penolong' name='input-harga-bahan-penolong' value={getValueHarga} required={true} readOnly={true} />
                                        </div>
                                    </div>
                                    <div className={`d-flex`}>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Jumlah <span className={global.important}>*</span></p>
                                            <input type="text" id='input-jumlah-bahan-penolong' name='input-jumlah-bahan-penolong' value={getValueJumlah} onInput={InputFormatNumber} onChange={e => setValueJumlah(e.target.value)} required={true} />
                                        </div>
                                        <div className={`${global.input_group} col-4 px-2`}>
                                            <p className={global.title}>Biaya <span className={global.important}>*</span></p>
                                            <input type="text" id='input-biaya-bahan-penolong' name='input-biaya-bahan-penolong' value={getValueTotalHarga} required={true} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-3 ms-auto ps-2`}>
                                            <p className={global.title}>Aksi</p>
                                            <button type='button' className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }} onClick={AddDetailPenolong}><MdAdd /> Tambah</button>
                                        </div>
                                    </div>
                                </React.Fragment>
                            }
                            {+getSelectedTab === 2 &&
                                <React.Fragment>
                                    <div className='d-flex'>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Kode BOP Alat <span className={global.important}>*</span></p>
                                            <input type="text" id='input-kode-bop-alat' name='input-kode-bop-alat' value={getValueKodeBiayaAlat} required={true} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-4 px-2`}>
                                            <p className={global.title}>Kode Produksi <span className={global.important}>*</span></p>
                                            <input type="text" id='input-kode-produksi' name='input-kode-produksi' value={props.isUpdate ? props.dataSelected.kode_produksi : props.kodeProduksi} required={true} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-4 ps-2`}>
                                            <p className={global.title}>Tanggal <span className={global.important}>*</span></p>
                                            <input type="date" id='input-tanggal-bop-alat' name='input-tanggal-bop-alat' value={getValueTanggal} onChange={e => setValueTanggal(e.target.value)} required={true} />
                                        </div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Kode Alat <span className={global.important}>*</span></p>
                                            <Select id='select-kode-bop-alat' name='select-kode-bop-alat' isClearable={true} isSearchable={true} options={getDataSelectKodeAlat} placeholder={'Select Kode...'} value={getValueKodeAlat} styles={CustomSelect} onChange={e => SelectAlat(e)} />
                                        </div>
                                        <div className={`${global.input_group} col-8 ps-2`}>
                                            <p className={global.title}>Nama Alat <span className={global.important}>*</span></p>
                                            <Select id='select-nama-bop-alat' name='select-nama-bop-alat' isClearable={true} isSearchable={true} options={getDataSelectNamaAlat} placeholder={'Select Nama Alat...'} value={getValueNamaAlat} styles={CustomSelect} onChange={e => SelectAlat(e)} />
                                        </div>
                                    </div>
                                    <div className={`d-flex`}>
                                        <div className={`${global.input_group} col-12`}>
                                            <p className={global.title}>Tarif <span className={global.important}>*</span></p>
                                            <input type="text" id='input-tarif-bop-alat' name='input-tarif-bop-alat' value={getValueHarga} required={true} readOnly={true} />
                                        </div>
                                    </div>
                                    <div className={`d-flex`}>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Pemakaian <span className={global.important}>*</span></p>
                                            <input type="text" id='input-pemakaian-bop-alat' name='input-pemakian-bop-alat' value={getValueJumlah} onInput={InputFormatNumber} onChange={e => setValueJumlah(e.target.value)} required={true} />
                                        </div>
                                        <div className={`${global.input_group} col-4 ps-2`}>
                                            <p className={global.title}>Biaya <span className={global.important}>*</span></p>
                                            <input type="text" id='input-biaya-bop-alat' name='input-biaya-bop-alat' value={getValueTotalHarga} required={true} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-3 ms-auto ps-2`}>
                                            <p className={global.title}>Aksi</p>
                                            <button type='button' className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }} onClick={AddDetailAlat}><MdAdd /> Tambah</button>
                                        </div>
                                    </div>
                                </React.Fragment>
                            }
                            {+getSelectedTab === 3 &&
                                <React.Fragment>
                                    <div className='d-flex'>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Kode Biaya Tenaga Kerja <span className={global.important}>*</span></p>
                                            <input type="text" id='input-kode-biaya-tenaga-kerja' name='input-biaya-tenaga-kerja' value={getValueKodeBiayaTenagaKerja} required={true} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-4 px-2`}>
                                            <p className={global.title}>Kode Produksi <span className={global.important}>*</span></p>
                                            <input type="text" id='input-kode-produksi' name='input-kode-produksi' value={props.isUpdate ? props.dataSelected.kode_produksi : props.kodeProduksi} required={true} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-4 ps-2`}>
                                            <p className={global.title}>Tanggal <span className={global.important}>*</span></p>
                                            <input type="date" id='input-tanggal-btk' name='input-tanggal-btk' value={getValueTanggal} onChange={e => setValueTanggal(e.target.value)} required={true} />
                                        </div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Kode Tenaga Kerja <span className={global.important}>*</span></p>
                                            <Select id='select-kode-tenaga-kerja' name='select-kode-tenaga-kerja' isClearable={true} isSearchable={true} options={getDataSelectKodeTenagaKerja} placeholder={'Select Tenaga Kerja...'} value={getValueKodeTenagaKerja} styles={CustomSelect} onChange={e => SelectTenagaKerja(e)} />
                                        </div>
                                        <div className={`${global.input_group} col-8 ps-2`}>
                                            <p className={global.title}>Nama Tenaga Kerja <span className={global.important}>*</span></p>
                                            <Select id='select-nama-tenaga-kerja' name='select-nama-tenaga-kerja' isClearable={true} isSearchable={true} options={getDataSelectNamaTenagaKerja} placeholder={'Select Tenaga Kerja...'} value={getValueNamaTenagaKerja} styles={CustomSelect} onChange={e => SelectTenagaKerja(e)} />
                                        </div>
                                    </div>
                                    <div className={`d-flex`}>
                                        <div className={`${global.input_group} col-8 pe-2`}>
                                            <p className={global.title}>Departemen <span className={global.important}>*</span></p>
                                            <input type="text" id='input-departemen' name='input-departemen' value={getValueDepartemen} required={true} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-4 ps-2`}>
                                            <p className={global.title}>Upah <span className={global.important}>*</span></p>
                                            <input type="text" id='input-upah-tenaga-kerja' name='input-upah-tenaga-kerja' value={getValueHarga} required={true} readOnly={true} />
                                        </div>
                                    </div>
                                    <div className={`d-flex`}>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Jumlah Pengerjaan <span className={global.important}>*</span></p>
                                            <input type="text" id='input-jumlah-pengerjaan' name='input-jumlah-pengerjaan' value={getValueJumlah} onInput={InputFormatNumber} onChange={e => setValueJumlah(e.target.value)} required={true} />
                                        </div>
                                        <div className={`${global.input_group} col-4 px-2`}>
                                            <p className={global.title}>Biaya <span className={global.important}>*</span></p>
                                            <input type="text" id='input-biaya-tenaga-kerja' name='input-biaya-tenaga-kerja' value={getValueTotalHarga} required={true} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-3 ms-auto ps-2`}>
                                            <p className={global.title}>Aksi</p>
                                            <button type='button' className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }} onClick={AddDetailTenagaKerja}><MdAdd /> Tambah</button>
                                        </div>
                                    </div>
                                </React.Fragment>
                            }
                            <div className={`table-responsive ${+getSelectedTab !== 0 && 'd-none'}`}>
                                <table id='table-data-biaya-bahan-baku' className={`table w-100`}>
                                    <thead className='text-nowrap'>
                                        <tr>
                                            <td>No.</td>
                                            <td>Kode Bahan</td>
                                            <td>Nama Bahan</td>
                                            <td>Jumlah</td>
                                            <td>Harga</td>
                                            <td>Biaya</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getHTMLTableDaftarBahanBaku}
                                    </tbody>
                                </table>
                            </div>
                            <div className={`table-responsive ${+getSelectedTab !== 1 && 'd-none'}`}>
                                <table id='table-data-bop-bahan-penolong' className={`table w-100`}>
                                    <thead className='text-nowrap'>
                                        <tr>
                                            <td>No.</td>
                                            <td>Kode Bahan</td>
                                            <td>Nama Bahan</td>
                                            <td>Jumlah</td>
                                            <td>Harga</td>
                                            <td>Biaya</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getHTMLTableDaftarPenolong}
                                    </tbody>
                                </table>
                            </div>
                            <div className={`table-responsive ${+getSelectedTab !== 2 && 'd-none'}`}>
                                <table id='table-data-bop-alat' className={`table w-100`}>
                                    <thead className='text-nowrap'>
                                        <tr>
                                            <td>No.</td>
                                            <td>Kode Tenaga Kerja</td>
                                            <td>Nama Tenaga Kerja</td>
                                            <td>Pemakaian</td>
                                            <td>Tarif</td>
                                            <td>Biaya</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getHTMLTableDaftarAlat}
                                    </tbody>
                                </table>
                            </div>
                            <div className={`table-responsive ${+getSelectedTab !== 3 && 'd-none'}`}>
                                <table id='table-data-biaya-tenaga-kerja' className={`table w-100`}>
                                    <thead className='text-nowrap'>
                                        <tr>
                                            <td>No.</td>
                                            <td>Kode Alat</td>
                                            <td>Nama Alat</td>
                                            <td>Tarif</td>
                                            <td>Pemakaian</td>
                                            <td>Biaya</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getHTMLTableDaftarTenagaKerja}
                                    </tbody>
                                </table>
                            </div>
                            <div className={`${global.input_group} col-12 ms-auto`}>
                                <button type='button' className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }} onClick={SaveDetail}><MdAdd /> Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default forwardRef(Add_hpp);