import React, { Component } from 'react'

// Import Library
import $ from 'jquery';
import { MdAdd } from 'react-icons/md';
import Select from 'react-select';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/produksi/produksi.module.css';

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
        color: 'rgba(255, 255, 255, 0.6)',
        whiteSpace: 'nowrap'
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: 'white',
        fontSize: 12
    })
}

export class produksi extends Component {

    state = {
        pilihProduksi: '',
    }

    componentDidMount() {
        $('#table-data').DataTable();
    }

    SelectProduksi = (value) => {
        this.setState({ pilihProduksi: value ? value.value : '' });
    }

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Produksi</p>
                    <p className={style.pathname}>Transaksi / Produksi / Produksi</p>
                </div>
                <div className={style.content}>
                    <div className={`col-12 col-md-6 pe-md-2 pb-2 pb-md-0`}>
                        <div className={`${global.card}`}>
                            <div className={`${global.header}`}>
                                <p className={global.title}>Input Produksi</p>
                            </div>
                            <div className={global.input_group}>
                                <p className={global.title}>Pilih Produksi</p>
                                <Select isClearable={true} isSearchable={true} options={[
                                    { value: 'Stok', label: 'Stok' },
                                    { value: 'Pesanan', label: 'Pesanan' }
                                ]} placeholder={'Select Produksi...'} styles={CustomSelect} onChange={(value) => this.SelectProduksi(value)} />
                            </div>
                            {this.state.pilihProduksi === 'Pesanan' ?
                                <>
                                    <div className={`${bootstrap['d-flex']}`}>
                                        <div className={`${global.input_group} col-5 pe-2`}>
                                            <p className={global.title}>Kode Pesanan</p>
                                            <Select id='select-kode-pesanan' name='select-kode-pesanan' isClearable={true} isSearchable={true} options={[
                                                { value: 'PSN0001', label: 'PSN0001' },
                                                { value: 'PSN0001', label: 'PSN0001' }
                                            ]} placeholder={'Select Kode...'} styles={CustomSelect} />
                                        </div>
                                        <div className={`${global.input_group} col-6 ps-2`}>
                                            <p className={global.title}>Tanggal Pesan</p>
                                            <input type="date" id='input-tanggal-jual' name='input-tanggal-jual' readOnly />
                                        </div>
                                    </div>
                                    <div className={`${bootstrap['d-flex']}`}>
                                        <div className={`${global.input_group} col-6 pe-2`}>
                                            <p className={global.title}>Kode Produksi</p>
                                            <input type="text" id='input-kode-produksi' name='input-kode-produksi' readOnly />
                                        </div>
                                        <div className={`${global.input_group} col-6 ps-2`}>
                                            <p className={global.title}>Tanggal Produksi</p>
                                            <input type="date" id='input-tanggal-produksi' name='input-tanggal-produksi'/>
                                        </div>
                                        <div className={`${global.input_group} col-6 ps-2`}>
                                            <p className={global.title}>Nama Customer</p>
                                            <input type="date" id='input-nama-customer' name='input-nama-customer' readOnly />
                                        </div>
                                        <div className={`${global.input_group} col-6 ps-2`}>
                                            <p className={global.title}>Nama Pesanan</p>
                                            <input type="date" id='input-nama-pesanan' name='input-nama-pesanan' readOnly />
                                        </div>
                                        <div className={`${global.input_group} col-6 ps-2`}>
                                            <p className={global.title}>Jumlah</p>
                                            <input type="date" id='input-jumlah' name='input-jumlah' readOnly />
                                        </div>
                                        <div className={`${global.input_group} col-6 ps-2`}>
                                            <p className={global.title}>Lama Produksi</p>
                                            <input type="date" id='input-lama-produksi' name='input-lama-produksi' />
                                        </div>
                                        <div className={`${global.input_group} col-6 ps-2`}>
                                            <p className={global.title}>Deskripsi</p>
                                            <input type="date" id='input-deskripsi' name='input-deskripsi' />
                                        </div>
                                        <div className={`${global.input_group} col-5 pe-2`}>
                                            <p className={global.title}>Status</p>
                                            <Select id='select-status' name='select-status' isClearable={true} isSearchable={true} options={[
                                                { value: 'Proses', label: 'Proses' },
                                                { value: 'Selesai', label: 'Selesai' }
                                            ]} placeholder={'Select Status...'} styles={CustomSelect} />
                                        </div>
                                    </div>
                                    <button type='button' className={global.button}><MdAdd /> Tambah</button>
                                </>
                                : null}
                        </div>
                    </div>
                    {this.state.jenisTransaksi === 'Stok' ?
                    <>
                        <div className={`${bootstrap['d-flex']}`}>
                                        <div className={`${global.input_group} col-5 pe-2`}>
                                            <p className={global.title}>Kode Permintaan</p>
                                            <Select id='select-kode-pesanan' name='select-kode-pesanan' isClearable={true} isSearchable={true} options={[
                                                { value: 'PP0001', label: 'PP0001' },
                                                { value: 'PP0002', label: 'PP0002' }
                                            ]} placeholder={'Select Kode...'} styles={CustomSelect} />
                                        </div>
                                        <div className={`${bootstrap['d-flex']}`}>
                                        <div className={`${global.input_group} col-6 pe-2`}>
                                            <p className={global.title}>Kode Produksi</p>
                                            <input type="text" id='input-kode-produksi' name='input-kode-produksi' readOnly />
                                        </div>
                                        <div className={`${global.input_group} col-6 ps-2`}>
                                            <p className={global.title}>Tanggal Produksi</p>
                                            <input type="date" id='input-tanggal-produksi' name='input-tanggal-produksi'/>
                                        </div>
                                        <div className={`${global.input_group} col-6 ps-2`}>
                                            <p className={global.title}>Nama Customer</p>
                                            <input type="date" id='input-nama-customer' name='input-nama-customer' readOnly />
                                        </div>
                                        <div className={`${global.input_group} col-6 ps-2`}>
                                            <p className={global.title}>Nama Pesanan</p>
                                            <input type="date" id='input-nama-pesanan' name='input-nama-pesanan' readOnly />
                                        </div>
                                        <div className={`${global.input_group} col-6 ps-2`}>
                                            <p className={global.title}>Jumlah</p>
                                            <input type="date" id='input-jumlah' name='input-jumlah' readOnly />
                                        </div>
                                        <div className={`${global.input_group} col-6 ps-2`}>
                                            <p className={global.title}>Lama Produksi</p>
                                            <input type="date" id='input-lama-produksi' name='input-lama-produksi' />
                                        </div>
                                        <div className={`${global.input_group} col-6 ps-2`}>
                                            <p className={global.title}>Deskripsi</p>
                                            <input type="date" id='input-deskripsi' name='input-deskripsi' />
                                        </div>
                                        <div className={`${global.input_group} col-5 pe-2`}>
                                            <p className={global.title}>Status</p>
                                            <Select id='select-status' name='select-status' isClearable={true} isSearchable={true} options={[
                                                { value: 'Proses', label: 'Proses' },
                                                { value: 'Selesai', label: 'Selesai' }
                                            ]} placeholder={'Select Status...'} styles={CustomSelect} />
                                        </div>
                                    </div>
                                    <button type='button' className={global.button}><MdAdd /> Tambah</button>

                                    </div>
                                        </>
                                        :
                                        <>
                                        </>
                                    }
                                </div>
            </>
        )
    }
}

export default produksi