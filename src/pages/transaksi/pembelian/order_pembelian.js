import React, { Component } from 'react'

// Import Library
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md'
import Select from 'react-select';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/pembelian/order_pembelian.module.css';

const CustomSelect = {
    control: (provided, state) => ({
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
        backgroundColor: 'rgba(0, 0, 0, 1)',
        fontSize: 12,
        position: 'absolute',
        width: '100%',
        zIndex: 1
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)',
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
    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Order Pembelian</p>
                    <p className={style.pathname}>Transaksi / Pembelian / Order Pembelian</p>
                </div>
                <div className={style.content}>
                    <div className={global.card}>
                        <p className={global.title}>Input Order Pembelian</p>
                        <div className={`${bootstrap['d-flex']}`}>
                            <div className={`${global.input_group} ${bootstrap['col-6']} ${bootstrap['pe-2']}`}>
                                <p className={global.title}>Kode Order</p>
                                <input type="text" id='input-kode-order' name='input-kode-order' readOnly />
                            </div>
                            <div className={`${global.input_group} ${bootstrap['col-6']} ${bootstrap['ps-2']}`}>
                                <p className={global.title}>Tanggal</p>
                                <input type="date" id='input-tanggal-order' name='input-tanggal-order' />
                            </div>
                        </div>
                        <div className={`${bootstrap['d-flex']}`}>
                            <div className={`${global.input_group} ${bootstrap['col-4']} ${bootstrap['pe-2']}`}>
                                <p className={global.title}>Jenis Pembelian</p>
                                <Select isClearable={true} isSearchable={true} options={[
                                    { value: 'Bahan', label: 'Bahan' },
                                    { value: 'Alat', label: 'Alat' }
                                ]} placeholder={'Select Pembelian...'} styles={CustomSelect} />
                            </div>
                            <div className={`${global.input_group} ${bootstrap['col-3']} ${bootstrap['px-2']}`}>
                                <p className={global.title}>Kode Supplier</p>
                                <input type="text" id='input-kode-supplier' name='input-kode-supplier' />
                            </div>
                            <div className={`${global.input_group} ${bootstrap['col-5']} ${bootstrap['ps-2']}`}>
                                <p className={global.title}>Nama Supplier</p>
                                <input type="text" id='input-nama-supplier' name='input-nama-supplier' />
                            </div>
                        </div>
                        <div className={`${bootstrap['d-flex']}`}>
                            <div className={`${global.input_group} ${bootstrap['col-5']} ${bootstrap['pe-2']}`}>
                                <p className={global.title}>Kode Barang</p>
                                <Select id='select-kode-barang' name='select-kode-barang' isClearable={true} isSearchable={true} options={[
                                    { value: 'BB0001', label: 'BB0001' },
                                    { value: 'BP0001', label: 'BP0001' },
                                    { value: 'ALAT0001', label: 'ALAT0001' }
                                ]} placeholder={'Select Kode...'} styles={CustomSelect} />
                            </div>
                            <div className={`${global.input_group} ${bootstrap['col-7']} ${bootstrap['pe-2']}`}>
                                <p className={global.title}>Nama Barang</p>
                                <input type="text" id='input-nama-barang' name='input-nama-barang' placeholder='Nama Barang...' />
                            </div>
                        </div>
                        <div className={`${bootstrap['d-flex']}`}>
                            <div className={`${global.input_group} ${bootstrap['col-4']} ${bootstrap['pe-2']}`}>
                                <p className={global.title}>Jumlah</p>
                                <input type="text" id='input-jumlah-beli' name='input-jumlah-beli' readOnly />
                            </div>
                            <div className={`${global.input_group} ${bootstrap['col-4']} ${bootstrap['px-2']}`}>
                                <p className={global.title}>Harga</p>
                                <input type="text" id='input-harga-beli' name='input-harga-beli' />
                            </div>
                            <div className={`${global.input_group} ${bootstrap['col-4']} ${bootstrap['ps-2']}`}>
                                <p className={global.title}>Total Harga</p>
                                <input type="text" id='input-total-harga-beli' name='input-total-harga-beli' />
                            </div>
                        </div>
                        <button type='button' className={global.button}><MdAdd /> Tambah</button>
                    </div>
                    <div className={global.card}></div>
                </div>
            </>
        )
    }
}
export default order_pembelian