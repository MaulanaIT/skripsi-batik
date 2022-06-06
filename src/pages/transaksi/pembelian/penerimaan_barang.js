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
        dataOrder: [],

        dataSelectKodeOrder: [],

        valueKodePenerimaan: null,
        valueTanggal: moment().format('YYYY-MM-DD'),

        jenisPembelian: '',
    }

    async componentDidMount() {
        await this.GetOrder();
        await this.GetPenerimaanBarang();
    }

    GetOrder = async () => {
        axios.get(`${baseURL}/api/transaksi/pembelian/order/select.php`, config).then(response => {
            ShowLoading();
            let dataOrder = response.data.data;

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
                HideLoading();
            });
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }


    render() {

        const {
            valueJenisPembelian,
            valueKodeOrder,
            valueKodePenerimaan,
            valueTanggal
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
                            <div className={`${global.input_group} col-4 pe-2`}>
                                <p className={global.title}>Jenis Pembelian</p>
                                <input type="text" id='valueJenisPembelian' value={valueJenisPembelian} readOnly />
                            </div>
                            <div className={`d-flex`}>
                                <div className={`${global.input_group} col-6 pe-2`}>
                                    <p className={global.title}>Kode Penerimaan</p>
                                    <input type="text" id='valueKodePenerimaan' value={valueKodePenerimaan} readOnly />
                                </div>
                                <div className={`${global.input_group} col-6 ps-2`}>
                                    <p className={global.title}>Tanggal Terima</p>
                                    <input type="date" id='valueTanggal' value={valueTanggal} />
                                </div>
                            </div>
                            <div className={`d-flex`}>
                                <div className={`${global.input_group} col-3 px-2`}>
                                    <p className={global.title}>Kode Order</p>
                                    <input type="text" id='valueKodeOrder' value={valueKodeOrder} readOnly />
                                </div>
                                <div className={`${global.input_group} col-5 ps-2`}>
                                    <p className={global.title}>Tanggal Order</p>
                                    <input type="text" id='input-tanggal-order' name='input-tanggal-order' readOnly />
                                </div>
                            </div>
                            <div className={`d-flex`}>
                                <div className={`${global.input_group} col-3 px-2`}>
                                    <p className={global.title}>Kode Supplier</p>
                                    <input type="text" id='input-kode-supplier' name='input-kode-supplier' readOnly />
                                </div>
                                <div className={`${global.input_group} col-5 ps-2`}>
                                    <p className={global.title}>Nama Supplier</p>
                                    <input type="text" id='input-nama-supplier' name='input-nama-supplier' maxLength={10} readOnly />
                                </div>
                            </div>
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
                                                        <td>Kode Bahan</td>
                                                        <td>Nama Bahan</td>
                                                        <td>Satuan</td>
                                                        <td>Jumlah</td>
                                                        <td>Harga</td>
                                                        <td>Total Harga</td>
                                                    </tr>
                                                </thead>
                                                <tbody></tbody>
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
                                                        <td>Kode Alat</td>
                                                        <td>Nama Alat</td>
                                                        <td>Satuan</td>
                                                        <td>Jumlah</td>
                                                        <td>Harga</td>
                                                        <td>Total Harga</td>
                                                    </tr>
                                                </thead>
                                                <tbody></tbody>
                                            </table>
                                        </div>
                                    </>
                                }
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
                        : null}
                </div>
            </>
        )
    }
}
export default penerimaan_barang