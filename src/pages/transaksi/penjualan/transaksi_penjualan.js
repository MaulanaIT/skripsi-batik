import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import { MdAdd } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa';
import { baseURL, Calculate, config, GenerateCode, HideLoading, InputFormatNumber, ShowLoading } from '../../../component/helper';

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
        dataJual: [],
        dataKonsinyasi: [],
        dataPesanan: [],
        dataProduk: [],
        dataSupplier: [],
        dataTunai: [],

        kode: '',

        dataSelectKodeProduk: [],
        dataSelectNamaProduk: [],
        dataSelectKodeConsignee: [],
        dataSelectNamaConsignee: [],
        dataSelectKodeCustomer: [],
        dataSelectNamaCustomer: [],

        htmlTableDaftarTunai: [],
        htmlTableDaftarKonsinyasi: [],
        htmlTableDaftarPesanan: [],

        valueDiskon: 0,
        valueHarga: 0,
        valueJumlah: 0,
        valueKodeProduk: null,
        valueKodeJual: '',
        valueKodeConsignee: null,
        valueKodeCustomer: null,
        valueKodeKasMasuk: '',
        valueNamaProduk: null,
        valueNamaConsignee: null,
        valueNamaCustomer: null,
        valueOngkosKirim: 0,
        valuePiutang: 0,
        valueSisa: 0,
        valueTanggal: moment().format('YYYY-MM-DD'),
        valueTotalBayar: 0,
        valueTotalKembalian: 0,
        valueTotalJual: 0,
        valueUangMuka: 0,

        jenisPenjualan: ''
    }

    async componentDidMount() {
        await this.GetCustomer();
        await this.GetConsignee();
        await this.GetProduk();
    }

    AddDetail = () => {
        const {
            valueHarga,
            valueJumlah,
            valueKodeJual,
            valueKodeProduk,
            valueNamaProduk,
        } = this.state;

        if (this.state.jenisPenjualan.toLowerCase() === 'tunai') {
            let dataTunai = this.state.dataTunai;

            dataTunai.push({
                kode: valueKodeJual,
                kode_item: valueKodeProduk.value,
                nama_item: valueNamaProduk.label,
                jumlah: valueJumlah,
                harga: valueHarga,
                total_harga: valueJumlah * valueHarga
            });

            this.setState({ dataTunai: dataTunai }, () => {
                this.GetDetailTunai();
            });
        } else if (this.state.jenisPenjualan.toLowerCase() === 'konsinyasi') {
            let dataKonsinyasi = this.state.dataKonsinyasi;

            dataKonsinyasi.push({
                kode: valueKodeJual,
                kode_item: valueKodeProduk.value,
                nama_item: valueNamaProduk.label,
                jumlah: valueJumlah,
                harga: valueHarga,
                total_harga: valueJumlah * valueHarga
            });

            this.setState({ dataKonsinyasi: dataKonsinyasi }, () => {
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

    DeleteKonsinyasi = (id) => {
        let dataKonsinyasi = this.state.dataKonsinyasi;

        dataKonsinyasi.splice(id, 1);

        this.setState({ dataKonsinyasi: dataKonsinyasi }, () => {
            this.GetDetailKonsinyasi();
        });
    }

    DeletePesanan = (id) => {
        let dataPesanan = this.state.dataPesanan;

        dataPesanan.splice(id, 1);

        this.setState({ dataPesanan: dataPesanan }, () => {
            this.GetDetailPesanan();
        });
    }

    DeleteTunai = (id) => {
        let dataTunai = this.state.dataTunai;

        dataTunai.splice(id, 1);

        this.setState({ dataTunai: dataTunai }, () => {
            this.GetDetailTunai();
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
                        <td className={global.table_action}>
                            <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteKonsinyasi(item.id)}><FaTrash />Delete</button>
                        </td>
                    </tr>
                );
            });
        }

        $('#table-data').DataTable().destroy();

        this.setState({ htmlTableDaftarKonsinyasi: htmlTableDaftarKonsinyasi }, () => {
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
                        <td className={global.table_action}>
                            <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteTunai(item.id)}><FaTrash />Delete</button>
                        </td>
                    </tr>
                );
            });
        }

        $('#table-data').DataTable().destroy();

        this.setState({ htmlTableDaftarTunai: htmlTableDaftarTunai }, () => {
            $('#table-data').DataTable();

            this.KalkulasiTotalHarga();

            HideLoading();
        });
    }

    GetJual = async () => {
        let jenisPenjualan = this.state.jenisPenjualan;

        const formData = new FormData();

        formData.append('jenis_penjualan', jenisPenjualan.toLowerCase());

        axios.post(`${baseURL}/api/transaksi/penjualan/penjualan/select.php`, formData, config).then(response => {
            let dataJual = response.data.data;

            $('#table-data').DataTable().destroy();

            this.setState({
                dataJual: dataJual,
                valueKodeJual: GenerateCode(
                    jenisPenjualan === 'Tunai' ? 'JT' : jenisPenjualan === 'Konsinyasi' ? 'JK' : 'JP'
                    , dataJual
                )
            }, () => {
                $(`#table-data`).DataTable();
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

    InputChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    InsertJual = () => {
        const {
            valueHarga,
            valueJumlah,
            valueKodeJual,
            valueKodeSupplier,
            valueTanggal
        } = this.state;

        let jenisPenjualan = this.state.jenisPenjualan;

        ShowLoading();

        const formData = new FormData();

        formData.append('kode', valueKodeJual);
        formData.append('tanggal', valueTanggal);
        formData.append('kode_supplier', valueKodeSupplier.value);
        formData.append('total_harga', parseInt(valueJumlah) * parseInt(valueHarga));

        formData.append('jenis_pembelian', jenisPenjualan.toLowerCase());

        if (jenisPenjualan.toLowerCase() === 'alat')
            formData.append('data', JSON.stringify(this.state.dataAlat));
        else if (jenisPenjualan.toLowerCase() === 'bahan')
            formData.append('data', JSON.stringify(this.state.dataBahan));

        axios.post(`${baseURL}/api/transaksi/pembelian/order/insert.php`, formData, config).then(() => {
            window.location.href = '/transaksi/pembelian/daftar-order';
        }).catch(error => {
            console.log(error);

            HideLoading();
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

            console.log(dataTunai)
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

    SelectProduk = (data) => {
        if (data) {
            let valueKode = this.state.dataSelectKodeProduk.find(item => item.value === data?.value);
            let valueNama = this.state.dataSelectNamaProduk.find(item => item.value === data?.value);
            let harga = this.state.dataProduk.find(item => item.kode === valueKode.value).harga_jual;

            this.setState({ valueHarga: harga, valueKodeProduk: valueKode, valueNamaProduk: valueNama });
        } else {
            this.setState({ valueHarga: 0, valueKodeProduk: '', valueNamaProduk: '' });
        }
    }

    SelectPenjualan = (data) => {
        $('#table-data').DataTable().destroy();

        this.setState({ jenisPenjualan: data ? data.value : '' }, () => {
            // if (data && data.value.toString().toLowerCase() === 'tunai') this.GetDetailTunai();
            // else if (data && data.value.toString().toLowerCase() === 'konsinyasi') this.GetDetailKonsinyasi();
            // else if (data && data.value.toString().toLowerCase() === 'pesanan') this.GetDetailPesanan();

            this.GetJual();

            this.setState({
                valueHarga: 0,
                valueJumlah: 0,
                valueKodeProduk: null,
                valueKodeCongsignee: null,
                valueKodeCustomer: null,
                valueKodeKasMasuk: '',
                valueNamaProduk: null,
                valueNamaCongsignee: null,
                valueNamaCustomer: null,
                valueTanggal: moment().format('YYYY-MM-DD')
            })
        });
    }

    render() {

        const {
            valueDiskon,
            valueHarga,
            valueJumlah,
            valueKodeProduk,
            valueKodeJual,
            valueKodeConsignee,
            valueKodeCustomer,
            valueKodeKasMasuk,
            valueNamaProduk,
            valueNamaConsignee,
            valueNamaCustomer,
            valueOngkosKirim,
            valueTanggal,
            valueTotalBayar,
            valueTotalJual,
            valueUangMuka
        } = this.state;

        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Transaksi Penjualan</p>
                    <p className={style.pathname}>Transaksi / Penjualan / Transaksi Penjualan</p>
                </div>
                <div className={style.content}>
                    <div className={`col-12 col-md-6 pe-md-2 pb-2 pb-md-0`}>
                        <div className={`${global.card}`}>
                            <div className={`${global.header}`}>
                                <p className={global.title}>Input Penjualan</p>
                            </div>
                            <div className={global.input_group}>
                                <p className={global.title}>Jenis Transaksi</p>
                                <Select isClearable={true} isSearchable={true} options={[
                                    { value: 'Tunai', label: 'Tunai' },
                                    { value: 'Konsinyasi', label: 'Konsinyasi' },
                                    { value: 'Pesanan', label: 'Pesanan' }
                                ]} placeholder={'Select Transaksi...'} styles={CustomSelect} onChange={(value) => this.SelectPenjualan(value)} />
                            </div>
                            {this.state.jenisPenjualan !== '' ?
                                <>
                                    <div className={`${bootstrap['d-flex']}`}>
                                        <div className={`${global.input_group} col-6 pe-2`}>
                                            <p className={global.title}>Kode Jual</p>
                                            <input type="text" id='valueKodeJual' maxLength={10} value={valueKodeJual} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-6 ps-2`}>
                                            <p className={global.title}>Tanggal</p>
                                            <input type="date" id='valueTanggal' value={valueTanggal} onChange={this.InputChange} />
                                        </div>
                                    </div>
                                    {this.state.jenisPenjualan === 'Tunai' ?
                                        <>
                                            <div className={`${bootstrap['d-flex']}`}>
                                                <div className={`${global.input_group} col-5 pe-2`}>
                                                    <p className={global.title}>Kode Customer</p>
                                                    <Select id='select-kode-customer' isClearable={true} isSearchable={true} options={this.state.dataSelectKodeCustomer} placeholder={'Select Kode...'} value={valueKodeCustomer} styles={CustomSelect} onChange={(data) => this.SelectCustomer(data)} />
                                                </div>
                                                <div className={`${global.input_group} col-7 pe-2`}>
                                                    <p className={global.title}>Nama Customer</p>
                                                    <Select id='select-nama-customer' isClearable={true} isSearchable={true} options={this.state.dataSelectNamaCustomer} placeholder={'Select Nama...'} value={valueNamaCustomer} styles={CustomSelect} onChange={(data) => this.SelectCustomer(data)} />
                                                </div>
                                            </div>
                                            <div className={`${bootstrap['d-flex']}`}>
                                                <div className={`${global.input_group} col-5 pe-2`}>
                                                    <p className={global.title}>Kode Produk</p>
                                                    <Select id='select-kode-produk' isClearable={true} isSearchable={true} options={this.state.dataSelectKodeProduk} placeholder={'Select Kode...'} value={valueKodeProduk} styles={CustomSelect} onChange={this.SelectProduk} />
                                                </div>
                                                <div className={`${global.input_group} col-7 pe-2`}>
                                                    <p className={global.title}>Nama Produk</p>
                                                    <Select id='select-nama-produk' name='select-nama-produk' isClearable={true} isSearchable={true} options={this.state.dataSelectNamaProduk} placeholder={'Select Nama...'} value={valueNamaProduk} styles={CustomSelect} onChange={this.SelectProduk} />
                                                </div>
                                            </div>
                                            <div className={`${bootstrap['d-flex']}`}>
                                                <div className={`${global.input_group} col-4 pe-2`}>
                                                    <p className={global.title}>Jumlah</p>
                                                    <input type="text" id='valueJumlah' className='text-end' value={valueJumlah} onInput={InputFormatNumber} onChange={this.InputChange} />
                                                </div>
                                                <div className={`${global.input_group} col-4 px-2`}>
                                                    <p className={global.title}>Harga</p>
                                                    <input type="text" id='valueHarga' className='text-end' value={valueHarga} readOnly={true} />
                                                </div>
                                                <div className={`${global.input_group} col-4 ps-2`}>
                                                    <p className={global.title}>Total Harga</p>
                                                    <input type="text" id='valueTotalHarga' className='text-end' value={parseInt(valueJumlah) * parseInt(valueHarga)} readOnly={true} />
                                                </div>
                                            </div>
                                            <button type='button' className={global.button} onClick={this.AddDetail}><MdAdd /> Tambah</button>
                                        </>
                                        :
                                        this.state.jenisPenjualan === 'Pesanan' ?
                                            <>
                                                <div className={`${bootstrap['d-flex']}`}>
                                                    <div className={`${global.input_group} col-5 pe-2`}>
                                                        <p className={global.title}>Kode Customer</p>
                                                        <Select id='select-kode-customer' isClearable={true} isSearchable={true} options={this.state.dataSelectKodeCustomer} placeholder={'Select Kode...'} value={valueKodeCustomer} styles={CustomSelect} onChange={(data) => this.SelectCustomer(data)} />
                                                    </div>
                                                    <div className={`${global.input_group} col-7 pe-2`}>
                                                        <p className={global.title}>Nama Customer</p>
                                                        <Select id='select-nama-customer' isClearable={true} isSearchable={true} options={this.state.dataSelectNamaCustomer} placeholder={'Select Nama...'} value={valueNamaCustomer} styles={CustomSelect} onChange={(data) => this.SelectCustomer(data)} />
                                                    </div>
                                                </div>
                                                <div className={`${global.input_group} col-6 pe-2`}>
                                                    <p className={global.title}>Kode Kas Masuk</p>
                                                    <input type="text" id='valueKodeKasMasuk' value={valueKodeKasMasuk} onChange={this.InputChange} />
                                                </div>
                                                <button type='button' className={global.button} onClick={this.AddDetail}><MdAdd /> Tambah</button>
                                            </>
                                            :
                                            <>
                                                <div className={`${bootstrap['d-flex']}`}>
                                                    <div className={`${global.input_group} col-5 pe-2`}>
                                                        <p className={global.title}>Kode Consignee</p>
                                                        <Select id='select-kode-consignee' isClearable={true} isSearchable={true} options={this.state.dataSelectKodeConsignee} placeholder={'Select Kode...'} value={valueKodeConsignee} styles={CustomSelect} onChange={(data) => this.SelectConsignee(data)} />
                                                    </div>
                                                    <div className={`${global.input_group} col-7 pe-2`}>
                                                        <p className={global.title}>Nama Consignee</p>
                                                        <Select id='select-nama-consignee' isClearable={true} isSearchable={true} options={this.state.dataSelectNamaConsignee} placeholder={'Select Nama...'} value={valueNamaConsignee} styles={CustomSelect} onChange={(data) => this.SelectConsignee(data)} />
                                                    </div>
                                                </div>
                                                <div className={`${bootstrap['d-flex']}`}>
                                                    <div className={`${global.input_group} col-5 pe-2`}>
                                                        <p className={global.title}>Kode Produk</p>
                                                        <Select id='select-kode-produk' isClearable={true} isSearchable={true} options={this.state.dataSelectKodeProduk} placeholder={'Select Kode...'} value={valueKodeProduk} styles={CustomSelect} onChange={this.SelectProduk} />
                                                    </div>
                                                    <div className={`${global.input_group} col-7 pe-2`}>
                                                        <p className={global.title}>Nama Produk</p>
                                                        <Select id='select-nama-produk' isClearable={true} isSearchable={true} options={this.state.dataSelectNamaProduk} placeholder={'Select Nama...'} value={valueNamaProduk} styles={CustomSelect} onChange={this.SelectProduk} />
                                                    </div>
                                                </div>
                                                <div className={`${bootstrap['d-flex']}`}>
                                                    <div className={`${global.input_group} col-4 pe-2`}>
                                                        <p className={global.title}>Jumlah</p>
                                                        <input type="text" id='valueJumlah' className='text-end' value={valueJumlah} onInput={InputFormatNumber} onChange={this.InputChange} />
                                                    </div>
                                                    <div className={`${global.input_group} col-4 px-2`}>
                                                        <p className={global.title}>Harga</p>
                                                        <input type="text" id='valueHarga' className='text-end' value={valueHarga} readOnly={true} />
                                                    </div>
                                                    <div className={`${global.input_group} col-4 ps-2`}>
                                                        <p className={global.title}>Total Harga</p>
                                                        <input type="text" id='valueTotalHarga' className='text-end' value={parseInt(valueJumlah) * parseInt(valueHarga)} readOnly={true} />
                                                    </div>
                                                </div>
                                                <button type='button' className={global.button} onClick={this.AddDetail}><MdAdd /> Tambah</button>
                                            </>
                                    }
                                </>
                                : null}
                        </div>
                    </div>
                    {this.state.jenisPenjualan !== '' ?
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
                                                <input type="text" id='valueTotalJual' className={`${this.state.jenisPenjualan === 'Tunai' ? 'col-6' : 'col-9'}`} value={valueTotalJual} readOnly={true} />
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Diskon</p>
                                                <input type="text" id='valueDiskon' className={`${this.state.jenisPenjualan === 'Tunai' ? 'col-6' : 'col-9'}`} value={valueDiskon} onInput={InputFormatNumber} onChange={this.InputChange} onBlur={(e) => parseInt(e.target.value) > parseInt(valueTotalJual) && this.setState({valueDiskon: valueTotalJual})} />
                                            </div>
                                        </div>
                                        <div className={`align-items-center ${global.input_group_row}`}>
                                            <p className={`${global.title} col-3`}>Ongkos Kirim</p>
                                            <input type="text" id='valueOngkosKirim' className={`col-6`} value={valueOngkosKirim} onInput={InputFormatNumber} onChange={this.InputChange} />
                                        </div>
                                        <div className={`align-items-center ${global.input_group_row}`}>
                                            <p className={`${global.title} col-3`}>Total Harga</p>
                                            <input type="text" id='valueTotalHarga' className={`col-6`} value={Calculate([valueTotalJual, -valueDiskon, valueOngkosKirim])} readOnly={true} />
                                            <div className='col-3 ps-2'>
                                                <Select id='select-kode-produk' name='select-kode-produk' isClearable={true} isSearchable={true} options={[
                                                    { value: '1', label: 'Akun 1' },
                                                    { value: '2', label: 'Akun 2' }
                                                ]} placeholder={'Select Akun...'} styles={CustomSelect} />
                                            </div>
                                        </div>
                                        <div className={`align-items-center ${global.input_group_row}`}>
                                            <p className={`${global.title} col-3`}>Bayar</p>
                                            <input type="text" id='valueTotalBayar' className={`col-6`} value={valueTotalBayar} onInput={InputFormatNumber} onChange={this.InputChange} />
                                        </div>
                                        <div className={`align-items-center ${global.input_group_row}`}>
                                            <p className={`${global.title} col-3`}>Kembalian</p>
                                            <input type="text" id='valueTotalKembalian' className={`col-6`} value={Calculate([valueTotalBayar, -valueTotalJual, valueDiskon, -valueOngkosKirim])} readOnly={true} />
                                        </div>
                                    </>
                                    :
                                    this.state.jenisPenjualan === 'Pesanan' ?
                                        <>
                                            <div className={`table-responsive`}>
                                                <table id='table-data' className={`table w-100`}>
                                                    <thead>
                                                        <tr>
                                                            <td>No.</td>
                                                            <td>Kode</td>
                                                            <td>Kode Pesanan</td>
                                                            <td>Nama Pesanan</td>
                                                            <td>Jumlah Jual</td>
                                                            <td>Harga Jual</td>
                                                            <td>Total Harga</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.htmlTableDaftarPesanan}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Total Jual</p>
                                                <input type="text" id='valueTotalJual' className={`col-6`} value={valueTotalJual} readOnly={true} />
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Diskon</p>
                                                <input type="text" id='valueDiskon' className={'col-6'} value={valueDiskon} onInput={InputFormatNumber} onChange={this.InputChange} />
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Ongkos Kirim</p>
                                                <input type="text" id='valueOngkosKirim' className={`col-6`} value={valueOngkosKirim} onInput={InputFormatNumber} onChange={this.InputChange} />
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Total Harga</p>
                                                <input type="text" id='valueTotalHarga' className={`col-6`} value={Calculate([valueTotalJual, -valueDiskon, valueOngkosKirim])} readOnly={true} />
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Uang Muka</p>
                                                <input type="text" id='valueUangMuka' className={`col-6`} value={valueUangMuka} onInput={InputFormatNumber} onChange={this.InputChange} />
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Sisa</p>
                                                <input type="text" id='valueSisa' className={`col-6`} value={Calculate([valueTotalJual, -valueDiskon, valueOngkosKirim, -valueUangMuka])} readOnly={true} />
                                                <div className='col-3 ps-2'>
                                                    <Select id='select-kode-akun' name='select-kode-akun' isClearable={true} isSearchable={true} options={[
                                                        { value: '1', label: 'Akun 1' },
                                                        { value: '2', label: 'Akun 2' }
                                                    ]} placeholder={'Select Akun...'} styles={CustomSelect} />
                                                </div>
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Bayar</p>
                                                <input type="text" id='valueTotalBayar' className={`col-6`} value={valueTotalBayar} onInput={InputFormatNumber} onChange={this.InputChange} />
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Kembalian</p>
                                                <input type="text" id='valueTotalKembalian' className={`col-6`} value={Calculate([valueTotalBayar, -valueUangMuka])} readOnly={true} />
                                            </div>
                                            <div className='d-flex flex-column gap-5 pt-2'>
                                                <div>
                                                    <p>Upload File Transfer</p>
                                                    <input type="file" accept='.pdf' id='input-detail-file' name='input-detail-file' />
                                                </div>
                                            </div>

                                        </>
                                        :
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
                                                    <input type="text" id='valueTotalJual' className={`${this.state.jenisPenjualan === 'Konsinyasi' ? 'col-6' : 'col-9'}`} value={valueTotalJual} readOnly={true} />
                                                </div>
                                                <div className={`align-items-center ${global.input_group_row}`}>
                                                    <p className={`${global.title} col-3`}>Diskon</p>
                                                    <input type="text" id='valueDiskon' className={`${this.state.jenisPenjualan === 'Konsinyasi' ? 'col-6' : 'col-9'}`} value={valueDiskon} onInput={InputFormatNumber} onChange={this.InputChange} />
                                                </div>
                                            </div>
                                            <div className={`align-items-center ${global.input_group_row}`}>
                                                <p className={`${global.title} col-3`}>Piutang</p>
                                                <input type="text" id='valuePiutang' className={`${this.state.jenisPenjualan === 'Konsinyasi' ? 'col-6' : 'col-9'}`} value={Calculate([valueTotalJual, -valueDiskon])} readOnly={true} />
                                            </div>
                                        </>
                                }
                                <div className='d-flex flex-column gap-2 pt-2'>
                                    <div className='d-flex'>
                                        <div className='col-6 pe-2'>
                                            <button type='button' className={`${global.button} w-100`}>Simpan</button>
                                        </div>
                                        <div className='col-6 ps-2'>
                                            <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }}>Batal</button>
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