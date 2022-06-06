import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import { baseURL, config, GenerateCode, HideLoading, InputFormatNumber, ShowLoading } from '../../../component/helper';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/pembelian/penerimaan_barang.module.css';

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

export class penerimaan_barang extends Component {

    state = {
        dataDetailOrder: [],
        dataOrder: [],

        dataSelectKodeOrder: [],

        htmlTableDaftarDetailOrder: [],

        valueKodePenerimaan: '',
        valueKodeSupplier: '',
        valueNamaSupplier: '',
        valueTanggal: moment().format('YYYY-MM-DD'),
        valueTanggalOrder: '',

        jenisPembelian: '',
    }

    async componentDidMount() {
        await this.GetPenerimaanBarang();
        await this.GetOrder();
    }

    GetOrder = async () => {
        axios.get(`${baseURL}/api/transaksi/pembelian/order/select.php`, config).then(response => {
            ShowLoading();
            let dataOrder = response.data.data.filter(item => item.status === '0');

            let dataSelectKodeOrder = [];

            if (dataOrder.length > 0) {
                dataOrder.forEach(item => {
                    dataSelectKodeOrder.push({
                        value: item.kode,
                        label: item.kode
                    });
                });
            }

            this.setState({ dataOrder: dataOrder, dataSelectKodeOrder: dataSelectKodeOrder }, () => {
                HideLoading();
            });
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    GetPenerimaanBarang = async () => {
        axios.get(`${baseURL}/api/transaksi/pembelian/terima-barang/select.php`, config).then(response => {
            ShowLoading();
            let dataPenerimaan = response.data.data;

            this.setState({ valueKodePenerimaan: GenerateCode('TB', dataPenerimaan) }, () => {
                $(`#table-data`).DataTable();

                HideLoading();
            });
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    InputChange = (event) => {
        this.setState({ [event.target.id]: event.target.value }, () => {
            this.setState({ valueTotalHarga: this.state.valueHarga * this.state.valueJumlah });
        });
    }

    SelectKodeOrder = (data) => {
        if (data) {
            let dataOrder = this.state.dataOrder;
            let kodeOrder = data.value;

            let selectedOrder = dataOrder.find(item => item.kode === kodeOrder);

            this.setState({
                valueKodeSupplier: selectedOrder.kode_supplier,
                valueNamaSupplier: selectedOrder.nama_supplier,
                valueTanggalOrder: selectedOrder.tanggal
            }, () => {
                const formData = new FormData();

                formData.append('kode', kodeOrder);

                axios.post(`${baseURL}/api/transaksi/pembelian/detail-order/select.php`, formData, config).then(response => {
                    let dataDetailOrder = response.data.data;

                    let htmlTableDaftarDetailOrder = [];

                    if (dataDetailOrder.length > 0) {
                        dataDetailOrder.forEach((item, index) => {
                            htmlTableDaftarDetailOrder.push(
                                <tr key={index}>
                                    <td>{index + 1}.</td>
                                    <td>{item.kode_item}</td>
                                    <td>{item.nama_item}</td>
                                    <td></td>
                                    <td>{item.jumlah}</td>
                                    <td>{item.harga}</td>
                                    <td>{parseInt(item.jumlah) * parseInt(item.harga)}</td>
                                </tr>
                            );
                        });
                    }

                    $('#table-data').DataTable().destroy();

                    this.setState({ htmlTableDaftarDetailOrder: htmlTableDaftarDetailOrder }, () => {
                        $('#table-data').DataTable();
                    });
                }).catch(error => {
                    console.log(error);
                });
            });
        } else {
            $('#table-data').DataTable().destroy();

            this.setState({
                htmlTableDaftarDetailOrder: [],
                valueKodeSupplier: '',
                valueNamaSupplier: '',
                valueTanggalOrder: ''
            }, () => {
                $('#table-data').DataTable();
            });
        }
    }

    render() {

        const {
            dataSelectKodeOrder,
            valueKodePenerimaan,
            valueKodeSupplier,
            valueNamaSupplier,
            valueTanggal,
            valueTanggalOrder
        } = this.state;

        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Penerimaan Barang</p>
                    <p className={style.pathname}>Transaksi / Pembelian / Penerimaan Barang</p>
                </div>
                <div className={style.content}>
                    <div className={`col-12 col-md-6 pe-md-2 pb-2 pb-md-0`}>
                        <div className={`${global.card}`}>
                            <p className={global.title}>Input Penerimaan Barang</p>
                            {/* <div className={`${global.input_group} col-4 pe-2`}>
                                <p className={global.title}>Jenis Pembelian</p>
                                <Select isClearable={true} isSearchable={true} options={[
                                    { value: 'Bahan', label: 'Bahan' },
                                    { value: 'Alat', label: 'Alat' }
                                ]} placeholder={'Select Pembelian...'} styles={CustomSelect} onChange={(value) => this.SelectPembelian(value)} />
                            </div> */}
                            <div className={`d-flex`}>
                                <div className={`${global.input_group} col-6 pe-2`}>
                                    <p className={global.title}>Kode Penerimaan</p>
                                    <input type="text" id='valueKodePenerimaan' value={valueKodePenerimaan} readOnly />
                                </div>
                                <div className={`${global.input_group} col-6 ps-2`}>
                                    <p className={global.title}>Tanggal Terima</p>
                                    <input type="date" id='valueTanggal' value={valueTanggal} onChange={this.InputChange} />
                                </div>
                            </div>
                            <div className={`d-flex`}>
                                <div className={`${global.input_group} col-3 px-2`}>
                                    <p className={global.title}>Kode Order</p>
                                    <Select isClearable={true} isSearchable={true} options={dataSelectKodeOrder} placeholder={'Select Pembelian...'} styles={CustomSelect} onChange={(value) => this.SelectKodeOrder(value)} />
                                </div>
                                <div className={`${global.input_group} col-5 ps-2`}>
                                    <p className={global.title}>Tanggal Order</p>
                                    <input type="text" id='valueTanggalOrder' value={valueTanggalOrder} readOnly />
                                </div>
                            </div>
                            <div className={`d-flex`}>
                                <div className={`${global.input_group} col-3 px-2`}>
                                    <p className={global.title}>Kode Supplier</p>
                                    <input type="text" id='valueKodeSupplier' value={valueKodeSupplier} readOnly />
                                </div>
                                <div className={`${global.input_group} col-5 ps-2`}>
                                    <p className={global.title}>Nama Supplier</p>
                                    <input type="text" id='valueNamaSupplier' value={valueNamaSupplier} readOnly />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`col-12 col-md-6 ps-md-2 pt-2 pt-md-0`}>
                        <div className={global.card}>
                            <div className={`${global.header}`}>
                                <p className={global.title}>Daftar Pembelian</p>
                            </div>
                            <div className={`table-responsive`}>
                                <table id='table-data' className={`table w-100`}>
                                    <thead>
                                        <tr>
                                            <td>No.</td>
                                            <td>Kode Alat/Bahan</td>
                                            <td>Nama Alat/Bahan</td>
                                            <td>Satuan</td>
                                            <td>Jumlah</td>
                                            <td>Harga</td>
                                            <td>Total Harga</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.htmlTableDaftarDetailOrder}
                                    </tbody>
                                </table>
                            </div>
                            <div className={`d-flex flex-column gap-2 pb-2`}>
                                <div className={`align-items-center ${global.input_group_row}`}>
                                    <p className={`${global.title} col-3`}>Total Barang</p>
                                    <input type="text" id='input-detail-total-pembelian' name='input-detail-total-pembelian' className={`col-3`} onInput={InputFormatNumber} />
                                </div>
                            </div>
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
                </div>
            </>
        )
    }
}
export default penerimaan_barang