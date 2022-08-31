import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import { MdAdd } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa';
import { baseURL, Calculate, CheckInputValidity, config, GenerateCode, HideLoading, InputFormatNumber, SetNumberFormat, SetPriceFormat, ShowLoading } from '../../../component/helper';

// Import Component
import PrintoutPenjualan from './printout_penjualan';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/penjualan/transaksi_penjualan.module.css';

const CustomSelect = {
    control: (provided, state) => ({
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        color: 'black',
        cursor: 'pointer',
        display: 'flex',
        fontSize: 12
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: state.isFocused ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.8)',
    }),
    input: (provided, state) => ({
        ...provided,
        color: 'black'
    }),
    menu: (provided, state) => ({
        backgroundColor: 'rgba(255, 255, 255, 1)',
        fontSize: 12,
        position: 'absolute',
        width: '100%',
        zIndex: 1
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.2)',
        color: state.isSelected ? 'rgba(0, 0, 0, 0.6)' : 'black',
        fontSize: 12
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: 'rgba(0, 0, 0, 0.8)',
        whiteSpace: 'nowrap'
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: 'black',
        fontSize: 12
    })
}

export class transaksi_penjualan extends Component {

    state = {
        dataAkun: [],
        dataCustomer: [],
        dataConsignee: [],
        dataJual: [],
        dataKonsinyasi: [],
        dataPesanan: [],
        dataProduk: [],
        dataSupplier: [],
        dataTunai: [],

        dataDetailAlat: [],
        dataDetailBahan: [],
        dataDetailBTKL: [],
        dataDetailPenolong: [],

        kode: '',

        dataSelectAkun: [],
        dataSelectKodeProduk: [],
        dataSelectNamaProduk: [],
        dataSelectKodeConsignee: [],
        dataSelectNamaConsignee: [],
        dataSelectKodeCustomer: [],
        dataSelectNamaCustomer: [],
        dataSelectNamaStandarPesanan: [],

        htmlTableDaftarDetailAlat: [],
        htmlTableDaftarDetailBahan: [],
        htmlTableDaftarDetailBTKL: [],
        htmlTableDaftarDetailPenolong: [],
        htmlTableDaftarTunai: [],
        htmlTableDaftarKonsinyasi: [],

        limitDiskon: 500000,

        valueAlamat: '',
        valueDeskripsiPesanan: '',
        valueDiskon: 0,
        valuePercentageDiskon: 0,
        valueHarga: 0,
        valueHargaJual: 0,
        valueHpp: 0,
        valueJumlah: 0,
        valueJenisProduk: [],
        valueJenisPenjualan: [],
        valueKalkulasiTotalHpp: 0,
        valueKodeAkun: [],
        valueKodeProduk: [],
        valueKodeJual: '',
        valueKodeConsignee: [],
        valueKodeCustomer: [],
        valueKodeKasMasuk: '',
        valueKodePesanan: '',
        valueNamaConsignee: [],
        valueNamaCustomer: [],
        valueNamaPenolong: [],
        valueNamaProduk: [],
        valueNamaStandarPesanan: [],
        valueOngkosKirim: 0,
        valuePengurangan: 0,
        valueProfit: 0,
        valueSisa: 0,
        valueTanggal: moment().format('YYYY-MM-DD'),
        valueTotalAlat: 0,
        valueTotalBahan: 0,
        valueTotalBTKL: 0,
        valueTotalBayar: 0,
        valueTotalHpp: 0,
        valueTotalKembalian: 0,
        valueTotalJual: 0,
        valueTotalPenolong: 0,
        valueUangMuka: 0,

        tabSelected: 0,

        jenisPenjualan: ''
    }

    async componentDidMount() {
        await this.GetAkun();
        await this.GetCustomer();
        await this.GetConsignee();
        await this.GetPesanan();
        await this.GetProduk();
        await this.GetStandarPesanan();
    }

    DeleteKonsinyasi = (id) => {
        let dataKonsinyasi = this.state.dataKonsinyasi;

        dataKonsinyasi.splice(id, 1);

        this.setState({ dataKonsinyasi: dataKonsinyasi }, () => {
            this.GetDetailKonsinyasi();
        });
    }

    DeleteTunai = (id) => {
        let dataTunai = this.state.dataTunai;

        dataTunai.splice(id, 1);

        this.setState({ dataTunai: dataTunai }, () => {
            this.GetDetailTunai();
        });
    }

    GetAkun = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/master/akun/select.php`, config).then(response => {
            let data = response.data.data.filter(item => ['1101', '1102'].includes(item.kode));

            let dataSelectAkun = [];

            if (data && data.length > 0) {
                for (let item of data) {
                    dataSelectAkun.push(
                        { value: item.kode, label: item.nama }
                    );
                }
            }

            this.setState({ dataAkun: data, dataSelectAkun: dataSelectAkun }, () => {
                HideLoading();
            });
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    GetConsignee = async () => {
        axios.get(`${baseURL}/api/master/consignee/select.php`, config).then(response => {
            let dataConsignee = response.data.data;
            let dataSelectKodeConsignee = [];
            let dataSelectNamaConsignee = [];

            if (dataConsignee.length > 0) {
                dataConsignee.forEach(item => {
                    dataSelectKodeConsignee.push({
                        value: item.kode,
                        label: item.kode
                    });

                    dataSelectNamaConsignee.push({
                        value: item.kode,
                        label: item.nama
                    });
                });
            }

            this.setState({ dataConsignee: dataConsignee, dataSelectKodeConsignee: dataSelectKodeConsignee, dataSelectNamaConsignee: dataSelectNamaConsignee });
        }).catch(error => {
            console.log(error);
        });
    }

    GetCustomer = async () => {
        axios.get(`${baseURL}/api/master/customer/select.php`, config).then(response => {
            let dataCustomer = response.data.data;
            let dataSelectKodeCustomer = [];
            let dataSelectNamaCustomer = [];

            if (dataCustomer.length > 0) {
                dataCustomer.forEach(item => {
                    dataSelectKodeCustomer.push({
                        value: item.kode,
                        label: item.kode
                    });

                    dataSelectNamaCustomer.push({
                        value: item.kode,
                        label: item.nama
                    });
                });
            }

            this.setState({ dataCustomer: dataCustomer, dataSelectKodeCustomer: dataSelectKodeCustomer, dataSelectNamaCustomer: dataSelectNamaCustomer });
        }).catch(error => {
            console.log(error);
        });
    }

    GetDetailKonsinyasi = () => {
        ShowLoading();

        let htmlTableDaftarKonsinyasi = [];

        let kalkulasiTotalHpp = 0;

        if (this.state.dataKonsinyasi.length > 0) {
            this.state.dataKonsinyasi.forEach((item, index) => {
                htmlTableDaftarKonsinyasi.push(
                    <tr key={index}>
                        <td>{index + 1}.</td>
                        <td>{item.kode}</td>
                        <td>{item.kode_item}</td>
                        <td>{item.nama_item}</td>
                        <td>{item.jumlah}</td>
                        <td>{item.harga}</td>
                        <td>{item.total_harga}</td>
                        <td>{item.hpp}</td>
                        <td>{item.total_hpp}</td>
                        <td>
                            <div className={global.table_action}>
                                <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteKonsinyasi(item.id)}><FaTrash />Delete</button>
                            </div>
                        </td>
                    </tr>
                );

                kalkulasiTotalHpp += +item.total_hpp;
            });
        }

        $('#table-data').DataTable().destroy();

        this.setState({ htmlTableDaftarKonsinyasi: htmlTableDaftarKonsinyasi, valueKalkulasiTotalHpp: kalkulasiTotalHpp }, () => {
            $('#table-data').DataTable();

            this.KalkulasiTotalHarga();

            HideLoading();
        });
    }

    GetDetailStandarPesanan = async (kode) => {
        ShowLoading();

        axios.get(`${baseURL}/api/transaksi/penjualan/standar-pesanan/select-detail.php`, config).then(response => {
            let data = response.data.data.filter(item => item.kode === kode);

            let dataDetailAlat = data.filter(item => item.jenis_item === 'Alat');
            let dataDetailBahan = data.filter(item => item.jenis_item === 'Bahan Baku');
            let dataDetailPenolong = data.filter(item => item.jenis_item === 'Bahan Penolong');
            let dataDetailBTKL = data.filter(item => item.jenis_item === 'Tenaga Kerja');

            let htmlTableDaftarDetailAlat = [];
            let htmlTableDaftarDetailBahan = [];
            let htmlTableDaftarDetailBTKL = [];
            let htmlTableDaftarDetailPenolong = [];

            let valueTotalAlat = 0;
            let valueTotalBahan = 0;
            let valueTotalBTKL = 0;
            let valueTotalPenolong = 0;

            if (dataDetailAlat && dataDetailAlat.length > 0) {
                dataDetailAlat.forEach((item, index) => {
                    htmlTableDaftarDetailAlat.push(
                        <tr key={index} className={'align-middle'}>
                            <td>{index + 1}.</td>
                            <td>{item.kode}</td>
                            <td>{item.kode_item}</td>
                            <td>{item.nama_item}</td>
                            <td>{item.jumlah}</td>
                            <td>{item.harga}</td>
                            <td>{item.total_harga}</td>
                        </tr>
                    );

                    valueTotalAlat += +item.total_harga;
                })
            }

            if (dataDetailBahan && dataDetailBahan.length > 0) {
                dataDetailBahan.forEach((item, index) => {
                    htmlTableDaftarDetailBahan.push(
                        <tr key={index} className={'align-middle'}>
                            <td>{index + 1}.</td>
                            <td>{item.kode}</td>
                            <td>{item.kode_item}</td>
                            <td>{item.nama_item}</td>
                            <td>{item.jumlah}</td>
                            <td>{item.harga}</td>
                            <td>{item.total_harga}</td>
                        </tr>
                    );

                    valueTotalBahan += +item.total_harga;
                })
            }

            if (dataDetailPenolong && dataDetailPenolong.length > 0) {
                dataDetailPenolong.forEach((item, index) => {
                    htmlTableDaftarDetailPenolong.push(
                        <tr key={index} className={'align-middle'}>
                            <td>{index + 1}.</td>
                            <td>{item.kode}</td>
                            <td>{item.kode_item}</td>
                            <td>{item.nama_item}</td>
                            <td>{item.jumlah}</td>
                            <td>{item.harga}</td>
                            <td>{item.total_harga}</td>
                        </tr>
                    );

                    valueTotalPenolong += +item.total_harga;
                })
            }

            if (dataDetailBTKL && dataDetailBTKL.length > 0) {
                dataDetailBTKL.forEach((item, index) => {
                    htmlTableDaftarDetailBTKL.push(
                        <tr key={index} className={'align-middle'}>
                            <td>{index + 1}.</td>
                            <td>{item.kode}</td>
                            <td>{item.kode_item}</td>
                            <td>{item.nama_item}</td>
                            <td>{item.departemen}</td>
                            <td>{item.jumlah}</td>
                            <td>{item.harga}</td>
                            <td>{item.total_harga}</td>
                        </tr>
                    );

                    valueTotalBTKL += +item.total_harga;
                })
            }

            $('#table-data-bahan-baku').DataTable().destroy();
            $('#table-data-bop-penolong').DataTable().destroy();
            $('#table-data-bop-alat').DataTable().destroy();
            $('#table-data-btkl').DataTable().destroy();

            this.setState({
                htmlTableDaftarDetailAlat: htmlTableDaftarDetailAlat,
                htmlTableDaftarDetailBahan: htmlTableDaftarDetailBahan,
                htmlTableDaftarDetailBTKL: htmlTableDaftarDetailBTKL,
                htmlTableDaftarDetailPenolong: htmlTableDaftarDetailPenolong,
                valueTotalAlat: valueTotalAlat,
                valueTotalBahan: valueTotalBahan,
                valueTotalBTKL: valueTotalBTKL,
                valueTotalPenolong: valueTotalPenolong,
                valueHpp: +valueTotalAlat + +valueTotalBahan + +valueTotalBTKL + +valueTotalPenolong
            }, () => {
                $('#table-data-bahan-baku').DataTable();
                $('#table-data-bop-penolong').DataTable();
                $('#table-data-bop-alat').DataTable();
                $('#table-data-btkl').DataTable();

                this.KalkulasiHargaJual();

                HideLoading();
            });
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    GetDetailTunai = () => {
        ShowLoading();

        let htmlTableDaftarTunai = [];

        let kalkulasiTotalHpp = 0;

        if (this.state.dataTunai.length > 0) {
            this.state.dataTunai.forEach((item, index) => {
                htmlTableDaftarTunai.push(
                    <tr key={index}>
                        <td>{index + 1}.</td>
                        <td>{item.kode}</td>
                        <td>{item.kode_item}</td>
                        <td>{item.nama_item}</td>
                        <td>{item.jumlah}</td>
                        <td>{item.harga}</td>
                        <td>{item.total_harga}</td>
                        <td>{item.hpp}</td>
                        <td>{item.total_hpp}</td>
                        <td>
                            <div className={global.table_action}>
                                <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteTunai(item.id)}><FaTrash />Delete</button>
                            </div>
                        </td>
                    </tr>
                );

                kalkulasiTotalHpp += +item.total_hpp;
            });
        }

        $('#table-data').DataTable().destroy();

        this.setState({ htmlTableDaftarTunai: htmlTableDaftarTunai, valueKalkulasiTotalHpp: kalkulasiTotalHpp }, () => {
            $('#table-data').DataTable();

            this.KalkulasiTotalHarga();

            HideLoading();
        });
    }

    GetPesanan = () => {
        ShowLoading();

        $('#table-data-bahan-baku').DataTable().destroy();
        $('#table-data-bop-penolong').DataTable().destroy();
        $('#table-data-bop-alat').DataTable().destroy();
        $('#table-data-btkl').DataTable().destroy();

        axios.get(`${baseURL}/api/transaksi/penjualan/estimasi-pesanan/select.php`, config).then(response => {
            let data = response.data.data;

            this.setState({
                dataPesanan: data,
                valueKodePesanan: GenerateCode('PESAN', data)
            }, () => {
                $('#table-data-bahan-baku').DataTable();
            });
        }).catch(error => {
            console.log(error)

            alert(error);

            HideLoading();
        });
    }

    GetStandarPesanan = async () => {
        ShowLoading();

        axios.get(`${baseURL}/api/transaksi/penjualan/standar-pesanan/select.php`, config).then(response => {
            let data = response.data.data;

            let dataSelectNamaStandarPesanan = [];

            if (data && data.length > 0) {
                for (const item of data) {
                    dataSelectNamaStandarPesanan.push({
                        value: item.kode,
                        label: item.nama
                    });
                }
            }

            this.setState({ dataSelectNamaStandarPesanan: dataSelectNamaStandarPesanan }, () => {
                HideLoading()
            });
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    GetJual = async () => {
        let jenisPenjualan = this.state.jenisPenjualan;

        const formData = new FormData();

        formData.append('jenis_penjualan', jenisPenjualan.toLowerCase());

        axios.post(`${baseURL}/api/transaksi/penjualan/penjualan/select.php`, formData, config).then(response => {
            let dataJual = response.data.data ?? [];

            $('#table-data').DataTable().destroy();

            this.setState({
                dataJual: dataJual,
                valueKodeJual: GenerateCode(
                    jenisPenjualan === 'Tunai' ? 'JT' : jenisPenjualan === 'Konsinyasi' ? 'JK' : 'JP'
                    , dataJual
                )
            }, () => {
                $(`#table-data`).DataTable();
                $('#table-data-bahan-baku').DataTable();
            });
        }).catch(error => {
            console.log(error);
        });
    }

    GetProduk = async () => {
        axios.get(`${baseURL}/api/master/inventory/produk/select.php`, config).then(response => {
            let dataProduk = response.data.data;

            let dataSelectKodeProduk = [];
            let dataSelectNamaProduk = [];

            if (dataProduk.length > 0) {
                dataProduk.forEach(item => {
                    dataSelectKodeProduk.push({
                        value: item.kode,
                        label: item.kode
                    });

                    dataSelectNamaProduk.push({
                        value: item.kode,
                        label: item.nama
                    });
                });
            }

            this.setState({ dataProduk: dataProduk, dataSelectKodeProduk: dataSelectKodeProduk, dataSelectNamaProduk: dataSelectNamaProduk });
        }).catch(error => {
            console.log(error);
        });
    }

    InputChange = async (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    InsertJual = () => {
        const {
            dataKonsinyasi,
            dataTunai,
            jenisPenjualan,
            valueDiskon,
            valueJumlah,
            valueKodeAkun,
            valueKodeConsignee,
            valueKodeCustomer,
            valueKodeJual,
            valueOngkosKirim,
            valueTanggal,
            valueTotalBayar,
            valueTotalJual,
            valueKalkulasiTotalHpp
        } = this.state;

        if (jenisPenjualan.toLowerCase() === 'tunai' && valueKodeAkun.length <= 0) {
            alert('Isi data dengan benar');
            return;
        }

        const valueTotalHarga = Calculate([valueTotalJual, -valueDiskon, valueOngkosKirim]);
        const valuePiutang = Calculate([valueTotalJual, -valueDiskon]);

        if (jenisPenjualan.toLowerCase() === 'tunai' && +valueTotalBayar < +valueTotalHarga) {
            alert('Pembayaran harus melebihi total harga');
            return;
        }

        ShowLoading();

        const formData = new FormData();

        formData.append('kode', valueKodeJual);
        formData.append('tanggal', valueTanggal);
        formData.append('kode_customer', valueKodeCustomer?.value);
        formData.append('kode_consignee', valueKodeConsignee?.value);
        formData.append('total_jual', valueTotalJual);
        formData.append('diskon', valueDiskon);
        formData.append('ongkos_kirim', valueOngkosKirim);
        formData.append('piutang', valuePiutang);
        formData.append('total_hpp', valueKalkulasiTotalHpp);
        formData.append('total_harga', valueTotalHarga);
        formData.append('total_bayar', valueTotalBayar);
        formData.append('kode_akun', valueKodeAkun?.value);

        formData.append('jenis_penjualan', jenisPenjualan.toLowerCase());

        if (jenisPenjualan.toLowerCase() === 'tunai') {
            if (valueKodeAkun?.value === '1102') {
                let file = document.getElementById('input-file-transfer').files[0];

                if (file) {
                    let arg = file.name.split('.');
                    let extension = arg[arg.length - 1];
                    formData.append('file_transfer', file);
                    formData.append('nama_file', `File Transfer - ${valueKodeJual} - ${valueTanggal}.${extension}`);
                } else {
                    alert('Isi data dengan benar');
                    HideLoading();
                    return;
                }
            }

            let jumlah = 0;

            for (const item of dataTunai) {
                jumlah += +item.jumlah;
            }

            formData.append('jumlah', jumlah);
            formData.append('data', JSON.stringify(dataTunai));
        } else if (jenisPenjualan.toLowerCase() === 'konsinyasi') {

            let jumlah = 0;

            for (const item of dataKonsinyasi) {
                jumlah += +item.jumlah;
            }

            formData.append('jumlah', jumlah);
            formData.append('data', JSON.stringify(dataKonsinyasi));
        }

        axios.post(`${baseURL}/api/transaksi/penjualan/penjualan/insert.php`, formData, config).then(() => {
            if (window.confirm("Apakah ingin mencetak nota?")) {
                window.print();
                window.location.reload();
            } else {
                window.location.reload();
            }
        }).catch(error => {
            console.log(error);

            alert(error)

            HideLoading();
        });
    }

    InsertPesanan = () => {
        const {
            valueKodePesanan,
            valueNamaPesanan,
            valueTanggal,
            valueKodeCustomer,
            valueJenisProduk,
            valueJumlah,
            valueHpp,
            valueProfit,
            valueHargaJual,
            valueDeskripsiPesanan
        } = this.state;

        if (!CheckInputValidity('form-data') || this.state.valueKodeCustomer.length <= 0 || this.state.valueJenisProduk.length <= 0) {
            alert('Isi data dengan benar');
            return;
        }

        if (+this.state.valueTotalBahan <= 0 || +this.state.valueProfit <= 0 || +this.state.valueTotalPenolong <= 0 || +this.state.valueTotalAlat <= 0 || +this.state.valueTotalBTKL <= 0) {
            alert('Estimasi total biaya dan Profit tidak boleh 0');
            return;
        }

        ShowLoading();

        const formData = new FormData();

        formData.append('kode', valueKodePesanan);
        formData.append('nama', valueNamaPesanan);
        formData.append('tanggal', valueTanggal);
        formData.append('kode_customer', valueKodeCustomer.value);
        formData.append('jenis_produk', valueJenisProduk.value);
        formData.append('jumlah', valueJumlah);
        formData.append('hpp', valueHpp);
        formData.append('profit', valueProfit);
        formData.append('harga_jual', valueHargaJual);
        formData.append('deskripsi', valueDeskripsiPesanan);

        axios.post(`${baseURL}/api/transaksi/penjualan/estimasi-pesanan/insert.php`, formData, config).then(() => {
            window.location.reload();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    KalkulasiHargaJual = () => {
        const {
            valueHpp,
            valueJumlah,
            valuePengurangan,
            valueProfit
        } = this.state;
        this.setState({
            valueHargaJual: +valueJumlah * (+valueHpp - +valuePengurangan) * (100 + +valueProfit) / 100
        });
    }

    KalkulasiHpp = () => {
        const {
            valueTotalAlat,
            valueTotalBahan,
            valueTotalBTKL,
            valueTotalPenolong
        } = this.state;

        this.setState({
            valueHpp: +valueTotalAlat + +valueTotalBahan + +valueTotalBTKL + +valueTotalPenolong
        }, () => {
            this.KalkulasiHargaJual();
        });
    }

    KalkulasiTotalHarga = () => {
        let totalHarga = 0;
        let jenisPenjualan = this.state.jenisPenjualan;

        if (jenisPenjualan && jenisPenjualan.toString().toLowerCase() === 'tunai') {
            let dataTunai = this.state.dataTunai;

            dataTunai.forEach(item => {
                totalHarga += item.total_harga;
            });
        } else if (jenisPenjualan && jenisPenjualan.toString().toLowerCase() === 'konsinyasi') {
            let dataKonsinyasi = this.state.dataKonsinyasi;

            dataKonsinyasi.forEach(item => {
                totalHarga += item.total_harga;
            });
        } else if (jenisPenjualan && jenisPenjualan.toString().toLowerCase() === 'pesanan') {
            let dataPesanan = this.state.dataPesanan;

            dataPesanan.forEach(item => {
                totalHarga += item.total_harga;
            });
        }

        this.setState({ valueTotalJual: totalHarga }, () => {
            if (totalHarga > this.state.limitDiskon) {
                this.setState({ valuePercentageDiskon: 10, valueDiskon: +totalHarga * 0.1 });
            } else {
                this.setState({ valuePercentageDiskon: 5, valueDiskon: +totalHarga * 0.05 });
            }
        });
    }

    SelectConsignee = (data) => {
        if (data) {
            let valueKode = this.state.dataSelectKodeConsignee.find(item => item.value === data?.value);
            let valueNama = this.state.dataSelectNamaConsignee.find(item => item.value === data?.value);
            let alamat = this.state.dataConsignee.find(item => item.kode = valueKode.value).alamat;

            this.setState({ valueAlamat: alamat, valueKodeConsignee: valueKode, valueNamaConsignee: valueNama });
        } else {
            this.setState({ valueAlamat: '', valueKodeConsignee: '', valueNamaConsignee: '' });
        }
    }

    SelectCustomer = (data) => {
        if (data) {
            let valueKode = this.state.dataSelectKodeCustomer.find(item => item.value === data?.value);
            let valueNama = this.state.dataSelectNamaCustomer.find(item => item.value === data?.value);
            let alamat = this.state.dataCustomer.find(item => item.kode = valueKode.value).alamat;

            this.setState({ valueAlamat: alamat, valueKodeCustomer: valueKode, valueNamaCustomer: valueNama });
        } else {
            this.setState({ valueAlamat: '', valueKodeCustomer: '', valueNamaCustomer: '' });
        }
    }

    SelectProduk = (data) => {
        if (data) {
            let valueKode = this.state.dataSelectKodeProduk.find(item => item.value === data?.value);
            let valueNama = this.state.dataSelectNamaProduk.find(item => item.value === data?.value);
            let harga = this.state.dataProduk.find(item => item.kode === valueKode.value).harga_jual;
            let hpp = this.state.dataProduk.find(item => item.kode === valueKode.value).hpp_per_produk;
            let jumlahMax = this.state.dataProduk.find(item => item.kode === valueKode.value).jumlah;

            console.log(this.state.dataProduk.find(item => item.kode === valueKode.value))

            this.setState({ valueJumlahMax: jumlahMax, valueHarga: harga, valueHpp: hpp, valueKodeProduk: valueKode, valueNamaProduk: valueNama });
        } else {
            this.setState({ valueJumlahMax: 0, valueHarga: 0, valueHpp: 0, valueKodeProduk: '', valueNamaProduk: '' });
        }
    }

    SelectPenjualan = (data) => {
        if (this.state.jenisPenjualan === data?.value) return;

        $('#table-data').DataTable().destroy();
        $('#table-data-bahan-baku').DataTable().destroy();

        this.setState({
            jenisPenjualan: data ? data.value : '',

            dataTunai: [],
            dataKonsinyasi: [],
            dataPesanan: [],

            valueDiskon: 0,
            valueHarga: 0,
            valueHargaJual: 0,
            valueHpp: 0,
            valueJumlah: 0,
            valueJenisPenjualan: data ? data : [],
            valueKodeProduk: [],
            valueKodeJual: '',
            valueKodeConsignee: [],
            valueKodeCustomer: [],
            valueKodeKasMasuk: '',
            valueNamaProduk: [],
            valueNamaConsignee: [],
            valueNamaCustomer: [],
            valueNamaPesanan: '',
            valueOngkosKirim: 0,
            valuePiutang: 0,
            valueSisa: 0,
            valueTanggal: moment().format('YYYY-MM-DD'),
            valueTotalBayar: 0,
            valueTotalKembalian: 0,
            valueTotalJual: 0,
            valueUangMuka: 0,
        }, () => {
            this.GetJual();
        });
    }

    SelectStandarPesanan = (e) => {
        this.setState({ valueNamaStandarPesanan: e }, () => {
            this.GetDetailStandarPesanan(e.value);
        })
    }

    SelectTab = (index) => {
        this.setState({ tabSelected: index }, () => {
            // if (index === 0) this.GetDetailBahan();
            // if (index === 1) this.GetDetailPenolong();
            // if (index === 2) this.GetDetailAlat();
            // if (index === 3) this.GetDetailBTKL();
        });
    }

    render() {
        const {
            dataKonsinyasi,
            dataPesanan,
            dataSelectAkun,
            dataTunai,
            valueAlamat,
            valueDeskripsiPesanan,
            valueDiskon,
            valuePercentageDiskon,
            valueHarga,
            valueHargaJual,
            valueHpp,
            valueJumlah,
            valueJenisProduk,
            valueJenisPenjualan,
            valueKalkulasiTotalHpp,
            valueKodeAkun,
            valueKodeConsignee,
            valueKodeCustomer,
            valueKodeJual,
            valueKodePesanan,
            valueKodeProduk,
            valueNamaConsignee,
            valueNamaCustomer,
            valueNamaPesanan,
            valueNamaProduk,
            valueNamaStandarPesanan,
            valueOngkosKirim,
            valuePengurangan,
            valueProfit,
            valueTanggal,
            valueTotalAlat,
            valueTotalBahan,
            valueTotalBayar,
            valueTotalPenolong,
            valueTotalBTKL,
            valueTotalHpp,
            valueTotalJual,
        } = this.state;

        return (
            <React.Fragment>
                <PrintoutPenjualan
                    alamat={valueAlamat}
                    bayar={valueTotalBayar}
                    data={valueJenisPenjualan?.value?.toLowerCase() === 'tunai' ? this.state.dataTunai : valueJenisPenjualan?.value?.toLowerCase() === 'konsinyasi' && this.state.dataKonsinyasi}
                    diskon={valueDiskon}
                    kode={valueKodeJual}
                    kode_customer={valueKodeCustomer?.value}
                    nama_customer={valueNamaCustomer?.label}
                    kode_consignee={valueKodeConsignee?.value}
                    nama_consignee={valueNamaConsignee?.label}
                    ongkosKirim={valueOngkosKirim}
                    jenis={valueJenisPenjualan?.value?.toLowerCase()}
                    kembalian={Calculate([valueTotalBayar, -valueTotalJual, valueDiskon, -valueOngkosKirim])}
                    tanggal={valueTanggal} totalJual={valueTotalJual} />

                <div className={style.header}>
                    <p className={style.title}>Transaksi Penjualan</p>
                    <p className={style.pathname}>Transaksi / Penjualan / Transaksi Penjualan</p>
                </div>
                <div className={style.content}>
                    <div className={`col-12`}>
                        <form id='form-data' className={`${global.card}`}>
                            <div className={`${global.header}`}>
                                <p className={global.title}>Input Penjualan</p>
                            </div>
                            <div className={`${global.input_group} col-12 col-lg-6`}>
                                <p className={global.title}>Jenis Transaksi</p>
                                <Select isClearable={true} isSearchable={true} options={[
                                    { value: 'Tunai', label: 'Tunai' },
                                    { value: 'Konsinyasi', label: 'Konsinyasi' },
                                    { value: 'Pesanan', label: 'Pesanan' }
                                ]} placeholder={'Select Transaksi...'} value={valueJenisPenjualan} styles={CustomSelect} onChange={(e) => this.SelectPenjualan(e)} />
                            </div>
                            {this.state.jenisPenjualan !== '' ?
                                <React.Fragment>
                                    {this.state.jenisPenjualan === 'Tunai' ?
                                        <React.Fragment>
                                            <div className={`${bootstrap['d-flex']} flex-wrap`}>
                                                <div className={`${global.input_group} col-6 col-lg-2 pe-2`}>
                                                    <p className={global.title}>Kode Jual <span className={global.important}>*</span></p>
                                                    <input type="text" id='valueKodeJual' maxLength={10} value={valueKodeJual} required={true} readOnly={true} />
                                                </div>
                                                <div className={`${global.input_group} col-6 col-lg-2 px-lg-2`}>
                                                    <p className={global.title}>Tanggal <span className={global.important}>*</span></p>
                                                    <input type="date" id='valueTanggal' value={valueTanggal} onChange={this.InputChange} required={true} />
                                                </div>
                                                <div className={`${global.input_group} col-4 col-lg-3 px-lg-2`}>
                                                    <p className={global.title}>Kode Customer <span className={global.important}>*</span></p>
                                                    <Select id='select-kode-customer' isClearable={true} isSearchable={true} options={this.state.dataSelectKodeCustomer} placeholder={'Select Kode...'} value={valueKodeCustomer} styles={CustomSelect} onChange={(data) => this.SelectCustomer(data)} isDisabled={[dataKonsinyasi.length, dataPesanan.length, dataTunai.length].some(item => item > 0)} />
                                                </div>
                                                <div className={`${global.input_group} col-8 col-lg-5 ps-2`}>
                                                    <p className={global.title}>Nama Customer <span className={global.important}>*</span></p>
                                                    <Select id='select-nama-customer' isClearable={true} isSearchable={true} options={this.state.dataSelectNamaCustomer} placeholder={'Select Nama...'} value={valueNamaCustomer} styles={CustomSelect} onChange={(data) => this.SelectCustomer(data)} isDisabled={[dataKonsinyasi.length, dataPesanan.length, dataTunai.length].some(item => item > 0)} />
                                                </div>
                                            </div>
                                            <div className={`${bootstrap['d-flex']} flex-wrap`}>
                                                <div className={`${global.input_group} col-4 col-lg-3 pe-2`}>
                                                    <p className={global.title}>Kode Produk <span className={global.important}>*</span></p>
                                                    <Select id='select-kode-produk' isClearable={true} isSearchable={true} options={this.state.dataSelectKodeProduk} placeholder={'Select Kode...'} value={valueKodeProduk} styles={CustomSelect} onChange={this.SelectProduk} />
                                                </div>
                                                <div className={`${global.input_group} col-5 col-lg-6 px-lg-2`}>
                                                    <p className={global.title}>Nama Produk <span className={global.important}>*</span></p>
                                                    <Select id='select-nama-produk' name='select-nama-produk' isClearable={true} isSearchable={true} options={this.state.dataSelectNamaProduk} placeholder={'Select Nama...'} value={valueNamaProduk} styles={CustomSelect} onChange={this.SelectProduk} />
                                                </div>
                                                <div className={`${global.input_group} col-3 ps-2`}>
                                                    <p className={global.title}>Jumlah <span className={global.important}>*</span></p>
                                                    <input type="text" id='valueJumlah' className='text-end' value={valueJumlah} min={0} onInput={InputFormatNumber} onChange={e => this.setState({
                                                        valueJumlah: +e.target.value > +this.state.valueJumlahMax ? this.state.valueJumlahMax : e.target.value,
                                                        valueTotalHpp: +e.target.value * +valueHpp
                                                    })} required={true} />
                                                </div>
                                            </div>
                                            <div className={`${bootstrap['d-flex']} flex-wrap`}>
                                                <div className={`${global.input_group} col-3 pe-2`}>
                                                    <p className={global.title}>Harga <span className={global.important}>*</span></p>
                                                    <input type="text" id='valueHarga' className='text-end' value={SetPriceFormat(valueHarga)} required={true} readOnly={true} />
                                                </div>
                                                <div className={`${global.input_group} col-3 px-2`}>
                                                    <p className={global.title}>Total Harga <span className={global.important}>*</span></p>
                                                    <input type="text" id='valueTotalHarga' className='text-end' value={SetPriceFormat(parseInt(valueJumlah === '' ? 0 : valueJumlah) * parseInt(valueHarga))} required={true} readOnly={true} />
                                                </div>
                                                <div className={`${global.input_group} col-3 px-2`}>
                                                    <p className={global.title}>Harga Pokok Penjualan</p>
                                                    <input type="text" id='valueHarga' className='text-end' value={SetPriceFormat(valueHpp)} readOnly={true} />
                                                </div>
                                                <div className={`${global.input_group} col-3 ps-2`}>
                                                    <p className={global.title}>Total HPP</p>
                                                    <input type="text" id='valueTotalHarga' className='text-end' value={SetPriceFormat(valueTotalHpp)} readOnly={true} />
                                                </div>
                                            </div>
                                            <button type='button' className={global.button} onClick={this.AddDetail}><MdAdd /> Tambah</button>
                                        </React.Fragment>
                                        :
                                        this.state.jenisPenjualan === 'Pesanan' ?
                                            <React.Fragment>
                                                <div className={`${bootstrap['d-flex']} flex-wrap`}>
                                                    <div className={`${global.input_group} col-6 col-lg-2 pe-2`}>
                                                        <p className={global.title}>Kode Pesanan <span className={global.important}>*</span></p>
                                                        <input type="text" id='valueKodePesanan' value={valueKodePesanan} required={true} readOnly={true} />
                                                    </div>
                                                    <div className={`${global.input_group} col-6 col-lg-2 ps-2 px-lg-2`}>
                                                        <p className={global.title}>Tanggal <span className={global.important}>*</span></p>
                                                        <input type="date" id='valueTanggal' value={valueTanggal} onChange={this.InputChange} required={true} />
                                                    </div>
                                                    <div className={`${global.input_group} col-6 px-2`}>
                                                        <p className={global.title}>Nama Pesanan <span className={global.important}>*</span></p>
                                                        <input type="text" id='valueNamaPesanan' value={valueNamaPesanan} onChange={this.InputChange} required={true} />
                                                    </div>
                                                    <div className={`${global.input_group} col-6 col-lg-2 mt-2 mt-lg-0 ps-2`}>
                                                        <p className={global.title}>Jenis Produk <span className={global.important}>*</span></p>
                                                        <Select id='select-jenis-produk' name='select-jenis-produk' isClearable={true} isSearchable={true} options={[
                                                            { value: 'Kain', label: 'Kain' },
                                                            { value: 'Pakaian', label: 'Pakaian' }
                                                        ]} placeholder={'Select Jenis Produk...'} value={valueJenisProduk} onChange={e => this.setState({ valueJenisProduk: e })} styles={CustomSelect} />
                                                    </div>
                                                </div>
                                                <div className={`${bootstrap['d-flex']} flex-wrap`}>
                                                    <div className={`${global.input_group} col-6 pe-2`}>
                                                        <p className={global.title}>Kode Customer <span className={global.important}>*</span></p>
                                                        <Select id='select-kode-customer' name='select-kode-customer' isClearable={true} isSearchable={true} options={this.state.dataSelectKodeCustomer} placeholder={'Select Kode...'} value={valueKodeCustomer} onChange={e => this.SelectCustomer(e)} styles={CustomSelect} />
                                                    </div>
                                                    <div className={`${global.input_group} col-6 ps-2`}>
                                                        <p className={global.title}>Nama Customer <span className={global.important}>*</span></p>
                                                        <Select id='select-nama-customer' name='select-nama-customer' isClearable={true} isSearchable={true} options={this.state.dataSelectNamaCustomer} placeholder={'Select Nama Customer...'} value={valueNamaCustomer} onChange={e => this.SelectCustomer(e)} styles={CustomSelect} />
                                                    </div>
                                                </div>
                                                <div className={`${bootstrap['d-flex']} flex-wrap`}>
                                                    <div className={`${global.input_group} col-6 col-lg-2 pe-2`}>
                                                        <p className={global.title}>Jumlah <span className={global.important}>*</span></p>
                                                        <input type="text" id='valueJumlah' value={valueJumlah} onInput={InputFormatNumber} min={0} onChange={async e => {
                                                            await this.InputChange(e);
                                                            this.KalkulasiHargaJual();
                                                            this.setState({
                                                                valueJumlah: e.target.value,
                                                                valueTotalHpp: +e.target.value * +valueHpp
                                                            });
                                                        }} required={true} />
                                                    </div>
                                                    <div className={`${global.input_group} col-6 col-lg-2 ps-2`}>
                                                        <p className={global.title}>Profit (%) <span className={global.important}>*</span></p>
                                                        <input type="text" id='valueProfit' value={valueProfit} onInput={InputFormatNumber} onChange={async e => {
                                                            await this.InputChange(e);
                                                            this.KalkulasiHargaJual();
                                                        }} required={true} />
                                                    </div>
                                                    <div className={`${global.input_group} col-6 col-lg-2 mt-2 mt-lg-0 pe-2 px-lg-2`}>
                                                        <p className={global.title}>HPP <span className={global.important}>*</span></p>
                                                        <input type="text" id='valueHpp' value={SetPriceFormat(valueHpp)} required={true} readOnly={true} />
                                                    </div>
                                                    <div className={`${global.input_group} col-6 col-lg-2 mt-2 mt-lg-0 ps-2 px-lg-2`}>
                                                        <p className={global.title}>Pengurangan Harga <span className={global.important}>*</span></p>
                                                        <input type="text" id='valuePengurangan' value={valuePengurangan} onInput={InputFormatNumber} onChange={async (event) => {
                                                            await this.InputChange(event);
                                                            await this.KalkulasiHargaJual();

                                                        }} required={true} />
                                                    </div>
                                                    <div className={`${global.input_group} col-12 col-lg-2 mt-2 mt-lg-0 ps-lg-2`}>
                                                        <p className={global.title}>Harga Jual <span className={global.important}>*</span></p>
                                                        <input type="text" id='valueHargaJual' value={SetPriceFormat(valueHargaJual)} required={true} readOnly={true} />
                                                    </div>
                                                </div>
                                                <div className={`${bootstrap['d-flex']} flex-wrap`}>
                                                    <div className={`${global.input_group} col-6 pe-2`}>
                                                        <p className={global.title}>Nama Standar Pesanan <span className={global.important}>*</span></p>
                                                        <Select id='select-nama-standar' name='select-nama-standar' isClearable={true} isSearchable={true} options={this.state.dataSelectNamaStandarPesanan} placeholder={'Select Nama...'} value={valueNamaStandarPesanan} onChange={e => this.SelectStandarPesanan(e)} styles={CustomSelect} />
                                                    </div>
                                                </div>
                                                <div className='d-flex flex-wrap'>
                                                    <div className='col-6 pe-2'>
                                                        <button type='button' className={`${global.button} w-100`} onClick={this.InsertPesanan}>Simpan</button>
                                                    </div>
                                                    <div className='col-6 ps-2'>
                                                        <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }} onClick={() => this.SelectPenjualan(null)}>Batal</button>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                                <div className={`${bootstrap['d-flex']} flex-wrap`}>
                                                    <div className={`${global.input_group} col-2 pe-2`}>
                                                        <p className={global.title}>Kode Jual <span className={global.important}>*</span></p>
                                                        <input type="text" id='valueKodeJual' maxLength={10} value={valueKodeJual} required={true} readOnly={true} />
                                                    </div>
                                                    <div className={`${global.input_group} col-2 px-2`}>
                                                        <p className={global.title}>Tanggal <span className={global.important}>*</span></p>
                                                        <input type="date" id='valueTanggal' value={valueTanggal} onChange={this.InputChange} required={true} />
                                                    </div>
                                                    <div className={`${global.input_group} col-3 px-2`}>
                                                        <p className={global.title}>Kode Consignee <span className={global.important}>*</span></p>
                                                        <Select id='select-kode-consignee' isClearable={true} isSearchable={true} options={this.state.dataSelectKodeConsignee} placeholder={'Select Kode...'} value={valueKodeConsignee} styles={CustomSelect} onChange={(data) => this.SelectConsignee(data)} />
                                                    </div>
                                                    <div className={`${global.input_group} col-5 ps-2`}>
                                                        <p className={global.title}>Nama Consignee <span className={global.important}>*</span></p>
                                                        <Select id='select-nama-consignee' isClearable={true} isSearchable={true} options={this.state.dataSelectNamaConsignee} placeholder={'Select Nama...'} value={valueNamaConsignee} styles={CustomSelect} onChange={(data) => this.SelectConsignee(data)} />
                                                    </div>
                                                </div>
                                                <div className={`${bootstrap['d-flex']} flex-wrap`}>
                                                </div>
                                                <div className={`${bootstrap['d-flex']} flex-wrap`}>
                                                    <div className={`${global.input_group} col-3 pe-2`}>
                                                        <p className={global.title}>Kode Produk <span className={global.important}>*</span></p>
                                                        <Select id='select-kode-produk' isClearable={true} isSearchable={true} options={this.state.dataSelectKodeProduk} placeholder={'Select Kode...'} value={valueKodeProduk} styles={CustomSelect} onChange={this.SelectProduk} />
                                                    </div>
                                                    <div className={`${global.input_group} col-6 px-2`}>
                                                        <p className={global.title}>Nama Produk <span className={global.important}>*</span></p>
                                                        <Select id='select-nama-produk' isClearable={true} isSearchable={true} options={this.state.dataSelectNamaProduk} placeholder={'Select Nama...'} value={valueNamaProduk} styles={CustomSelect} onChange={this.SelectProduk} />
                                                    </div>
                                                    <div className={`${global.input_group} col-3 ps-2`}>
                                                        <p className={global.title}>Jumlah <span className={global.important}>*</span></p>
                                                        <input type="text" id='valueJumlah' className='text-end' value={valueJumlah} min={0} onInput={InputFormatNumber} onChange={e => this.setState({
                                                            valueJumlah: +e.target.value > +this.state.valueJumlahMax ? this.state.valueJumlahMax : e.target.value,
                                                            valueTotalHpp: +e.target.value * +valueHpp
                                                        })} required={true} />
                                                    </div>
                                                </div>
                                                <div className={`${bootstrap['d-flex']} flex-wrap`}>
                                                    <div className={`${global.input_group} col-3 pe-2`}>
                                                        <p className={global.title}>Harga <span className={global.important}>*</span></p>
                                                        <input type="text" id='valueHarga' className='text-end' value={SetPriceFormat(valueHarga)} required={true} readOnly={true} />
                                                    </div>
                                                    <div className={`${global.input_group} col-3 px-2`}>
                                                        <p className={global.title}>Total Harga <span className={global.important}>*</span></p>
                                                        <input type="text" id='valueTotalHarga' className='text-end' value={SetPriceFormat(parseInt(valueJumlah === '' ? 0 : valueJumlah) * parseInt(valueHarga))} required={true} readOnly={true} />
                                                    </div>
                                                    <div className={`${global.input_group} col-3 px-2`}>
                                                        <p className={global.title}>Harga Pokok Penjualan</p>
                                                        <input type="text" id='valueHarga' className='text-end' value={SetPriceFormat(valueHpp)} readOnly={true} />
                                                    </div>
                                                    <div className={`${global.input_group} col-3 ps-2`}>
                                                        <p className={global.title}>Total HPP</p>
                                                        <input type="text" id='valueTotalHarga' className='text-end' value={SetPriceFormat(valueTotalHpp)} readOnly={true} />
                                                    </div>
                                                </div>
                                                <button type='button' className={global.button} onClick={this.AddDetail}><MdAdd /> Tambah</button>
                                            </React.Fragment>
                                    }
                                </React.Fragment>
                                : null}
                        </form>
                    </div>
                    {this.state.jenisPenjualan !== '' ?
                        this.state.jenisPenjualan === 'Pesanan' ?
                            <div className={`col-12`}>
                                <div className={`${global.tab_card} pb-2`}>
                                    <div className={`${global.item} ${this.state.tabSelected === 0 ? global.active : ''}`} onClick={() => this.SelectTab(0)}>
                                        <p className={`${global.name}`}>Bahan Baku</p>
                                    </div>
                                    <div className={`${global.item} ${this.state.tabSelected === 1 ? global.active : ''}`} onClick={() => this.SelectTab(1)}>
                                        <p className={`${global.name}`}>BOP (Penolong)</p>
                                    </div>
                                    <div className={`${global.item} ${this.state.tabSelected === 2 ? global.active : ''}`} onClick={() => this.SelectTab(2)}>
                                        <p className={`${global.name}`}>BOP (Alat)</p>
                                    </div>
                                    <div className={`${global.item} ${this.state.tabSelected === 3 ? global.active : ''}`} onClick={() => this.SelectTab(3)}>
                                        <p className={`${global.name}`}>BTKL</p>
                                    </div>
                                    <div className={`${global.item} ${this.state.tabSelected === 4 ? global.active : ''}`} onClick={() => this.SelectTab(4)}>
                                        <p className={`${global.name}`}>Catatan Pesanan</p>
                                    </div>
                                </div>
                                <div className={`${global.card} w-100 ${this.state.tabSelected === 0 ? '' : 'd-none'}`}>
                                    {/* <div className='d-flex flex-wrap'> 
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Kode Bahan</p>
                                            <Select id='select-kode-bahan-bahan-baku' name='select-kode-bahan-bahan-baku' isClearable={true} isSearchable={true} options={this.state.dataSelectKodeBahan} value={valueKodeBahan} placeholder={'Select Kode...'} onChange={e => this.SelectBahan(e)} styles={CustomSelect} />
                                        </div>
                                        <div className={`${global.input_group} col-8 px-2`}>
                                            <p className={global.title}>Nama Bahan</p>
                                            <Select id='select-nama-bahan-bahan-baku' name='select-nama-bahan-bahan-baku' isClearable={true} isSearchable={true} options={this.state.dataSelectNamaBahan} value={valueNamaBahan} placeholder={'Select Nama Bahan...'} onChange={e => this.SelectBahan(e)} styles={CustomSelect} />
                                        </div>
                                    </div>
                                    <div className={`d-flex flex-wrap`}>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Harga</p>
                                            <input type="text" id='valueHargaBahan' value={SetPriceFormat(valueHargaBahan)} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-4 px-2`}>
                                            <p className={global.title}>Jumlah</p>
                                            <input type="text" id='valueJumlahBahan' value={valueJumlahBahan} onChange={this.InputChange} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-3 ms-auto ps-2`}>
                                            <p className={global.title}>Aksi</p>
                                            <button type='button' className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }} onClick={this.AddDetailBahan}><MdAdd /> Tambah</button>
                                        </div>
                                    </div>*/}
                                    <div className={`table-responsive`}>
                                        <table id='table-data-bahan-baku' className={`table w-100`}>
                                            <thead className='text-nowrap'>
                                                <tr>
                                                    <td>No.</td>
                                                    <td>Kode</td>
                                                    <td>Kode Bahan</td>
                                                    <td>Nama Bahan</td>
                                                    <td>Jumlah</td>
                                                    <td>Harga</td>
                                                    <td>Biaya</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.htmlTableDaftarDetailBahan}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className={`d-flex flex-column gap-2 pb-2`}>
                                        <div className={`align-items-center ${global.input_group_row}`}>
                                            <p className={`${global.title} col-3`}>Total Bahan Baku</p>
                                            <input type="text" id='valueTotalBahan' value={SetPriceFormat(valueTotalBahan)} readOnly={true} />
                                        </div>
                                    </div>
                                </div>
                                <div className={`${global.card} ${this.state.tabSelected === 1 ? '' : 'd-none'}`}>
                                    {/* <div className='d-flex'> 
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Kode Bahan</p>
                                            <Select id='select-kode-bahan-bop-penolong' name='select-kode-bahan-bop-penolong' isClearable={true} isSearchable={true} options={this.state.dataSelectKodePenolong} placeholder={'Select Kode...'} value={valueKodePenolong} onChange={e => this.SelectPenolong(e)} styles={CustomSelect} />
                                        </div>
                                        <div className={`${global.input_group} col-8 px-2`}>
                                            <p className={global.title}>Nama Bahan</p>
                                            <Select id='select-nama-bahan-bop-penolong' name='select-nama-bahan-bop-penolong' isClearable={true} isSearchable={true} options={this.state.dataSelectNamaPenolong} placeholder={'Select Nama Bahan...'} value={valueNamaPenolong} onChange={e => this.SelectPenolong(e)} styles={CustomSelect} />
                                        </div>
                                    </div>
                                    <div className={`d-flex`}>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Harga</p>
                                            <input type="text" id='valueHargaPenolong' value={SetPriceFormat(valueHargaPenolong)} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-4 px-2`}>
                                            <p className={global.title}>Jumlah</p>
                                            <input type="text" id='valueJumlahPenolong' value={valueJumlahPenolong} onChange={this.InputChange} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-3 ms-auto ps-2`}>
                                            <p className={global.title}>Aksi</p>
                                            <button type='button' className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }} onClick={this.AddDetailPenolong}><MdAdd /> Tambah</button>
                                        </div>
                                    </div>*/}
                                    <div className={`table-responsive`}>
                                        <table id='table-data-bop-penolong' className={`table w-100`}>
                                            <thead className='text-nowrap'>
                                                <tr>
                                                    <td>No.</td>
                                                    <td>Kode</td>
                                                    <td>Kode Bahan</td>
                                                    <td>Nama Bahan</td>
                                                    <td>Jumlah</td>
                                                    <td>Harga</td>
                                                    <td>Biaya</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.htmlTableDaftarDetailPenolong}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className={`d-flex flex-column gap-2 pb-2`}>
                                        <div className={`align-items-center ${global.input_group_row}`}>
                                            <p className={`${global.title} col-3`}>Total BOP Penolong</p>
                                            <input type="text" id='valueTotalPenolong' value={SetPriceFormat(valueTotalPenolong)} readOnly={true} />
                                        </div>
                                    </div>
                                </div>
                                <div className={`${global.card} ${this.state.tabSelected === 2 ? '' : 'd-none'}`}>
                                    {/* <div className='d-flex'> 
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Kode Alat</p>
                                            <Select id='select-kode-bahan-bop-alat' name='select-kode-bahan-bop-alat' isClearable={true} isSearchable={true} options={this.state.dataSelectKodeAlat} value={valueKodeAlat} placeholder={'Select Kode...'} onChange={e => this.SelectAlat(e)} styles={CustomSelect} />
                                        </div>
                                        <div className={`${global.input_group} col-8 px-2`}>
                                            <p className={global.title}>Nama Alat</p>
                                            <Select id='select-nama-bahan-bop-alat' name='select-nama-bahan-bop-alat' isClearable={true} isSearchable={true} options={this.state.dataSelectNamaAlat} value={valueNamaAlat} placeholder={'Select Nama Bahan...'} onChange={e => this.SelectAlat(e)} styles={CustomSelect} />
                                        </div>
                                    </div>
                                    <div className={`d-flex`}>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Tarif BOP</p>
                                            <input type="text" id='valueHargaAlat' value={SetPriceFormat(valueHargaAlat)} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-4 px-2`}>
                                            <p className={global.title}>Jumlah</p>
                                            <input type="text" id='valueJumlahAlat' value={valueJumlahAlat} onChange={this.InputChange} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-3 ms-auto ps-2`}>
                                            <p className={global.title}>Aksi</p>
                                            <button type='button' className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }} onClick={this.AddDetailAlat}><MdAdd /> Tambah</button>
                                        </div>
                                    </div>*/}
                                    <div className={`table-responsive`}>
                                        <table id='table-data-bop-alat' className={`table w-100`}>
                                            <thead className='text-nowrap'>
                                                <tr>
                                                    <td>No.</td>
                                                    <td>Kode</td>
                                                    <td>Kode Alat</td>
                                                    <td>Nama Alat</td>
                                                    <td>Jumlah</td>
                                                    <td>Tarif BOP</td>
                                                    <td>Biaya</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.htmlTableDaftarDetailAlat}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className={`d-flex flex-column gap-2 pb-2`}>
                                        <div className={`align-items-center ${global.input_group_row}`}>
                                            <p className={`${global.title} col-3`}>Total BOP Alat</p>
                                            <input type="text" id='valueTotalAlat' value={SetPriceFormat(valueTotalAlat)} readOnly={true} />
                                        </div>
                                    </div>
                                </div>
                                <div className={`${global.card} ${this.state.tabSelected === 3 ? '' : 'd-none'}`}>
                                    {/* <div className='d-flex'> 
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Kode TKL</p>
                                            <Select id='select-kode-btkl' name='select-kode-btkl' isClearable={true} isSearchable={true} options={this.state.dataSelectKodeBTKL} placeholder={'Select Kode...'} value={valueKodeBTKL} onChange={e => this.SelectBTKL(e)} styles={CustomSelect} />
                                        </div>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Nama Tenaga Kerja</p>
                                            <Select id='select-nama-btkl' name='select-nama-btkl' isClearable={true} isSearchable={true} options={this.state.dataSelectNamaBTKL} placeholder={'Select Nama...'} value={valueNamaBTKL} onChange={e => this.SelectBTKL(e)} styles={CustomSelect} />
                                        </div>
                                        <div className={`${global.input_group} col-4 px-2`}>
                                            <p className={global.title}>Departemen</p>
                                            <input type="text" id='valueDepartemen' value={valueDepartemen} readOnly={true} />
                                        </div>
                                    </div>
                                    <div className={`d-flex`}>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Upah</p>
                                            <input type="text" id='valueHargaBTKL' value={SetPriceFormat(valueUpah)} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-4 px-2`}>
                                            <p className={global.title}>Jumlah</p>
                                            <input type="text" id='valueJumlahBTKL' value={valueJumlahBTKL} onChange={this.InputChange} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-3 ms-auto ps-2`}>
                                            <p className={global.title}>Aksi</p>
                                            <button type='button' className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }} onClick={this.AddDetailBTKL}><MdAdd /> Tambah</button>
                                        </div>
                                    </div>*/}
                                    <div className={`table-responsive`}>
                                        <table id='table-data-btkl' className={`table w-100`}>
                                            <thead className='text-nowrap'>
                                                <tr>
                                                    <td>No.</td>
                                                    <td>Kode</td>
                                                    <td>Kode TKL</td>
                                                    <td>Nama Tenaga Kerja</td>
                                                    <td>Departemen</td>
                                                    <td>Jumlah</td>
                                                    <td>Upah</td>
                                                    <td>Biaya</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.htmlTableDaftarDetailBTKL}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className={`d-flex flex-column gap-2 pb-2`}>
                                        <div className={`align-items-center ${global.input_group_row}`}>
                                            <p className={`${global.title} col-3`}>Total BTKL</p>
                                            <input type="text" id='valueTotalBTKL' value={SetPriceFormat(valueTotalBTKL)} readOnly={true} />
                                        </div>
                                    </div>
                                </div>
                                <div className={`${global.card} ${this.state.tabSelected === 4 ? '' : 'd-none'}`}>
                                    <div className={`${global.input_group}`}>
                                        <p className={global.title}>Deskripsi Pesanan</p>
                                        <textarea id="valueDeskripsiPesanan" cols="30" rows="10" value={valueDeskripsiPesanan} onChange={this.InputChange}></textarea>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className={`${global.card}`}>
                                <div className={`${global.header}`}>
                                    <p className={global.title}>Daftar Penjualan</p>
                                </div>
                                {this.state.jenisPenjualan === 'Tunai' ?
                                    <>
                                        <div className={`table-responsive`}>
                                            <table id='table-data' className={`table w-100`}>
                                                <thead>
                                                    <tr>
                                                        <td>No.</td>
                                                        <td>Kode</td>
                                                        <td>Kode Produk</td>
                                                        <td>Nama Produk</td>
                                                        <td>Jumlah Jual</td>
                                                        <td>Harga Jual</td>
                                                        <td>Total Harga</td>
                                                        <td>Harga Pokok Penjualan</td>
                                                        <td>Total HPP</td>
                                                        <td>Aksi</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.htmlTableDaftarTunai}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className={`d-flex flex-column gap-2 pb-2`}>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Total Jual</p>
                                                <input type="text" id='valueTotalJual' className={'col-4'} value={SetPriceFormat(valueTotalJual)} readOnly={true} />
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Total Harga Pokok Penjualan</p>
                                                <input type="text" id='valueTotalJual' className={'col-4'} value={SetPriceFormat(valueKalkulasiTotalHpp)} readOnly={true} />
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Diskon</p>
                                                <input type="text" id='valueDiskon' className={'col-4'} value={`${valuePercentageDiskon}%`} readOnly={true} />
                                            </div>
                                        </div>
                                        <div className={`align-items-center ${global.input_group_row}`}>
                                            <p className={`${global.title} col-3`}>Ongkos Kirim</p>
                                            <input type="text" id='valueOngkosKirim' className={`col-4`} value={valueOngkosKirim} onInput={InputFormatNumber} onChange={this.InputChange} />
                                        </div>
                                        <div className={`align-items-center ${global.input_group_row}`}>
                                            <p className={`${global.title} col-3`}>Total Harga</p>
                                            <input type="text" id='valueTotalHarga' className={`col-4`} value={SetPriceFormat(Calculate([valueTotalJual, -valueDiskon, valueOngkosKirim]))} readOnly={true} />
                                            <div className='col-5 ps-2'>
                                                <Select id='select-kode-akun' name='select-kode-akun' className={`col-5`} isClearable={true} isSearchable={true} options={dataSelectAkun} placeholder={'Select Akun...'} value={valueKodeAkun} styles={CustomSelect} onChange={e => this.setState({ valueKodeAkun: e })} />
                                            </div>
                                        </div>
                                        <div className={`align-items-center ${global.input_group_row}`}>
                                            <p className={`${global.title} col-3`}>Bayar</p>
                                            <input type="text" id='valueTotalBayar' className={`col-4`} value={valueTotalBayar} onInput={InputFormatNumber} onChange={this.InputChange} />
                                        </div>
                                        <div className={`align-items-center ${global.input_group_row}`}>
                                            <p className={`${global.title} col-3`}>Kembalian</p>
                                            <input type="text" id='valueTotalKembalian' className={`col-4`} value={SetPriceFormat(Calculate([valueTotalBayar, -valueTotalJual, valueDiskon, -valueOngkosKirim]))} readOnly={true} />
                                        </div>
                                        <div className='d-flex'>
                                            {valueKodeAkun?.value === '1102' &&
                                                <div className='{`${global.input_group}`}'>
                                                    <p>Upload File Transfer</p>
                                                    <input type="file" accept='.pdf' id='input-file-transfer' name='input-file-transfer' required={true} />
                                                </div>
                                            }
                                        </div>
                                    </>
                                    :
                                    this.state.jenisPenjualan === 'Konsinyasi' &&
                                    <React.Fragment>
                                        <div className={`table-responsive`}>
                                            <table id='table-data' className={`table w-100`}>
                                                <thead>
                                                    <tr>
                                                        <td>No.</td>
                                                        <td>Kode</td>
                                                        <td>Kode Produk</td>
                                                        <td>Nama Produk</td>
                                                        <td>Jumlah Jual</td>
                                                        <td>Harga Jual</td>
                                                        <td>Total Harga</td>
                                                        <td>Harga Pokok Penjualan</td>
                                                        <td>Total HPP</td>
                                                        <td>Aksi</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.htmlTableDaftarKonsinyasi}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className={`d-flex flex-column gap-2 pb-2`}>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Total Jual</p>
                                                <input type="text" id='valueTotalJual' className={'col-6'} value={SetPriceFormat(valueTotalJual)} readOnly={true} />
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Total Harga Pokok Penjualan</p>
                                                <input type="text" id='valueTotalJual' className={'col-6'} value={SetPriceFormat(valueKalkulasiTotalHpp)} readOnly={true} />
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Diskon</p>
                                                <input type="text" id='valueDiskon' className={'col-6'} value={`${valuePercentageDiskon}%`} readOnly={true} />
                                            </div>
                                        </div>
                                        <div className={`align-items-center ${global.input_group_row}`}>
                                            <p className={`${global.title} col-3`}>Piutang</p>
                                            <input type="text" id='valuePiutang' className={'col-6'} value={SetPriceFormat(Calculate([valueTotalJual, -valueDiskon]))} readOnly={true} />
                                        </div>
                                    </React.Fragment>
                                }
                                <div className='d-flex flex-column gap-2 pt-2'>
                                    <div className='d-flex'>
                                        <div className='col-6 pe-2'>
                                            <button type='button' className={`${global.button} w-100`} onClick={this.InsertJual}>Simpan</button>
                                        </div>
                                        <div className='col-6 ps-2'>
                                            <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }} onClick={() => this.SelectPenjualan(null)}>Batal</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        : null}
                </div>
            </React.Fragment>
        )
    }
}

export default transaksi_penjualan