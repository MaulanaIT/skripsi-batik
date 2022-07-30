import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import { MdAdd } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa';
import { baseURL, Calculate, CheckInputValidity, config, GenerateCode, HideLoading, InputFormatNumber, ShowLoading } from '../../../component/helper';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/penjualan/transaksi_penjualan.module.css';

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

export class transaksi_penjualan extends Component {

    state = {
        dataAkun: [],
        dataAlat: [],
        dataBahan: [],
        dataBTKL: [],
        dataPenolong: [],
        dataDetailAlat: [],
        dataDetailBahan: [],
        dataDetailBTKL: [],
        dataDetailPenolong: [],
        dataJual: [],
        dataKonsinyasi: [],
        dataPesanan: [],
        dataProduk: [],
        dataSupplier: [],
        dataTunai: [],

        kode: '',

        dataSelectAkun: [],
        dataSelectKodeAlat: [],
        dataSelectNamaAlat: [],
        dataSelectKodeBahan: [],
        dataSelectNamaBahan: [],
        dataSelectKodeBTKL: [],
        dataSelectNamaBTKL: [],
        dataSelectKodePenolong: [],
        dataSelectNamaPenolong: [],
        dataSelectKodeProduk: [],
        dataSelectNamaProduk: [],
        dataSelectKodeConsignee: [],
        dataSelectNamaConsignee: [],
        dataSelectKodeCustomer: [],
        dataSelectNamaCustomer: [],

        htmlTableDaftarTunai: [],
        htmlTableDaftarKonsinyasi: [],
        htmlTableDaftarDetailAlat: [],
        htmlTableDaftarDetailBahan: [],
        htmlTableDaftarDetailBTKL: [],
        htmlTableDaftarDetailPenolong: [],

        valueDeskripsiPesanan: '',
        valueDepartemen: '',
        valueDiskon: 0,
        valueHarga: 0,
        valueHargaAlat: 0,
        valueHargaBahan: 0,
        valueHargaPenolong: 0,
        valueHargaJual: 0,
        valueHpp: 0,
        valueJumlah: 0,
        valueJumlahAlat: 0,
        valueJumlahBahan: 0,
        valueJumlahBTKL: 0,
        valueJumlahPenolong: 0,
        valueJenisProduk: [],
        valueJenisPenjualan: [],
        valueKalkulasiTotalHpp: 0,
        valueKodeAkun: [],
        valueKodeAlat: [],
        valueKodeBTKL: [],
        valueKodeBahan: [],
        valueKodePenolong: [],
        valueKodeProduk: [],
        valueKodeJual: '',
        valueKodeConsignee: [],
        valueKodeCustomer: [],
        valueKodeKasMasuk: '',
        valueKodePesanan: '',
        valueNamaAlat: [],
        valueNamaBahan: [],
        valueNamaBTKL: [],
        valueNamaConsignee: [],
        valueNamaCustomer: [],
        valueNamaPenolong: [],
        valueNamaProduk: [],
        valueOngkosKirim: 0,
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
        valueUpah: 0,

        tabSelected: 0,

        jenisPenjualan: ''
    }

    async componentDidMount() {
        await this.GetAkun();
        await this.GetAlat();
        await this.GetBahan();
        await this.GetPenolong();
        await this.GetCustomer();
        await this.GetConsignee();
        await this.GetPesanan();
        await this.GetProduk();
        await this.GetTenagaKerja();
    }

    AddDetail = () => {
        const {
            valueHarga,
            valueJumlah,
            valueKodeJual,
            valueKodeProduk,
            valueNamaProduk,
            valueHpp,
            valueTotalHpp
        } = this.state;

        if (this.state.jenisPenjualan.toLowerCase() === 'tunai') {
            if (!CheckInputValidity('form-data') || this.state.valueKodeCustomer.length <= 0 || valueKodeProduk.length <= 0) {
                alert('Isi data dengan benar');
                return;
            }

            let dataTunai = this.state.dataTunai;

            let check = dataTunai.findIndex(item => item.kode_item === valueKodeProduk.value && item.harga === valueHarga);

            if (check < 0) {
                dataTunai.push({
                    kode: valueKodeJual,
                    kode_item: valueKodeProduk.value,
                    nama_item: valueNamaProduk.label,
                    jumlah: valueJumlah,
                    harga: valueHarga,
                    total_harga: valueJumlah * valueHarga,
                    hpp: valueHpp,
                    total_hpp: valueTotalHpp
                });
            } else {
                dataTunai[check].jumlah = +dataTunai[check].jumlah + +valueJumlah;
                dataTunai[check].total_harga = +dataTunai[check].total_harga + valueJumlah * valueHarga;
                dataTunai[check].total_hpp = +dataTunai[check].total_hpp + valueTotalHpp;
            }

            this.setState({
                dataTunai: dataTunai,
                valueKodeProduk: [],
                valueNamaProduk: [],
                valueHarga: 0,
                valueJumlah: 0,
                valueTotalJual: 0,
                valueHpp: 0,
                valueTotalHpp: 0
            }, () => {
                this.GetDetailTunai();
            });
        } else if (this.state.jenisPenjualan.toLowerCase() === 'konsinyasi') {
            if (!CheckInputValidity('form-data') || this.state.valueKodeConsignee.length <= 0 || valueKodeProduk.length <= 0) {
                alert('Isi data dengan benar');
                return;
            }
            let dataKonsinyasi = this.state.dataKonsinyasi;

            let check = dataKonsinyasi.findIndex(item => item.kode_item === valueKodeProduk.value && item.harga === valueHarga);

            if (check < 0) {
                dataKonsinyasi.push({
                    kode: valueKodeJual,
                    kode_item: valueKodeProduk.value,
                    nama_item: valueNamaProduk.label,
                    jumlah: valueJumlah,
                    harga: valueHarga,
                    total_harga: valueJumlah * valueHarga,
                    hpp: valueHpp,
                    total_hpp: valueTotalHpp
                });
            } else {
                dataKonsinyasi[check].jumlah = +dataKonsinyasi[check].jumlah + +valueJumlah;
                dataKonsinyasi[check].total_harga = +dataKonsinyasi[check].total_harga + valueJumlah * valueHarga;
                dataKonsinyasi[check].total_hpp = +dataKonsinyasi[check].total_hpp + valueTotalHpp;
            }

            this.setState({
                dataKonsinyasi: dataKonsinyasi,
                valueKodeProduk: [],
                valueNamaProduk: [],
                valueHarga: 0,
                valueJumlah: 0,
                valueTotalJual: 0,
                valueHpp: 0,
                valueTotalHpp: 0
            }, () => {
                this.GetDetailKonsinyasi();
            });
        } else if (this.state.jenisPenjualan.toLowerCase() === 'pesanan') {
            let dataPesanan = this.state.dataPesanan;

            dataPesanan.push({
                kode: valueKodeJual,
                jumlah: valueJumlah,
                harga: valueHarga,
                total_harga: valueJumlah * valueHarga
            });

            this.setState({ dataPesanan: dataPesanan }, () => {
                this.GetDetailPesanan();
            });
        }
    }

    AddDetailAlat = () => {
        const {
            valueHargaAlat,
            valueJumlahAlat,
            valueKodePesanan,
            valueKodeAlat,
            valueHpp,
            valueTotalHpp
        } = this.state;

        let dataAlat = this.state.dataAlat.find(item => item.kode === valueKodeAlat.value);
        let dataDetailAlat = this.state.dataDetailAlat;

        let check = dataDetailAlat.findIndex(item => item.kode_alat === valueKodeAlat.value);

        if (check < 0) {
            dataDetailAlat.push({
                kode: valueKodePesanan,
                kode_alat: dataAlat.kode,
                nama_alat: dataAlat.nama,
                jumlah: +valueJumlahAlat,
                harga: +valueHargaAlat,
                total_harga: +valueHargaAlat * +valueJumlahAlat,
                hpp: valueHpp,
                total_hpp: valueTotalHpp
            });
        } else {
            dataDetailAlat[check].jumlah = +dataDetailAlat[check].jumlah + +valueJumlahAlat;
            dataDetailAlat[check].total_harga = +dataDetailAlat[check].total_harga + +valueHargaAlat * +valueJumlahAlat;

            if (dataDetailAlat[check].jumlah > +dataAlat.jumlah) {
                dataDetailAlat[check].jumlah = +dataAlat.jumlah;
                dataDetailAlat[check].total_harga = +dataAlat.harga * +dataAlat.jumlah;
            }
        }

        let valueTotalAlat = 0;

        dataDetailAlat.forEach(item => {
            valueTotalAlat += +item.total_harga;
        });

        this.setState({
            dataDetailAlat: dataDetailAlat,
            valueKodeAlat: [],
            valueNamaAlat: [],
            valueHargaAlat: 0,
            valueJumlahAlat: 0,
            valueTotalAlat: valueTotalAlat,
            valueHpp: 0,
            valueTotalHpp: 0
        }, () => {
            this.GetDetailAlat();
        });
    }

    AddDetailBahan = () => {
        const {
            valueHargaBahan,
            valueJumlahBahan,
            valueKodePesanan,
            valueKodeBahan,
            valueHpp,
            valueTotalHpp
        } = this.state;

        let dataBahan = this.state.dataBahan.find(item => item.kode === valueKodeBahan.value);
        let dataDetailBahan = this.state.dataDetailBahan;

        let check = dataDetailBahan.findIndex(item => item.kode_bahan === valueKodeBahan.value);

        if (check < 0) {
            dataDetailBahan.push({
                kode: valueKodePesanan,
                kode_bahan: dataBahan.kode,
                nama_bahan: dataBahan.nama,
                jumlah: +valueJumlahBahan,
                harga: +valueHargaBahan,
                total_harga: +valueHargaBahan * +valueJumlahBahan,
                hpp: valueHpp,
                total_hpp: valueTotalHpp
            });
        } else {
            dataDetailBahan[check].jumlah = +dataDetailBahan[check].jumlah + +valueJumlahBahan;
            dataDetailBahan[check].total_harga = +dataDetailBahan[check].total_harga + +valueHargaBahan * +valueJumlahBahan;

            if (dataDetailBahan[check].jumlah > +dataBahan.jumlah) {
                dataDetailBahan[check].jumlah = +dataBahan.jumlah;
                dataDetailBahan[check].total_harga = +dataBahan.harga * +dataBahan.jumlah;
            }
        }

        let valueTotalBahan = 0;

        dataDetailBahan.forEach(item => {
            valueTotalBahan += +item.total_harga;
        });

        this.setState({
            dataDetailBahan: dataDetailBahan,
            valueKodeBahan: [],
            valueNamaBahan: [],
            valueHargaBahan: 0,
            valueJumlahBahan: 0,
            valueTotalBahan: valueTotalBahan,
            valueHpp: 0,
            valueTotalHpp: 0
        }, () => {
            this.GetDetailBahan();
        });
    }

    AddDetailBTKL = () => {
        const {
            valueDepartemen,
            valueJumlahBTKL,
            valueKodePesanan,
            valueKodeBTKL,
            valueUpah
        } = this.state;

        let dataBTKL = this.state.dataBTKL.find(item => item.kode === valueKodeBTKL.value);
        let dataDetailBTKL = this.state.dataDetailBTKL;

        let check = dataDetailBTKL.findIndex(item => item.kode_tenaga_kerja === valueKodeBTKL.value);

        if (check < 0) {
            dataDetailBTKL.push({
                kode: valueKodePesanan,
                kode_tenaga_kerja: dataBTKL.kode,
                nama_tenaga_kerja: dataBTKL.nama,
                departemen: valueDepartemen,
                jumlah: +valueJumlahBTKL,
                harga: +valueUpah,
                total_harga: +valueUpah * +valueJumlahBTKL
            });
        } else {
            dataDetailBTKL[check].jumlah = +dataDetailBTKL[check].jumlah + +valueJumlahBTKL;
            dataDetailBTKL[check].total_harga = +dataDetailBTKL[check].total_harga + +valueUpah * +valueJumlahBTKL;

            if (dataDetailBTKL[check].jumlah > +dataBTKL.jumlah) {
                dataDetailBTKL[check].jumlah = +dataBTKL.jumlah;
                dataDetailBTKL[check].total_harga = +dataBTKL.harga * +dataBTKL.jumlah;
            }
        }

        let valueTotalBTKL = 0;

        dataDetailBTKL.forEach(item => {
            valueTotalBTKL += +item.total_harga;
        });

        this.setState({
            dataDetailBTKL: dataDetailBTKL,
            valueKodeBTKL: [],
            valueNamaBTKL: [],
            valueDepartemen: '',
            valueUpah: 0,
            valueJumlahBTKL: 0,
            valueTotalBTKL: valueTotalBTKL
        }, () => {
            this.GetDetailBTKL();
        });
    }

    AddDetailPenolong = () => {
        const {
            valueHargaPenolong,
            valueJumlahPenolong,
            valueKodePesanan,
            valueKodePenolong
        } = this.state;

        let dataPenolong = this.state.dataPenolong.find(item => item.kode === valueKodePenolong.value);
        let dataDetailPenolong = this.state.dataDetailPenolong;

        let check = dataDetailPenolong.findIndex(item => item.kode_penolong === valueKodePenolong.value);

        if (check < 0) {
            dataDetailPenolong.push({
                kode: valueKodePesanan,
                kode_penolong: dataPenolong.kode,
                nama_penolong: dataPenolong.nama,
                jumlah: +valueJumlahPenolong,
                harga: +valueHargaPenolong,
                total_harga: +valueHargaPenolong * +valueJumlahPenolong
            });
        } else {
            dataDetailPenolong[check].jumlah = +dataDetailPenolong[check].jumlah + +valueJumlahPenolong;
            dataDetailPenolong[check].total_harga = +dataDetailPenolong[check].total_harga + +valueHargaPenolong * +valueJumlahPenolong;

            if (dataDetailPenolong[check].jumlah > +dataPenolong.jumlah) {
                dataDetailPenolong[check].jumlah = +dataPenolong.jumlah;
                dataDetailPenolong[check].total_harga = +dataPenolong.harga * +dataPenolong.jumlah;
            }
        }

        let valueTotalPenolong = 0;

        dataDetailPenolong.forEach(item => {
            valueTotalPenolong += +item.total_harga;
        });

        this.setState({
            dataDetailPenolong: dataDetailPenolong,
            valueKodePenolong: [],
            valueNamaPenolong: [],
            valueHargaPenolong: 0,
            valueJumlahPenolong: 0,
            valueTotalPenolong: valueTotalPenolong
        }, () => {
            this.GetDetailPenolong();
        });
    }

    DeleteKonsinyasi = (id) => {
        let dataKonsinyasi = this.state.dataKonsinyasi;

        dataKonsinyasi.splice(id, 1);

        this.setState({ dataKonsinyasi: dataKonsinyasi }, () => {
            this.GetDetailKonsinyasi();
        });
    }

    DeleteDetailAlat = (id) => {
        let dataDetailAlat = this.state.dataDetailAlat;

        dataDetailAlat.splice(id, 1);

        let valueTotalAlat = 0;

        dataDetailAlat.forEach(item => {
            valueTotalAlat += +item.total_harga;
        });

        this.setState({
            dataDetailAlat: dataDetailAlat,
            valueTotalAlat: valueTotalAlat
        }, () => {
            this.GetDetailAlat();
        });
    }

    DeleteDetailBahan = (id) => {
        let dataDetailBahan = this.state.dataDetailBahan;

        dataDetailBahan.splice(id, 1);

        let valueTotalBahan = 0;

        dataDetailBahan.forEach(item => {
            valueTotalBahan += +item.total_harga;
        });

        this.setState({
            dataDetailBahan: dataDetailBahan,
            valueTotalBahan: valueTotalBahan
        }, () => {
            this.GetDetailBahan();
        });
    }

    DeleteDetailBTKL = (id) => {
        let dataDetailBTKL = this.state.dataDetailBTKL;

        dataDetailBTKL.splice(id, 1);

        let valueTotalBTKL = 0;

        dataDetailBTKL.forEach(item => {
            valueTotalBTKL += +item.total_harga;
        });

        this.setState({
            dataDetailBTKL: dataDetailBTKL,
            valueTotalBTKL: valueTotalBTKL
        }, () => {
            this.GetDetailBTKL();
        });
    }

    DeleteDetailPenolong = (id) => {
        let dataDetailPenolong = this.state.dataDetailPenolong;

        dataDetailPenolong.splice(id, 1);

        let valueTotalPenolong = 0;

        dataDetailPenolong.forEach(item => {
            valueTotalPenolong += +item.total_harga;
        });

        this.setState({
            dataDetailPenolong: dataDetailPenolong,
            valueTotalPenolong: valueTotalPenolong
        }, () => {
            this.GetDetailPenolong();
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

    GetAlat = async () => {
        axios.get(`${baseURL}/api/master/inventory/alat/select.php`, config).then(response => {
            let dataAlat = response.data.data;

            let dataSelectKodeAlat = [];
            let dataSelectNamaAlat = [];

            if (dataAlat.length > 0) {
                dataAlat.forEach(item => {
                    dataSelectKodeAlat.push({
                        value: item.kode,
                        label: item.kode
                    });

                    dataSelectNamaAlat.push({
                        value: item.kode,
                        label: item.nama
                    });
                });
            }

            this.setState({ dataAlat: dataAlat, dataSelectKodeAlat: dataSelectKodeAlat, dataSelectNamaAlat: dataSelectNamaAlat });
        }).catch(error => {
            console.log(error);
        });
    }

    GetBahan = async () => {
        axios.get(`${baseURL}/api/master/inventory/bahan-baku/select.php`, config).then(response => {
            let dataBahan = response.data.data;

            let dataSelectKodeBahan = [];
            let dataSelectNamaBahan = [];

            if (dataBahan.length > 0) {
                dataBahan.forEach(item => {
                    dataSelectKodeBahan.push({
                        value: item.kode,
                        label: item.kode
                    });

                    dataSelectNamaBahan.push({
                        value: item.kode,
                        label: item.nama
                    });
                });
            }

            this.setState({ dataBahan: dataBahan, dataSelectKodeBahan: dataSelectKodeBahan, dataSelectNamaBahan: dataSelectNamaBahan });
        }).catch(error => {
            console.log(error);
        });
    }

    GetDetailAlat = () => {
        const {
            dataDetailAlat
        } = this.state;

        ShowLoading();

        let htmlTableDaftarDetailAlat = [];

        if (dataDetailAlat.length > 0) {
            dataDetailAlat.forEach((item, index) => {
                htmlTableDaftarDetailAlat.push(
                    <tr key={index} className={'align-middle'}>
                        <td>{index + 1}.</td>
                        <td>{item.kode}</td>
                        <td>{item.kode_alat}</td>
                        <td>{item.nama_alat}</td>
                        <td>{item.jumlah}</td>
                        <td>{item.harga}</td>
                        <td>{item.total_harga}</td>
                        <td className={global.table_action}>
                            <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteDetailAlat(index)}><FaTrash />Delete</button>
                        </td>
                    </tr>
                );
            });
        }

        $('#table-data-bop-alat').DataTable().destroy();

        this.setState({ htmlTableDaftarDetailAlat: htmlTableDaftarDetailAlat }, () => {
            $('#table-data-bop-alat').DataTable();

            this.KalkulasiHpp();

            HideLoading();
        });
    }

    GetDetailBahan = () => {
        const {
            dataDetailBahan
        } = this.state;

        ShowLoading();

        let htmlTableDaftarDetailBahan = [];

        if (dataDetailBahan.length > 0) {
            dataDetailBahan.forEach((item, index) => {
                htmlTableDaftarDetailBahan.push(
                    <tr key={index} className={'align-middle'}>
                        <td>{index + 1}.</td>
                        <td>{item.kode}</td>
                        <td>{item.kode_bahan}</td>
                        <td>{item.nama_bahan}</td>
                        <td>{item.jumlah}</td>
                        <td>{item.harga}</td>
                        <td>{item.total_harga}</td>
                        <td className={global.table_action}>
                            <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteDetailBahan(index)}><FaTrash />Delete</button>
                        </td>
                    </tr>
                );
            });
        }

        $('#table-data-bahan-baku').DataTable().destroy();

        this.setState({ htmlTableDaftarDetailBahan: htmlTableDaftarDetailBahan }, () => {
            $('#table-data-bahan-baku').DataTable();

            this.KalkulasiHpp();

            HideLoading();
        });
    }

    GetDetailBTKL = () => {
        const {
            dataDetailBTKL
        } = this.state;

        ShowLoading();

        let htmlTableDaftarDetailBTKL = [];

        if (dataDetailBTKL.length > 0) {
            dataDetailBTKL.forEach((item, index) => {
                htmlTableDaftarDetailBTKL.push(
                    <tr key={index} className={'align-middle'}>
                        <td>{index + 1}.</td>
                        <td>{item.kode}</td>
                        <td>{item.kode_tenaga_kerja}</td>
                        <td>{item.nama_tenaga_kerja}</td>
                        <td>{item.departemen}</td>
                        <td>{item.jumlah}</td>
                        <td>{item.harga}</td>
                        <td>{item.total_harga}</td>
                        <td className={global.table_action}>
                            <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteDetailBTKL(index)}><FaTrash />Delete</button>
                        </td>
                    </tr>
                );
            });
        }

        $('#table-data-btkl').DataTable().destroy();

        this.setState({ htmlTableDaftarDetailBTKL: htmlTableDaftarDetailBTKL }, () => {
            $('#table-data-btkl').DataTable()

            this.KalkulasiHpp();

            HideLoading();
        });
    }

    GetDetailPenolong = () => {
        const {
            dataDetailPenolong
        } = this.state;

        ShowLoading();

        let htmlTableDaftarDetailPenolong = [];

        if (dataDetailPenolong.length > 0) {
            dataDetailPenolong.forEach((item, index) => {
                htmlTableDaftarDetailPenolong.push(
                    <tr key={index} className={'align-middle'}>
                        <td>{index + 1}.</td>
                        <td>{item.kode}</td>
                        <td>{item.kode_penolong}</td>
                        <td>{item.nama_penolong}</td>
                        <td>{item.jumlah}</td>
                        <td>{item.harga}</td>
                        <td>{item.total_harga}</td>
                        <td className={global.table_action}>
                            <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteDetailPenolong(index)}><FaTrash />Delete</button>
                        </td>
                    </tr>
                );
            });
        }

        $('#table-data-bop-penolong').DataTable().destroy();

        this.setState({ htmlTableDaftarDetailPenolong: htmlTableDaftarDetailPenolong }, () => {
            $('#table-data-bop-penolong').DataTable();

            this.KalkulasiHpp();

            HideLoading();
        });
    }

    GetPenolong = async () => {
        axios.get(`${baseURL}/api/master/inventory/bahan-penolong/select.php`, config).then(response => {
            let dataPenolong = response.data.data;

            let dataSelectKodePenolong = [];
            let dataSelectNamaPenolong = [];

            if (dataPenolong.length > 0) {
                dataPenolong.forEach(item => {
                    dataSelectKodePenolong.push({
                        value: item.kode,
                        label: item.kode
                    });

                    dataSelectNamaPenolong.push({
                        value: item.kode,
                        label: item.nama
                    });
                });
            }

            this.setState({ dataPenolong: dataPenolong, dataSelectKodePenolong: dataSelectKodePenolong, dataSelectNamaPenolong: dataSelectNamaPenolong });
        }).catch(error => {
            console.log(error);
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
                        <td className={global.table_action}>
                            <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteKonsinyasi(item.id)}><FaTrash />Delete</button>
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

    GetDetailPesanan = () => {
        ShowLoading();

        let htmlTableDaftarPesanan = [];

        if (this.state.dataPesanan.length > 0) {
            this.state.dataPesanan.forEach((item, index) => {
                htmlTableDaftarPesanan.push(
                    <tr key={index}>
                        <td>{index + 1}.</td>
                        <td>{item.kode}</td>
                        <td>{item.jumlah}</td>
                        <td>{item.harga}</td>
                        <td>{item.total_harga}</td>
                        <td className={global.table_action}>
                            <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeletePesanan(item.id)}><FaTrash />Delete</button>
                        </td>
                    </tr>
                );
            });
        }

        $('#table-data').DataTable().destroy();

        this.setState({ htmlTableDaftarPesanan: htmlTableDaftarPesanan }, () => {
            $('#table-data').DataTable();

            this.KalkulasiTotalHarga();

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
                        <td className={global.table_action}>
                            <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteTunai(item.id)}><FaTrash />Delete</button>
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

    GetTenagaKerja = async () => {
        axios.get(`${baseURL}/api/master/tenaga-kerja/select.php`, config).then(response => {
            let dataTenagaKerja = response.data.data;

            let dataSelectKodeBTKL = [];
            let dataSelectNamaBTKL = [];

            if (dataTenagaKerja.length > 0) {
                dataTenagaKerja.forEach(item => {
                    dataSelectKodeBTKL.push({
                        value: item.kode,
                        label: item.kode
                    });

                    dataSelectNamaBTKL.push({
                        value: item.kode,
                        label: item.nama
                    });
                });
            }

            this.setState({ dataBTKL: dataTenagaKerja, dataSelectKodeBTKL: dataSelectKodeBTKL, dataSelectNamaBTKL: dataSelectNamaBTKL });
        }).catch(error => {
            console.log(error);
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
            valueKodeAkun,
            valueKodeConsignee,
            valueKodeCustomer,
            valueKodeJual,
            valueOngkosKirim,
            valueTanggal,
            valueTotalBayar,
            valueTotalJual
        } = this.state;

        const valueTotalHarga = Calculate([valueTotalJual, -valueDiskon, valueOngkosKirim]);
        const valuePiutang = Calculate([valueTotalJual, -valueDiskon]);

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
        formData.append('total_harga', valueTotalHarga);
        formData.append('total_bayar', valueTotalBayar);
        formData.append('kode_akun', valueKodeAkun?.value);

        formData.append('jenis_penjualan', jenisPenjualan.toLowerCase());

        if (jenisPenjualan.toLowerCase() === 'tunai')
            formData.append('data', JSON.stringify(dataTunai));
        else if (jenisPenjualan.toLowerCase() === 'konsinyasi')
            formData.append('data', JSON.stringify(dataKonsinyasi));

        axios.post(`${baseURL}/api/transaksi/penjualan/penjualan/insert.php`, formData, config).then(() => {
            window.location.reload();
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
            valueProfit
        } = this.state;
        this.setState({
            valueHargaJual: +valueJumlah * +valueHpp * (100 + +valueProfit) / 100
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

        this.setState({ valueTotalJual: totalHarga });
    }

    SelectAlat = (data) => {
        if (data) {
            let valueKode = this.state.dataSelectKodeAlat.find(item => item.value === data?.value);
            let valueNama = this.state.dataSelectNamaAlat.find(item => item.value === data?.value);

            let dataAlat = this.state.dataAlat.find(item => item.kode === valueKode.value);

            this.setState({
                valueKodeAlat: valueKode,
                valueNamaAlat: valueNama,
                valueHargaAlat: dataAlat.harga
            });
        } else {
            this.setState({
                valueKodeAlat: '',
                valueNamaAlat: '',
                valueHargaAlat: 0
            });
        }
    }

    SelectBahan = (data) => {
        if (data) {
            let valueKode = this.state.dataSelectKodeBahan.find(item => item.value === data?.value);
            let valueNama = this.state.dataSelectNamaBahan.find(item => item.value === data?.value);

            let dataBahan = this.state.dataBahan.find(item => item.kode === valueKode.value);

            this.setState({
                valueKodeBahan: valueKode,
                valueNamaBahan: valueNama,
                valueHargaBahan: dataBahan.harga
            });
        } else {
            this.setState({
                valueKodeBahan: '',
                valueNamaBahan: '',
                valueHargaBahan: 0
            });
        }
    }

    SelectConsignee = (data) => {
        if (data) {
            let valueKode = this.state.dataSelectKodeConsignee.find(item => item.value === data?.value);
            let valueNama = this.state.dataSelectNamaConsignee.find(item => item.value === data?.value);

            this.setState({ valueKodeConsignee: valueKode, valueNamaConsignee: valueNama });
        } else {
            this.setState({ valueKodeConsignee: '', valueNamaConsignee: '' });
        }
    }

    SelectCustomer = (data) => {
        if (data) {
            let valueKode = this.state.dataSelectKodeCustomer.find(item => item.value === data?.value);
            let valueNama = this.state.dataSelectNamaCustomer.find(item => item.value === data?.value);

            this.setState({ valueKodeCustomer: valueKode, valueNamaCustomer: valueNama });
        } else {
            this.setState({ valueKodeCustomer: '', valueNamaCustomer: '' });
        }
    }

    SelectPenolong = (data) => {
        if (data) {
            let valueKode = this.state.dataSelectKodePenolong.find(item => item.value === data?.value);
            let valueNama = this.state.dataSelectNamaPenolong.find(item => item.value === data?.value);

            let dataPenolong = this.state.dataPenolong.find(item => item.kode === valueKode.value);

            this.setState({
                valueKodePenolong: valueKode,
                valueNamaPenolong: valueNama,
                valueHargaPenolong: dataPenolong.harga
            });
        } else {
            this.setState({
                valueKodePenolong: '',
                valueNamaPenolong: '',
                valueHargaPenolong: 0
            });
        }
    }

    SelectProduk = (data) => {
        if (data) {
            let valueKode = this.state.dataSelectKodeProduk.find(item => item.value === data?.value);
            let valueNama = this.state.dataSelectNamaProduk.find(item => item.value === data?.value);
            let harga = this.state.dataProduk.find(item => item.kode === valueKode.value).harga_jual;
            let hpp = this.state.dataProduk.find(item => item.kode === valueKode.value).hpp_per_produk;

            this.setState({ valueHarga: harga, valueHpp: hpp, valueKodeProduk: valueKode, valueNamaProduk: valueNama });
        } else {
            this.setState({ valueHarga: 0, valueHpp: 0, valueKodeProduk: '', valueNamaProduk: '' });
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

    SelectBTKL = (data) => {
        if (data) {
            let valueKode = this.state.dataSelectKodeBTKL.find(item => item.value === data?.value);
            let valueNama = this.state.dataSelectNamaBTKL.find(item => item.value === data?.value);
            let departemen = this.state.dataBTKL.find(item => item.kode === data?.value).departemen;
            let upah = this.state.dataBTKL.find(item => item.kode === data?.value).upah;

            this.setState({ valueDepartemen: departemen, valueUpah: upah, valueKodeBTKL: valueKode, valueNamaBTKL: valueNama });
        } else {
            this.setState({ valueDepartemen: '', valueUpah: 0, valueKodeBTKL: '', valueNamaBTKL: '' });
        }
    }

    SelectTab = (index) => {
        this.setState({ tabSelected: index }, () => {
            if (index === 0) this.GetDetailBahan();
            if (index === 1) this.GetDetailPenolong();
            if (index === 2) this.GetDetailAlat();
            if (index === 3) this.GetDetailBTKL();
        });
    }

    render() {
        const {
            dataKonsinyasi,
            dataPesanan,
            dataSelectAkun,
            dataTunai,
            valueDeskripsiPesanan,
            valueDepartemen,
            valueDiskon,
            valueHarga,
            valueHargaAlat,
            valueHargaBahan,
            valueHargaPenolong,
            valueHargaJual,
            valueHpp,
            valueJumlah,
            valueJumlahAlat,
            valueJumlahBahan,
            valueJumlahPenolong,
            valueJumlahBTKL,
            valueJenisProduk,
            valueJenisPenjualan,
            valueKalkulasiTotalHpp,
            valueKodeAkun,
            valueKodeAlat,
            valueKodeBahan,
            valueKodeBTKL,
            valueKodeConsignee,
            valueKodeCustomer,
            valueKodeJual,
            valueKodePesanan,
            valueKodePenolong,
            valueKodeProduk,
            valueNamaAlat,
            valueNamaBahan,
            valueNamaBTKL,
            valueNamaConsignee,
            valueNamaCustomer,
            valueNamaPesanan,
            valueNamaPenolong,
            valueNamaProduk,
            valueOngkosKirim,
            valueProfit,
            valueTanggal,
            valueTotalAlat,
            valueTotalBahan,
            valueTotalBayar,
            valueTotalPenolong,
            valueTotalBTKL,
            valueTotalHpp,
            valueTotalJual,
            valueUpah
        } = this.state;

        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Transaksi Penjualan</p>
                    <p className={style.pathname}>Transaksi / Penjualan / Transaksi Penjualan</p>
                </div>
                <div className={style.content}>
                    <div className={`col-12 col-md-6 pe-md-2 pb-2 pb-md-0`}>
                        <form id='form-data' className={`${global.card}`}>
                            <div className={`${global.header}`}>
                                <p className={global.title}>Input Penjualan</p>
                            </div>
                            <div className={global.input_group}>
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
                                            <div className={`${bootstrap['d-flex']}`}>
                                                <div className={`${global.input_group} col-6 pe-2`}>
                                                    <p className={global.title}>Kode Jual <span className={global.important}>*</span></p>
                                                    <input type="text" id='valueKodeJual' maxLength={10} value={valueKodeJual} required={true} readOnly={true} />
                                                </div>
                                                <div className={`${global.input_group} col-6 ps-2`}>
                                                    <p className={global.title}>Tanggal <span className={global.important}>*</span></p>
                                                    <input type="date" id='valueTanggal' value={valueTanggal} onChange={this.InputChange} required={true} />
                                                </div>
                                            </div>
                                            <div className={`${bootstrap['d-flex']}`}>
                                                <div className={`${global.input_group} col-5 pe-2`}>
                                                    <p className={global.title}>Kode Customer <span className={global.important}>*</span></p>
                                                    <Select id='select-kode-customer' isClearable={true} isSearchable={true} options={this.state.dataSelectKodeCustomer} placeholder={'Select Kode...'} value={valueKodeCustomer} styles={CustomSelect} onChange={(data) => this.SelectCustomer(data)} isDisabled={[dataKonsinyasi.length, dataPesanan.length, dataTunai.length].some(item => item > 0)} />
                                                </div>
                                                <div className={`${global.input_group} col-7 pe-2`}>
                                                    <p className={global.title}>Nama Customer <span className={global.important}>*</span></p>
                                                    <Select id='select-nama-customer' isClearable={true} isSearchable={true} options={this.state.dataSelectNamaCustomer} placeholder={'Select Nama...'} value={valueNamaCustomer} styles={CustomSelect} onChange={(data) => this.SelectCustomer(data)} isDisabled={[dataKonsinyasi.length, dataPesanan.length, dataTunai.length].some(item => item > 0)} />
                                                </div>
                                            </div>
                                            <div className={`${bootstrap['d-flex']}`}>
                                                <div className={`${global.input_group} col-5 pe-2`}>
                                                    <p className={global.title}>Kode Produk <span className={global.important}>*</span></p>
                                                    <Select id='select-kode-produk' isClearable={true} isSearchable={true} options={this.state.dataSelectKodeProduk} placeholder={'Select Kode...'} value={valueKodeProduk} styles={CustomSelect} onChange={this.SelectProduk} />
                                                </div>
                                                <div className={`${global.input_group} col-7 pe-2`}>
                                                    <p className={global.title}>Nama Produk <span className={global.important}>*</span></p>
                                                    <Select id='select-nama-produk' name='select-nama-produk' isClearable={true} isSearchable={true} options={this.state.dataSelectNamaProduk} placeholder={'Select Nama...'} value={valueNamaProduk} styles={CustomSelect} onChange={this.SelectProduk} />
                                                </div>
                                            </div>
                                            <div className={`${bootstrap['d-flex']}`}>
                                                <div className={`${global.input_group} col-4 pe-2`}>
                                                    <p className={global.title}>Jumlah <span className={global.important}>*</span></p>
                                                    <input type="text" id='valueJumlah' className='text-end' value={valueJumlah} onInput={InputFormatNumber} onChange={e => this.setState({
                                                        valueJumlah: e.target.value, 
                                                        valueTotalHpp: +e.target.value * +valueHpp
                                                    })} required={true} />
                                                </div>
                                                <div className={`${global.input_group} col-4 px-2`}>
                                                    <p className={global.title}>Harga <span className={global.important}>*</span></p>
                                                    <input type="text" id='valueHarga' className='text-end' value={valueHarga} required={true} readOnly={true} />
                                                </div>
                                                <div className={`${global.input_group} col-4 ps-2`}>
                                                    <p className={global.title}>Total Harga <span className={global.important}>*</span></p>
                                                    <input type="text" id='valueTotalHarga' className='text-end' value={parseInt(valueJumlah === '' ? 0 : valueJumlah) * parseInt(valueHarga)} required={true} readOnly={true} />
                                                </div>
                                            </div>
                                            <div className={`${bootstrap['d-flex']}`}>
                                                <div className={`${global.input_group} col-4 pe-2`}>
                                                    <p className={global.title}>Harga Pokok Penjualan</p>
                                                    <input type="text" id='valueHarga' className='text-end' value={valueHpp} readOnly={true} />
                                                </div>
                                                <div className={`${global.input_group} col-4 px-2`}>
                                                    <p className={global.title}>Total HPP</p>
                                                    <input type="text" id='valueTotalHarga' className='text-end' value={valueTotalHpp} readOnly={true} />
                                                </div>
                                            </div>
                                            <button type='button' className={global.button} onClick={this.AddDetail}><MdAdd /> Tambah</button>
                                        </React.Fragment>
                                        :
                                        this.state.jenisPenjualan === 'Pesanan' ?
                                            <React.Fragment>
                                                <div className='d-flex'>
                                                    <div className={`${global.input_group} col-6 pe-2`}>
                                                        <p className={global.title}>Kode Pesanan <span className={global.important}>*</span></p>
                                                        <input type="text" id='valueKodePesanan' value={valueKodePesanan} required={true} readOnly={true} />
                                                    </div>
                                                    <div className={`${global.input_group} col-6 ps-2`}>
                                                        <p className={global.title}>Tanggal <span className={global.important}>*</span></p>
                                                        <input type="date" id='valueTanggal' value={valueTanggal} onChange={this.InputChange} required={true} />
                                                    </div>
                                                </div>
                                                <div className={`${global.input_group}`}>
                                                    <p className={global.title}>Nama Pesanan <span className={global.important}>*</span></p>
                                                    <input type="text" id='valueNamaPesanan' value={valueNamaPesanan} onChange={this.InputChange} required={true} />
                                                </div>
                                                <div className='d-flex'>
                                                    <div className={`${global.input_group} col-4 pe-2`}>
                                                        <p className={global.title}>Kode Customer <span className={global.important}>*</span></p>
                                                        <Select id='select-kode-customer' name='select-kode-customer' isClearable={true} isSearchable={true} options={this.state.dataSelectKodeCustomer} placeholder={'Select Kode...'} value={valueKodeCustomer} onChange={e => this.SelectCustomer(e)} styles={CustomSelect} />
                                                    </div>
                                                    <div className={`${global.input_group} col-8 ps-2`}>
                                                        <p className={global.title}>Nama Customer <span className={global.important}>*</span></p>
                                                        <Select id='select-nama-customer' name='select-nama-customer' isClearable={true} isSearchable={true} options={this.state.dataSelectNamaCustomer} placeholder={'Select Nama Customer...'} value={valueNamaCustomer} onChange={e => this.SelectCustomer(e)} styles={CustomSelect} />
                                                    </div>
                                                </div>
                                                <div className={`${global.input_group}`}>
                                                    <p className={global.title}>Jenis Produk <span className={global.important}>*</span></p>
                                                    <Select id='select-jenis-produk' name='select-jenis-produk' isClearable={true} isSearchable={true} options={[
                                                        { value: 'Kain', label: 'Kain' },
                                                        { value: 'Pakaian', label: 'Pakaian' }
                                                    ]} placeholder={'Select Jenis Produk...'} value={valueJenisProduk} onChange={e => this.setState({ valueJenisProduk: e })} styles={CustomSelect} />
                                                </div>
                                                <div className='d-flex'>
                                                    <div className={`${global.input_group} col-4 pe-2`}>
                                                        <p className={global.title}>Jumlah <span className={global.important}>*</span></p>
                                                        <input type="text" id='valueJumlah' value={valueJumlah} onChange={async e => {
                                                            await this.InputChange(e);
                                                            this.KalkulasiHargaJual();
                                                            this.setState({
                                                                valueJumlah: e.target.value, 
                                                                valueTotalHpp: +e.target.value * +valueHpp
                                                            });
                                                        }} required={true} />
                                                    </div>
                                                    <div className={`${global.input_group} col-4 px-2`}>
                                                        <p className={global.title}>HPP <span className={global.important}>*</span></p>
                                                        <input type="text" id='valueHpp' value={valueHpp} required={true} readOnly={true} />
                                                    </div>
                                                    <div className={`${global.input_group} col-4 ps-2`}>
                                                        <p className={global.title}>Profit (%) <span className={global.important}>*</span></p>
                                                        <input type="text" id='valueProfit' value={valueProfit} onChange={async e => {
                                                            await this.InputChange(e);
                                                            this.KalkulasiHargaJual();
                                                        }} required={true} />
                                                    </div>
                                                </div>
                                                <div className={`${global.input_group}`}>
                                                    <p className={global.title}>Harga Jual <span className={global.important}>*</span></p>
                                                    <input type="text" id='valueHargaJual' value={valueHargaJual} required={true} readOnly={true} />
                                                </div>
                                                <div className='d-flex'>
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
                                                <div className={`${bootstrap['d-flex']}`}>
                                                    <div className={`${global.input_group} col-6 pe-2`}>
                                                        <p className={global.title}>Kode Jual <span className={global.important}>*</span></p>
                                                        <input type="text" id='valueKodeJual' maxLength={10} value={valueKodeJual} required={true} readOnly={true} />
                                                    </div>
                                                    <div className={`${global.input_group} col-6 ps-2`}>
                                                        <p className={global.title}>Tanggal <span className={global.important}>*</span></p>
                                                        <input type="date" id='valueTanggal' value={valueTanggal} onChange={this.InputChange} required={true} />
                                                    </div>
                                                </div>
                                                <div className={`${bootstrap['d-flex']}`}>
                                                    <div className={`${global.input_group} col-5 pe-2`}>
                                                        <p className={global.title}>Kode Consignee <span className={global.important}>*</span></p>
                                                        <Select id='select-kode-consignee' isClearable={true} isSearchable={true} options={this.state.dataSelectKodeConsignee} placeholder={'Select Kode...'} value={valueKodeConsignee} styles={CustomSelect} onChange={(data) => this.SelectConsignee(data)} />
                                                    </div>
                                                    <div className={`${global.input_group} col-7 pe-2`}>
                                                        <p className={global.title}>Nama Consignee <span className={global.important}>*</span></p>
                                                        <Select id='select-nama-consignee' isClearable={true} isSearchable={true} options={this.state.dataSelectNamaConsignee} placeholder={'Select Nama...'} value={valueNamaConsignee} styles={CustomSelect} onChange={(data) => this.SelectConsignee(data)} />
                                                    </div>
                                                </div>
                                                <div className={`${bootstrap['d-flex']}`}>
                                                    <div className={`${global.input_group} col-5 pe-2`}>
                                                        <p className={global.title}>Kode Produk <span className={global.important}>*</span></p>
                                                        <Select id='select-kode-produk' isClearable={true} isSearchable={true} options={this.state.dataSelectKodeProduk} placeholder={'Select Kode...'} value={valueKodeProduk} styles={CustomSelect} onChange={this.SelectProduk} />
                                                    </div>
                                                    <div className={`${global.input_group} col-7 pe-2`}>
                                                        <p className={global.title}>Nama Produk <span className={global.important}>*</span></p>
                                                        <Select id='select-nama-produk' isClearable={true} isSearchable={true} options={this.state.dataSelectNamaProduk} placeholder={'Select Nama...'} value={valueNamaProduk} styles={CustomSelect} onChange={this.SelectProduk} />
                                                    </div>
                                                </div>
                                                <div className={`${bootstrap['d-flex']}`}>
                                                    <div className={`${global.input_group} col-4 pe-2`}>
                                                        <p className={global.title}>Jumlah <span className={global.important}>*</span></p>
                                                        <input type="text" id='valueJumlah' className='text-end' value={valueJumlah} onInput={InputFormatNumber} onChange={e => this.setState({
                                                        valueJumlah: e.target.value, 
                                                        valueTotalHpp: +e.target.value * +valueHpp
                                                    })} required={true} />
                                                    </div>
                                                    <div className={`${global.input_group} col-4 px-2`}>
                                                        <p className={global.title}>Harga <span className={global.important}>*</span></p>
                                                        <input type="text" id='valueHarga' className='text-end' value={valueHarga} required={true} readOnly={true} />
                                                    </div>
                                                    <div className={`${global.input_group} col-4 ps-2`}>
                                                        <p className={global.title}>Total Harga <span className={global.important}>*</span></p>
                                                        <input type="text" id='valueTotalHarga' className='text-end' value={parseInt(valueJumlah === '' ? 0 : valueJumlah) * parseInt(valueHarga)} required={true} readOnly={true} />
                                                    </div>
                                                </div>
                                                <div className={`${bootstrap['d-flex']}`}>
                                                    <div className={`${global.input_group} col-4 pe-2`}>
                                                        <p className={global.title}>Harga Pokok Penjualan</p>
                                                        <input type="text" id='valueHarga' className='text-end' value={valueHpp} readOnly={true} />
                                                    </div>
                                                    <div className={`${global.input_group} col-4 px-2`}>
                                                        <p className={global.title}>Total HPP</p>
                                                        <input type="text" id='valueTotalHarga' className='text-end' value={valueTotalHpp} readOnly={true} />
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
                            <div className={`col-12 col-md-6 ps-md-2 pt-2 pt-md-0`}>
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
                                <div className={`${global.card} ${this.state.tabSelected === 0 ? '' : 'd-none'}`}>
                                    <div className='d-flex'>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Kode Bahan</p>
                                            <Select id='select-kode-bahan-bahan-baku' name='select-kode-bahan-bahan-baku' isClearable={true} isSearchable={true} options={this.state.dataSelectKodeBahan} value={valueKodeBahan} placeholder={'Select Kode...'} onChange={e => this.SelectBahan(e)} styles={CustomSelect} />
                                        </div>
                                        <div className={`${global.input_group} col-8 px-2`}>
                                            <p className={global.title}>Nama Bahan</p>
                                            <Select id='select-nama-bahan-bahan-baku' name='select-nama-bahan-bahan-baku' isClearable={true} isSearchable={true} options={this.state.dataSelectNamaBahan} value={valueNamaBahan} placeholder={'Select Nama Bahan...'} onChange={e => this.SelectBahan(e)} styles={CustomSelect} />
                                        </div>
                                    </div>
                                    <div className={`d-flex`}>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Harga</p>
                                            <input type="text" id='valueHargaBahan' value={valueHargaBahan} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-4 px-2`}>
                                            <p className={global.title}>Jumlah</p>
                                            <input type="text" id='valueJumlahBahan' value={valueJumlahBahan} onChange={this.InputChange} />
                                        </div>
                                        <div className={`${global.input_group} col-3 ms-auto ps-2`}>
                                            <p className={global.title}>Aksi</p>
                                            <button type='button' className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }} onClick={this.AddDetailBahan}><MdAdd /> Tambah</button>
                                        </div>
                                    </div>
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
                                                    <td>Aksi</td>
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
                                            <input type="text" id='valueTotalBahan' value={valueTotalBahan} readOnly={true} />
                                        </div>
                                    </div>
                                </div>
                                <div className={`${global.card} ${this.state.tabSelected === 1 ? '' : 'd-none'}`}>
                                    <div className='d-flex'>
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
                                            <input type="text" id='valueHargaPenolong' value={valueHargaPenolong} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-4 px-2`}>
                                            <p className={global.title}>Jumlah</p>
                                            <input type="text" id='valueJumlahPenolong' value={valueJumlahPenolong} onChange={this.InputChange} />
                                        </div>
                                        <div className={`${global.input_group} col-3 ms-auto ps-2`}>
                                            <p className={global.title}>Aksi</p>
                                            <button type='button' className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }} onClick={this.AddDetailPenolong}><MdAdd /> Tambah</button>
                                        </div>
                                    </div>
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
                                                    <td>Aksi</td>
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
                                            <input type="text" id='valueTotalPenolong' value={valueTotalPenolong} readOnly={true} />
                                        </div>
                                    </div>
                                </div>
                                <div className={`${global.card} ${this.state.tabSelected === 2 ? '' : 'd-none'}`}>
                                    <div className='d-flex'>
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
                                            <input type="text" id='valueHargaAlat' value={valueHargaAlat} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-4 px-2`}>
                                            <p className={global.title}>Jumlah</p>
                                            <input type="text" id='valueJumlahAlat' value={valueJumlahAlat} onChange={this.InputChange} />
                                        </div>
                                        <div className={`${global.input_group} col-3 ms-auto ps-2`}>
                                            <p className={global.title}>Aksi</p>
                                            <button type='button' className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }} onClick={this.AddDetailAlat}><MdAdd /> Tambah</button>
                                        </div>
                                    </div>
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
                                                    <td>Aksi</td>
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
                                            <input type="text" id='valueTotalAlat' value={valueTotalAlat} readOnly={true} />
                                        </div>
                                    </div>
                                </div>
                                <div className={`${global.card} ${this.state.tabSelected === 3 ? '' : 'd-none'}`}>
                                    <div className='d-flex'>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Kode TKL</p>
                                            <Select id='select-kode-btkl' name='select-kode-btkl' isClearable={true} isSearchable={true} options={this.state.dataSelectKodeBTKL} placeholder={'Select Kode...'} value={valueKodeBTKL} onChange={e => this.SelectBTKL(e)} styles={CustomSelect} />
                                        </div>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Nama Tenaga Kerja</p>
                                            <Select id='select-kode-btkl' name='select-kode-btkl' isClearable={true} isSearchable={true} options={this.state.dataSelectKodeBTKL} placeholder={'Select Kode...'} value={valueNamaBTKL} onChange={e => this.SelectBTKL(e)} styles={CustomSelect} />
                                        </div>
                                        <div className={`${global.input_group} col-4 px-2`}>
                                            <p className={global.title}>Departemen</p>
                                            <input type="text" id='valueDepartemen' value={valueDepartemen} readOnly={true} />
                                        </div>
                                    </div>
                                    <div className={`d-flex`}>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Upah</p>
                                            <input type="text" id='valueHargaBTKL' value={valueUpah} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-4 px-2`}>
                                            <p className={global.title}>Jumlah</p>
                                            <input type="text" id='valueJumlahBTKL' value={valueJumlahBTKL} onChange={this.InputChange} />
                                        </div>
                                        <div className={`${global.input_group} col-3 ms-auto ps-2`}>
                                            <p className={global.title}>Aksi</p>
                                            <button type='button' className={`${global.button}`} style={{ "--button-first-color": '#026b00', "--button-second-color": '#64a562' }} onClick={this.AddDetailBTKL}><MdAdd /> Tambah</button>
                                        </div>
                                    </div>
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
                                                    <td>Aksi</td>
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
                                            <input type="text" id='valueTotalBTKL' readOnly={true} />
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
                            <div className={`col-12 col-md-6 ps-md-2 pt-2 pt-md-0`}>
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
                                                    <input type="text" id='valueTotalJual' className={'col-4'} value={valueTotalJual} readOnly={true} />
                                                </div>
                                                <div className={`align-items-center ${global.input_group_row}`}>
                                                    <p className={`${global.title} col-3`}>Total Harga Pokok Penjualan</p>
                                                    <input type="text" id='valueTotalJual' className={'col-4'} value={valueKalkulasiTotalHpp} readOnly={true} />
                                                </div>
                                                <div className={`align-items-center ${global.input_group_row}`}>
                                                    <p className={`${global.title} col-3`}>Diskon</p>
                                                    <input type="text" id='valueDiskon' className={'col-4'} value={valueDiskon} onInput={InputFormatNumber} onChange={this.InputChange} onBlur={(e) => parseInt(e.target.value) > parseInt(valueTotalJual) && this.setState({ valueDiskon: valueTotalJual })} />
                                                </div>
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Ongkos Kirim</p>
                                                <input type="text" id='valueOngkosKirim' className={`col-4`} value={valueOngkosKirim} onInput={InputFormatNumber} onChange={this.InputChange} />
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Total Harga</p>
                                                <input type="text" id='valueTotalHarga' className={`col-4`} value={Calculate([valueTotalJual, -valueDiskon, valueOngkosKirim])} readOnly={true} />
                                                <div className='col-5 ps-2'>
                                                    <Select id='select-kode-produk' name='select-kode-produk' isClearable={true} isSearchable={true} options={dataSelectAkun} placeholder={'Select Akun...'} value={valueKodeAkun} styles={CustomSelect} onChange={e => this.setState({ valueKodeAkun: e })} />
                                                </div>
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Bayar</p>
                                                <input type="text" id='valueTotalBayar' className={`col-4`} value={valueTotalBayar} onInput={InputFormatNumber} onChange={this.InputChange} />
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Kembalian</p>
                                                <input type="text" id='valueTotalKembalian' className={`col-4`} value={Calculate([valueTotalBayar, -valueTotalJual, valueDiskon, -valueOngkosKirim])} readOnly={true} />
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
                                                    <input type="text" id='valueTotalJual' className={'col-6'} value={valueTotalJual} readOnly={true} />
                                                </div>
                                                <div className={`align-items-center ${global.input_group_row}`}>
                                                    <p className={`${global.title} col-3`}>Total Harga Pokok Penjualan</p>
                                                    <input type="text" id='valueTotalJual' className={'col-6'} value={valueKalkulasiTotalHpp} readOnly={true} />
                                                </div>
                                                <div className={`align-items-center ${global.input_group_row}`}>
                                                    <p className={`${global.title} col-3`}>Diskon</p>
                                                    <input type="text" id='valueDiskon' className={'col-6'} value={valueDiskon} onInput={InputFormatNumber} onChange={this.InputChange} />
                                                </div>
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Piutang</p>
                                                <input type="text" id='valuePiutang' className={'col-6'} value={Calculate([valueTotalJual, -valueDiskon])} readOnly={true} />
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
                            </div>
                        : null}
                </div>
            </>
        )
    }
}

export default transaksi_penjualan