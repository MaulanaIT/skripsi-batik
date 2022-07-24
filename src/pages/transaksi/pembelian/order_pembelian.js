import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import { MdAdd } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa';
import { baseURL, config, GenerateCode, HideLoading, InputFormatNumber, ShowLoading } from '../../../component/helper';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/pembelian/order_pembelian.module.css';

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
        whiteSpace: 'nowrap'
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: 'white',
        fontSize: 12
    })
}

export class order_pembelian extends Component {

    state = {
        dataAlat: [],
        dataBahan: [],
        dataOrder: [],
        dataSupplier: [],

        kode: '',

        dataSelectKodeAlat: [],
        dataSelectNamaAlat: [],
        dataSelectKodeBahan: [],
        dataSelectNamaBahan: [],
        dataSelectKodeSupplier: [],
        dataSelectNamaSupplier: [],

        htmlTableDaftarAlat: [],
        htmlTableDaftarBahan: [],

        valueHarga: 0,
        valueJumlah: 0,
        valueKalkulasiTotalHarga: 0,
        valueKodeAlat: null,
        valueKodeBahan: null,
        valueKodeOrder: '',
        valueKodeSupplier: null,
        valueNamaAlat: null,
        valueNamaBahan: null,
        valueNamaSupplier: null,
        valueTanggal: moment().format('YYYY-MM-DD'),
        valueTotalHarga: 0,

        jenisPembelian: ''
    }

    async componentDidMount() {
        await this.GetAlat();
        await this.GetBahan();
        await this.GetSupplier();
        await this.GetOrder();
    }

    AddDetail = () => {
        const {
            valueHarga,
            valueJumlah,
            valueKodeAlat,
            valueKodeBahan,
            valueKodeOrder,
            valueKodeSupplier,
            valueNamaAlat,
            valueNamaBahan,
            valueNamaSupplier,
            valueTanggal,
            valueTotalHarga
        } = this.state;

        if (this.state.jenisPembelian.toLowerCase() === 'alat') {
            let dataAlat = this.state.dataAlat;

            let check = dataAlat.findIndex(item => item.kode_item === valueKodeAlat.value && item.harga === valueHarga);

            if (check < 0) {
                dataAlat.push({
                    kode: valueKodeOrder,
                    tanggal: valueTanggal,
                    kode_supplier: valueKodeSupplier.value,
                    nama_supplier: valueNamaSupplier.label,
                    kode_alat: valueKodeAlat.value,
                    nama_alat: valueNamaAlat.label,
                    kode_item: valueKodeAlat.value,
                    nama_item: valueNamaAlat.label,
                    jumlah: valueJumlah,
                    harga: valueHarga,
                    total_harga: valueTotalHarga
                });
            } else {
                dataAlat[check].jumlah = +dataAlat[check].jumlah + +valueJumlah;
                dataAlat[check].total_harga = +dataAlat[check].total_harga + +valueTotalHarga;
            }

            this.setState({
                dataAlat: dataAlat,
                valueKodeAlat: null,
                valueNamaAlat: null,
                valueJumlah: 0,
                valueHarga: 0,
                valueTotalHarga: 0
            }, () => {
                this.GetDetailAlat();
            });
        } else if (this.state.jenisPembelian.toLowerCase() === 'bahan') {
            let dataBahan = this.state.dataBahan;

            let check = dataBahan.findIndex(item => item.kode_item === valueKodeAlat.value && item.harga === valueHarga);

            if (check < 0) {
                dataBahan.push({
                    kode: valueKodeOrder,
                    tanggal: valueTanggal,
                    kode_supplier: valueKodeSupplier.value,
                    nama_supplier: valueNamaSupplier.label,
                    kode_bahan: valueKodeBahan.value,
                    nama_bahan: valueNamaBahan.label,
                    kode_item: valueKodeBahan.value,
                    nama_item: valueNamaBahan.label,
                    jumlah: valueJumlah,
                    harga: valueHarga,
                    total_harga: valueTotalHarga
                });
            } else {
                dataBahan[check].jumlah = +dataBahan[check].jumlah + +valueJumlah;
                dataBahan[check].total_harga = +dataBahan[check].total_harga + +valueTotalHarga;
            }

            this.setState({ 
                dataBahan: dataBahan, 
                valueKodeBahan: null,
                valueNamaBahan: null,
                valueJumlah: 0,
                valueHarga: 0,
                valueTotalHarga: 0
            }, () => {
                this.GetDetailBahan();
            });
        }
    }

    DeleteAlat = (id) => {
        let dataAlat = this.state.dataAlat;

        dataAlat.splice(id, 1);

        this.setState({ dataAlat: dataAlat }, () => {
            this.GetDetailAlat();
        });
    }

    DeleteBahan = (id) => {
        let dataBahan = this.state.dataBahan;

        dataBahan.splice(id, 1);

        this.setState({ dataBahan: dataBahan }, () => {
            this.GetDetailBahan();
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

            this.setState({ dataSelectKodeAlat: dataSelectKodeAlat, dataSelectNamaAlat: dataSelectNamaAlat });
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

            this.setState({ dataSelectKodeBahan: dataSelectKodeBahan, dataSelectNamaBahan: dataSelectNamaBahan });
        }).catch(error => {
            console.log(error);
        });
    }

    GetDetailAlat = () => {
        ShowLoading();

        let htmlTableDaftarAlat = [];

        if (this.state.dataAlat.length > 0) {
            this.state.dataAlat.forEach((item, index) => {
                htmlTableDaftarAlat.push(
                    <tr key={index}>
                        <td>{index + 1}.</td>
                        <td>{item.kode}</td>
                        <td>{item.kode_alat}</td>
                        <td>{item.nama_alat}</td>
                        <td>{item.satuan}</td>
                        <td>{item.jumlah}</td>
                        <td>{item.harga}</td>
                        <td>{item.total_harga}</td>
                        <td className={global.table_action}>
                            <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteAlat(item.id)}><FaTrash />Delete</button>
                        </td>
                    </tr>
                );
            });
        }

        $('#table-data').DataTable().destroy();

        this.setState({ htmlTableDaftarAlat: htmlTableDaftarAlat }, () => {
            $('#table-data').DataTable();

            this.KalkulasiTotalHarga();

            HideLoading();
        });
    }

    GetDetailBahan = () => {
        ShowLoading();

        let htmlTableDaftarBahan = [];

        if (this.state.dataBahan.length > 0) {
            this.state.dataBahan.forEach((item, index) => {
                htmlTableDaftarBahan.push(
                    <tr key={index}>
                        <td>{index + 1}.</td>
                        <td>{item.kode}</td>
                        <td>{item.kode_bahan}</td>
                        <td>{item.nama_bahan}</td>
                        <td>{item.satuan}</td>
                        <td>{item.jumlah}</td>
                        <td>{item.harga}</td>
                        <td>{item.total_harga}</td>
                        <td className={global.table_action}>
                            <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteBahan(item.id)}><FaTrash />Delete</button>
                        </td>
                    </tr>
                );
            });
        }

        $('#table-data').DataTable().destroy();

        this.setState({ htmlTableDaftarBahan: htmlTableDaftarBahan }, () => {
            $('#table-data').DataTable();

            this.KalkulasiTotalHarga();

            HideLoading();
        });
    }

    GetOrder = async () => {
        axios.get(`${baseURL}/api/transaksi/pembelian/order/select.php`, config).then(response => {
            let dataOrder = response.data.data;

            this.setState({ dataOrder: dataOrder, valueKodeOrder: GenerateCode('O', dataOrder) });
        }).catch(error => {
            console.log(error);
        });
    }

    GetSupplier = async () => {
        axios.get(`${baseURL}/api/master/supplier/select.php`, config).then(response => {
            let dataSupplier = response.data.data;
            let dataSelectKodeSupplier = [];
            let dataSelectNamaSupplier = [];

            if (dataSupplier.length > 0) {
                dataSupplier.forEach(item => {
                    dataSelectKodeSupplier.push({
                        value: item.kode,
                        label: item.kode
                    });

                    dataSelectNamaSupplier.push({
                        value: item.kode,
                        label: item.nama
                    });
                });
            }

            this.setState({ dataSupplier: dataSupplier, dataSelectKodeSupplier: dataSelectKodeSupplier, dataSelectNamaSupplier: dataSelectNamaSupplier });
        }).catch(error => {
            console.log(error);
        });
    }

    InputChange = (event) => {
        this.setState({ [event.target.id]: event.target.value }, () => {
            this.setState({ valueTotalHarga: this.state.valueHarga * this.state.valueJumlah });
        });
    }

    InsertOrder = () => {
        const {
            valueKodeOrder,
            valueKodeSupplier,
            valueTanggal,
            valueKalkulasiTotalHarga
        } = this.state;

        let jenisPembelian = this.state.jenisPembelian;

        ShowLoading();

        const formData = new FormData();

        formData.append('kode', valueKodeOrder);
        formData.append('tanggal', valueTanggal);
        formData.append('kode_supplier', valueKodeSupplier.value);
        formData.append('total_harga', valueKalkulasiTotalHarga);

        formData.append('jenis_pembelian', jenisPembelian.toLowerCase());

        if (jenisPembelian.toLowerCase() === 'alat')
            formData.append('data', JSON.stringify(this.state.dataAlat));
        else if (jenisPembelian.toLowerCase() === 'bahan')
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
        let jenisPembelian = this.state.jenisPembelian;

        if (jenisPembelian && jenisPembelian.toString().toLowerCase() === 'alat') {
            let dataAlat = this.state.dataAlat;

            dataAlat.forEach(item => {
                totalHarga += item.total_harga;
            });
        } else if (jenisPembelian && jenisPembelian.toString().toLowerCase() === 'bahan') {
            let dataBahan = this.state.dataBahan;

            dataBahan.forEach(item => {
                totalHarga += item.total_harga;
            });
        }

        this.setState({ valueKalkulasiTotalHarga: totalHarga });
    }

    SelectAlat = (data) => {
        if (data) {
            let valueKode = this.state.dataSelectKodeAlat.find(item => item.value === data?.value);
            let valueNama = this.state.dataSelectNamaAlat.find(item => item.value === data?.value);

            this.setState({ valueKodeAlat: valueKode, valueNamaAlat: valueNama });
        } else {
            this.setState({ valueKodeAlat: '', valueNamaAlat: '' });
        }
    }

    SelectBahan = (data) => {
        if (data) {
            let valueKode = this.state.dataSelectKodeBahan.find(item => item.value === data?.value);
            let valueNama = this.state.dataSelectNamaBahan.find(item => item.value === data?.value);

            this.setState({ 
                valueKodeBahan: valueKode, 
                valueNamaBahan: valueNama 
            });
        } else {
            this.setState({ 
                valueKodeBahan: '', 
                valueNamaBahan: '' 
            });
        }


    }

    SelectPembelian = (data) => {
        if (this.state.jenisPembelian === data?.value) return;

        $('#table-data').DataTable().destroy();

        this.setState({ 
            jenisPembelian: data ? data.value : '',
    
            valueHarga: 0,
            valueJumlah: 0,
            valueKalkulasiTotalHarga: 0,
            valueKodeAlat: null,
            valueKodeBahan: null,
            valueKodeSupplier: null,
            valueNamaAlat: null,
            valueNamaBahan: null,
            valueNamaSupplier: null,
            valueTanggal: moment().format('YYYY-MM-DD'),
            valueTotalHarga: 0,
        }, () => {
            if (data && data.value.toString().toLowerCase() === 'alat') this.GetDetailAlat();
            else if (data && data.value.toString().toLowerCase() === 'bahan') this.GetDetailBahan();
        });
    }

    SelectSupplier = (data) => {
        if (data) {
            let valueKode = this.state.dataSelectKodeSupplier.find(item => item.value === data?.value);
            let valueNama = this.state.dataSelectNamaSupplier.find(item => item.value === data?.value);

            this.setState({ valueKodeSupplier: valueKode, valueNamaSupplier: valueNama });
        } else {
            this.setState({ valueKodeSupplier: '', valueNamaSupplier: '' });
        }
    }

    render() {

        const {
            dataAlat,
            dataBahan,
            valueHarga,
            valueJumlah,
            valueKalkulasiTotalHarga,
            valueKodeAlat,
            valueKodeBahan,
            valueKodeOrder,
            valueKodeSupplier,
            valueNamaAlat,
            valueNamaBahan,
            valueNamaSupplier,
            valueTanggal,
            valueTotalHarga
        } = this.state;

        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Order Pembelian</p>
                    <p className={style.pathname}>Transaksi / Pembelian / Order Pembelian</p>
                </div>
                <div className={style.content}>
                    <div className={`col-12 col-md-6 pe-md-2 pb-2 pb-md-0`}>
                        <div className={`${global.card}`}>
                            <p className={global.title}>Input Order Pembelian</p>
                            <div className={`${global.input_group} col-4 pe-2`}>
                                <p className={global.title}>Jenis Pembelian</p>
                                <Select isClearable={true} isSearchable={true} options={[
                                    { value: 'Bahan', label: 'Bahan' },
                                    { value: 'Alat', label: 'Alat' }
                                ]} placeholder={'Select Pembelian...'} styles={CustomSelect} onChange={(value) => this.SelectPembelian(value)} />
                            </div>
                            {this.state.jenisPembelian !== '' ?
                                <>
                                    <div className={`d-flex`}>
                                        <div className={`${global.input_group} col-6 pe-2`}>
                                            <p className={global.title}>Kode Order</p>
                                            <input type="text" id='valueKodeOrder' maxLength={10} value={valueKodeOrder} readOnly={true} />
                                        </div>
                                        <div className={`${global.input_group} col-6 ps-2`}>
                                            <p className={global.title}>Tanggal</p>
                                            <input type="date" id='valueTanggal' value={valueTanggal} onChange={this.InputChange} />
                                        </div>
                                    </div>
                                    <div className={`d-flex`}>
                                        <div className={`${global.input_group} col-3 pe-2`}>
                                            <p className={global.title}>Kode Supplier</p>
                                            <Select escapeClearsValue={false} isClearable={true} isSearchable={true} options={this.state.dataSelectKodeSupplier} placeholder={'Select Kode...'} styles={CustomSelect} value={valueKodeSupplier} onChange={(data) => this.SelectSupplier(data)} isDisabled={dataAlat.length > 0 || dataBahan.length > 0} />
                                        </div>
                                        <div className={`${global.input_group} col-5 ps-2`}>
                                            <p className={global.title}>Nama Supplier</p>
                                            <Select isClearable={true} isSearchable={true} options={this.state.dataSelectNamaSupplier} placeholder={'Select Nama...'} styles={CustomSelect} value={valueNamaSupplier} onChange={(data) => this.SelectSupplier(data)} isDisabled={dataAlat.length > 0 || dataBahan.length > 0 && false} />
                                        </div>
                                    </div>
                                    {this.state.jenisPembelian === 'Bahan' ?
                                        <>
                                            <div className={`d-flex`}>
                                                <div className={`${global.input_group} col-5 pe-2`}>
                                                    <p className={global.title}>Kode Bahan</p>
                                                    <Select id='select-kode-bahan' isClearable={true} isSearchable={true} options={this.state.dataSelectKodeBahan} placeholder={'Select Kode...'} styles={CustomSelect} value={valueKodeBahan} onChange={(data) => this.SelectBahan(data)} />
                                                </div>
                                                <div className={`${global.input_group} col-7 pe-2`}>
                                                    <p className={global.title}>Nama Bahan</p>
                                                    <Select id='select-nama-bahan' isClearable={true} isSearchable={true} options={this.state.dataSelectNamaBahan} placeholder={'Select Nama...'} styles={CustomSelect} value={valueNamaBahan} onChange={(data) => this.SelectBahan(data)} />
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className={`d-flex`}>
                                                <div className={`${global.input_group} col-5 pe-2`}>
                                                    <p className={global.title}>Kode Alat</p>
                                                    <Select id='select-kode-alat' isClearable={true} isSearchable={true} options={this.state.dataSelectKodeAlat} placeholder={'Select Kode...'} styles={CustomSelect} value={valueKodeAlat} onChange={(data) => this.SelectAlat(data)} />
                                                </div>
                                                <div className={`${global.input_group} col-7 pe-2`}>
                                                    <p className={global.title}>Nama Alat</p>
                                                    <Select id='select-nama-alat' isClearable={true} isSearchable={true} options={this.state.dataSelectNamaAlat} placeholder={'Select Nama...'} styles={CustomSelect} value={valueNamaAlat} onChange={(data) => this.SelectAlat(data)} />
                                                </div>
                                            </div>
                                            <div className={`d-flex`}>
                                                <div className={`${global.input_group}`}>
                                                    <p>Upload File Desain</p>
                                                    <input type="file" accept='.pdf' id='input-detail-file' />
                                                </div>
                                            </div>
                                        </>
                                    }
                                    <div className={`d-flex`}>
                                        <div className={`${global.input_group} col-4 pe-2`}>
                                            <p className={global.title}>Jumlah</p>
                                            <input type="text" id='valueJumlah' className='text-end' value={valueJumlah} onInput={InputFormatNumber} onChange={this.InputChange} />
                                        </div>
                                        <div className={`${global.input_group} col-4 px-2`}>
                                            <p className={global.title}>Harga</p>
                                            <input type="text" id='valueHarga' className='text-end' value={valueHarga} onInput={InputFormatNumber} onChange={this.InputChange} />
                                        </div>
                                        <div className={`${global.input_group} col-4 ps-2`}>
                                            <p className={global.title}>Total Harga</p>
                                            <input type="text" id='valueTotalHarga' className='text-end' value={valueTotalHarga} readOnly={true} />
                                        </div>
                                    </div>
                                    <button type='button' className={global.button} onClick={this.AddDetail}><MdAdd /> Tambah</button>
                                </>
                                : null}
                        </div>
                    </div>
                    {this.state.jenisPembelian !== '' ?
                        <div className={`col-12 col-md-6 ps-md-2 pt-2 pt-md-0`}>
                            <div className={global.card}>
                                <div className={`${global.header}`}>
                                    <p className={global.title}>Daftar Pembelian</p>
                                </div>
                                {this.state.jenisPembelian === 'Bahan' ?
                                    <>
                                        <div className={`table-responsive`}>
                                            <table id='table-data' className={`table w-100`}>
                                                <thead>
                                                    <tr>
                                                        <td>No.</td>
                                                        <td>Kode</td>
                                                        <td>Kode Bahan</td>
                                                        <td>Nama Bahan</td>
                                                        <td>Satuan</td>
                                                        <td>Jumlah Beli</td>
                                                        <td>Harga</td>
                                                        <td>Total Harga</td>
                                                        <td>Aksi</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.htmlTableDaftarBahan}
                                                </tbody>
                                            </table>
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
                                                        <td>Kode Alat</td>
                                                        <td>Nama Alat</td>
                                                        <td>Satuan</td>
                                                        <td>Jumlah Beli</td>
                                                        <td>Harga</td>
                                                        <td>Total Harga</td>
                                                        <td>Aksi</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.htmlTableDaftarAlat}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                }
                                <div className={`d-flex flex-column gap-2 pb-2`}>
                                    <div className={`align-items-center ${global.input_group_row}`}>
                                        <p className={`${global.title} col-3`}>Total Harga</p>
                                        <input type="text" id='valueKalkulasiTotalHarga' value={valueKalkulasiTotalHarga} readOnly={true} />
                                    </div>
                                </div>
                                <div className='d-flex flex-column gap-2 pt-2'>
                                    <div className='d-flex'>
                                        <div className='col-6 pe-2'>
                                            <button type='button' className={`${global.button} w-100`} onClick={this.InsertOrder}>Simpan</button>
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
export default order_pembelian