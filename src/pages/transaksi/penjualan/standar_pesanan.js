import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import { MdAdd } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa';
import { baseURL, Calculate, CheckInputValidity, config, GenerateCode, HideLoading, InputFormatNumber, SetNumberFormat, SetPriceFormat, ShowLoading } from '../../../component/helper';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/penjualan/kalkulator_estimasi.module.css';
import { Link } from 'react-router-dom';

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

export class standar_pesanan extends Component {

    state = {
        dataAlat: [],
        dataBahan: [],
        dataBTKL: [],
        dataPenolong: [],

        dataDetailAlat: [],
        dataDetailBahan: [],
        dataDetailBTKL: [],
        dataDetailPenolong: [],

        dataSelectKodeAlat: [],
        dataSelectNamaAlat: [],
        dataSelectKodeBahan: [],
        dataSelectNamaBahan: [],
        dataSelectKodeBTKL: [],
        dataSelectNamaBTKL: [],
        dataSelectKodePenolong: [],
        dataSelectNamaPenolong: [],

        htmlTableDaftarDetailAlat: [],
        htmlTableDaftarDetailBahan: [],
        htmlTableDaftarDetailBTKL: [],
        htmlTableDaftarDetailPenolong: [],

        tabSelected: 0,

        valueDepartemen: '',
        valueHargaAlat: 0,
        valueHargaBahan: 0,
        valueHargaPenolong: 0,
        valueJumlahMax: 0,
        valueJumlahAlat: 0,
        valueJumlahBahan: 0,
        valueJumlahBTKL: 0,
        valueJumlahPenolong: 0,
        valueKodeAlat: [],
        valueKodeBTKL: [],
        valueKodeBahan: [],
        valueKodePenolong: [],
        valueKodeStandarPesanan: '',
        valueNamaAlat: [],
        valueNamaBahan: [],
        valueNamaBTKL: [],
        valueNamaStandarPesanan: '',
        valueTotalAlat: 0,
        valueTotalBahan: 0,
        valueTotalBTKL: 0,
        valueTotalPenolong: 0,
        valueUpah: 0,
    }

    async componentDidMount() {
        await this.GetAlat();
        await this.GetBahan();
        await this.GetPenolong();
        await this.GetStandarPesanan();
        await this.GetTenagaKerja();
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

        if (+valueKodeAlat.length <= 0) {
            alert('Alat belum dipilih');
            return;
        }

        if (+valueJumlahAlat === 0) {
            alert('Jumlah tidak boleh 0');
            return;
        }

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

        if (+valueKodeBahan.length <= 0) {
            alert('Bahan baku belum dipilih');
            return;
        }

        if (+valueJumlahBahan === 0) {
            alert('Jumlah tidak boleh 0');
            return;
        }


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

        if (+valueKodeBTKL.length <= 0) {
            alert('Tenaga kerja belum dipilih');
            return;
        }

        if (+valueJumlahBTKL === 0) {
            alert('Jumlah tidak boleh 0');
            return;
        }


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

        if (+valueKodePenolong.length <= 0) {
            alert('Bahan penolong belum dipilih');
            return;
        }

        if (+valueJumlahPenolong === 0) {
            alert('Jumlah tidak boleh 0');
            return;
        }


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
                        <td>
                            <div className={global.table_action}>
                                <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteDetailAlat(index)}><FaTrash />Delete</button>
                            </div>
                        </td>
                    </tr>
                );
            });
        }

        $('#table-data-bop-alat').DataTable().destroy();

        this.setState({ htmlTableDaftarDetailAlat: htmlTableDaftarDetailAlat }, () => {
            $('#table-data-bop-alat').DataTable();

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
                        <td>
                            <div className={global.table_action}>
                                <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteDetailBahan(index)}><FaTrash />Delete</button>
                            </div>
                        </td>
                    </tr>
                );
            });
        }

        $('#table-data-bahan-baku').DataTable().destroy();

        this.setState({ htmlTableDaftarDetailBahan: htmlTableDaftarDetailBahan }, () => {
            $('#table-data-bahan-baku').DataTable();

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
                        <td>
                            <div className={global.table_action}>
                                <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteDetailBTKL(index)}><FaTrash />Delete</button>
                            </div>
                        </td>
                    </tr>
                );
            });
        }

        $('#table-data-btkl').DataTable().destroy();

        this.setState({ htmlTableDaftarDetailBTKL: htmlTableDaftarDetailBTKL }, () => {
            $('#table-data-btkl').DataTable();

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
                        <td>
                            <div className={global.table_action}>
                                <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteDetailPenolong(index)}><FaTrash />Delete</button>
                            </div>
                        </td>
                    </tr>
                );
            });
        }

        $('#table-data-bop-penolong').DataTable().destroy();

        this.setState({ htmlTableDaftarDetailPenolong: htmlTableDaftarDetailPenolong }, () => {
            $('#table-data-bop-penolong').DataTable();

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

    GetStandarPesanan = () => {
        ShowLoading();

        $('#table-data-bahan-baku').DataTable().destroy();
        $('#table-data-bop-penolong').DataTable().destroy();
        $('#table-data-bop-alat').DataTable().destroy();
        $('#table-data-btkl').DataTable().destroy();

        axios.get(`${baseURL}/api/transaksi/penjualan/standar-pesanan/select.php`, config).then(response => {
            let data = response.data.data;

            this.setState({
                dataPesanan: data,
                valueKodeStandarPesanan: GenerateCode('SP', data)
            }, () => {
                $('#table-data-bahan-baku').DataTable();

                HideLoading();
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

    InputChange = async (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    InsertStandarPesanan = async () => {
        const {
            valueKodeStandarPesanan,
            valueNamaStandarPesanan,
            dataDetailAlat,
            dataDetailBahan,
            dataDetailBTKL,
            dataDetailPenolong
        } = this.state;

        ShowLoading();

        const formData = new FormData();

        formData.append('kode', valueKodeStandarPesanan);
        formData.append('nama', valueNamaStandarPesanan);
        formData.append('data_alat', JSON.stringify(dataDetailAlat));
        formData.append('data_bahan', JSON.stringify(dataDetailBahan));
        formData.append('data_penolong', JSON.stringify(dataDetailPenolong));
        formData.append('data_tenaga_kerja', JSON.stringify(dataDetailBTKL));

        axios.post(`${baseURL}/api/transaksi/penjualan/standar-pesanan/insert.php`, formData, config).then(response => {
            window.location.href = '/#/transaksi/penjualan/daftar-standar';
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    SelectAlat = (data) => {
        if (data) {
            let valueKode = this.state.dataSelectKodeAlat.find(item => item.value === data?.value);
            let valueNama = this.state.dataSelectNamaAlat.find(item => item.value === data?.value);

            let dataAlat = this.state.dataAlat.find(item => item.kode === valueKode.value);

            this.setState({
                valueKodeAlat: valueKode,
                valueNamaAlat: valueNama,
                valueHargaAlat: dataAlat.bop
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
            valueDepartemen,
            valueHargaAlat,
            valueHargaBahan,
            valueHargaPenolong,
            valueJumlahAlat,
            valueJumlahBahan,
            valueJumlahPenolong,
            valueJumlahBTKL,
            valueKodeAlat,
            valueKodeBahan,
            valueKodeBTKL,
            valueKodePenolong,
            valueKodeStandarPesanan,
            valueNamaAlat,
            valueNamaBahan,
            valueNamaBTKL,
            valueNamaPenolong,
            valueNamaStandarPesanan,
            valueTotalAlat,
            valueTotalBahan,
            valueTotalBTKL,
            valueTotalPenolong,
            valueUpah
        } = this.state;

        return (
            <React.Fragment>
                <div className={style.header}>
                    <p className={style.title}>Standar Pesanan</p>
                    <p className={style.pathname}>Transaksi / Penjualan / Perhitungan Harga / Kalkulator Estimasi</p>
                </div>
                <div className={`${style.content}`}>
                    <div className={`col-12`}>
                        <div className={`${global.card}`}>
                            <div className={`${global.header}`}>
                                <p className={global.title}>Tambah Standar Pesanan</p>
                            </div>
                            <div className='d-flex'>
                                <div className={`${global.input_group} col-6 pe-2`}>
                                    <p className={global.title}>Kode Standar</p>
                                    <input type="text" value={valueKodeStandarPesanan} readOnly={true} />
                                </div>
                                <div className={`${global.input_group} col-6 pe-2`}>
                                    <p className={global.title}>Nama Standar</p>
                                    <input type="text" id="valueNamaStandarPesanan" value={valueNamaStandarPesanan} onChange={this.InputChange}  />
                                </div>
                            </div>
                        </div>
                    </div>
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
                        </div>
                        <div className={`${global.card} w-100 ${this.state.tabSelected === 0 ? '' : 'd-none'}`}>
                            <div className='d-flex flex-wrap'>
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
                                    <input type="text" id='valueTotalBahan' value={SetPriceFormat(valueTotalBahan)} readOnly={true} />
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
                                    <input type="text" id='valueHargaPenolong' value={SetPriceFormat(valueHargaPenolong)} readOnly={true} />
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
                                    <input type="text" id='valueTotalPenolong' value={SetPriceFormat(valueTotalPenolong)} readOnly={true} />
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
                                    <Select id='select-nama-bahan-bop-alat' name='select-nama-bahan-bop-alat' isClearable={true} isSearchable={true} options={this.state.dataSelectNamaAlat} value={valueNamaAlat} placeholder={'Select Nama Alat...'} onChange={e => this.SelectAlat(e)} styles={CustomSelect} />
                                </div>
                            </div>
                            <div className={`d-flex`}>
                                <div className={`${global.input_group} col-4 pe-2`}>
                                    <p className={global.title}>Tarif BOP</p>
                                    <input type="text" id='valueHargaAlat' value={SetPriceFormat(valueHargaAlat)} readOnly={true} />
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
                                    <input type="text" id='valueTotalAlat' value={SetPriceFormat(valueTotalAlat)} readOnly={true} />
                                </div>
                            </div>
                        </div>
                        <div className={`${global.card} ${this.state.tabSelected === 3 ? '' : 'd-none'}`}>
                            <div className='d-flex'>
                                <div className={`${global.input_group} col-4 pe-2`}>
                                    <p className={global.title}>Kode TKL</p>
                                    <Select id='select-kode-btkl' name='select-kode-btkl' isClearable={true} isSearchable={true} options={this.state.dataSelectKodeBTKL} placeholder={'Select Kode Tenaga Kerja...'} value={valueKodeBTKL} onChange={e => this.SelectBTKL(e)} styles={CustomSelect} />
                                </div>
                                <div className={`${global.input_group} col-4 pe-2`}>
                                    <p className={global.title}>Nama Tenaga Kerja</p>
                                    <Select id='select-nama-btkl' name='select-nama-btkl' isClearable={true} isSearchable={true} options={this.state.dataSelectNamaBTKL} placeholder={'Select Nama Tenaga Kerja...'} value={valueNamaBTKL} onChange={e => this.SelectBTKL(e)} styles={CustomSelect} />
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
                                    <input type="text" id='valueTotalBTKL' value={SetPriceFormat(valueTotalBTKL)} readOnly={true} />
                                </div>
                            </div>
                        </div>
                        <div className='d-flex mt-4'>
                            <div className='col-6 pe-2'>
                                <button type='button' className={`${global.button} w-100`} onClick={this.InsertStandarPesanan}>Simpan</button>
                            </div>
                            <div className='col-6 ps-2'>
                                <Link to={'/#/transaksi/penjualan/daftar-standar'} className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }}>Batal</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default standar_pesanan