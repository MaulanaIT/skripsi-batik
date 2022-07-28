import React, { Component } from 'react'

// Import Library
import { TiExport } from 'react-icons/ti';
import { AiFillPrinter } from 'react-icons/ai';

// Import CSS
import bootstrap from '../../../css/bootstrap.module.css';
import global from '../../../css/global.module.css';
import style from '../../../css/laporan/kas/penerimaan_kas.module.css';
import Select from 'react-select';

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

export class laporan_hpp extends Component {
    render() {
        return (
            <>
            <div className={style.header}>
                    <p className={style.title}>Laporan Harga Pokok Produksi</p>
                    <p className={style.pathname}>Laporan / Laporan Produksi / Laporan Harga Pokok Produksi </p>
                </div>
                <div className={style.content}>
                    <div className={global.card}>
                        
                    <div className={`d-flex`}>
                        <div className={`${global.input_group_row} col-8 `}>
                            <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Produksi Berdasarkan</p>
                                <Select className="col col-lg-4 col-md-3" isClearable={true} isSearchable={true} options={[
                                { value: 'Stok', label: 'Stok' },
                                { value: 'Pesanan', label: 'Pesanan' }
                                ]} placeholder={'Select Produksi...'} styles={CustomSelect} />
                        </div>
                    </div>

                        <div className={`d-flex`}>
                            <div className={`${global.input_group_row} col-4`}>
                                <p className={`${global.title} col-6`}>Kode Produksi</p>
                                <Select className="col col-lg-8 col-md-3" isClearable={true} isSearchable={true} options={[
                                { value: 'PP001', label: 'PP001' },
                                { value: 'PS001', label: 'PS001' }
                                ]} placeholder={'Select Produksi...'} styles={CustomSelect} />
                            </div>
                        </div>
                        
                        <div className='d-flex flex-column gap-2 pt-2'>
                            <div className='d-flex'>
                                <div className='col-6 pe-2'>
                                    <button type='button' className={`${global.button} w-100`}>Cek Laporan</button>
                                </div>
                                <div className='col-6 ps-2'>
                                    <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }}>Batal</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${global.card} col-12`}>
                        <div className='d-flex'>
                            <div className='col-10'>
                                <p className={global.title}></p>
                            </div>
                            <div className='col-1 ps-5'>
                                <TiExport className='fs-4' />
                            </div>
                            <div className='col-1 pe-5'>
                                <AiFillPrinter className='fs-4' />
                            </div>
                        </div>
                        <div className={global.card}>
                            <p className={`${style.title} text-center w-100 fw-bold`}>LEKSANA BATIK JAYA</p>
                            <p className={`${style.title} text-center w-100 fw-bold`}>LAPORAN HARGA POKOK PRODUKSI</p>
                            <div className={`d-flex`}>
                                <div className={`${global.input_group_row} col-6`}>
                                    <p className={`${global.title} col-6 col-lg-3 col-md-3 pb-2 pb-md-0`}>Kode Produksi</p>
                                    <input type="text" id='input-kode-produksi' name='input-kode-produksi' readOnly={true} className='col-lg-6' />
                                </div>
                                <div className={`${global.input_group_row} col-6`}>
                                    <p className={`${global.title} col-6 col-lg-3 col-md-3 pb-2 pb-md-0`}>Tanggal Pesan</p>
                                    <input type="date" id='input-tanggal-pesanan' name='input-tanggal-pesanan' readOnly={true} className='col-lg-6'/>
                                </div>
                            </div>
                                <div className={`${bootstrap[`d-flex`]}`}>
                                    <div className={`${global.input_group_row} col-6`}>
                                        <p className={`${global.title} col-6 col-lg-3 col-md-3 pb-2 pb-md-0`}>Kode Produk</p>
                                        <input type="text" id='input-kode-produk' name='input-kode-produk' readOnly={true} className='col-lg-6'/>
                                    </div>
                                    <div className={`${global.input_group_row} col-6`}>
                                        <p className={`${global.title} col-6 col-lg-3 col-md-3 pb-2 pb-md-0`}>Kode Pesanan</p>
                                        <input type="text" id='input-kode-pesanan' name='input-kode-pesanan' readOnly={true} className='col-lg-6'/>
                                    </div>
                                </div>
                                <div className={`${bootstrap[`d-flex`]}`}>
                                    <div className={`${global.input_group_row} col-6`}>
                                        <p className={`${global.title} col-6 col-lg-3 col-md-3 pb-2 pb-md-0`}>Nama Produk</p>
                                        <input type="text" id='input-nama-produk' name='input-nama-produk' readOnly={true} className='col-lg-6'/>
                                    </div>
                                    <div className={`${global.input_group_row} col-6`}>
                                        <p className={`${global.title} col-6 col-lg-3 col-md-3 pb-2 pb-md-0`}>Nama Pesanan</p>
                                        <input type="text" id='input-nama-pesanan' name='input-nama-pesanan' readOnly={true} className='col-lg-6'/>
                                    </div>
                                </div>
                                <div className={`${bootstrap[`d-flex`]}`}>
                                    <div className={`${global.input_group_row} col-6`}>
                                        <p className={`${global.title} col-6 col-lg-3 col-md-3 pb-2 pb-md-0`}>Jumlah Produksi</p>
                                        <input type="text" id='input-jumlah-produksi' name='input-jumlah-produksi' readOnly={true} className='col-lg-6' />
                                    </div>
                                </div>
                            <br></br>
                            <p className={`style.title fw-bold`}>Rincian Harga Pokok Produksi</p>
                    <div className={`${bootstrap['d-flex']}`}>
                        <div className={`${global.input_group} col-3 pe-2`}>
                            <p className={global.title}>Biaya Bahan Baku</p>
                            <input type="text" id='input-biaya-bahan-baku' name='input-biaya-bahan-baku' readOnly={true} />
                        </div>
                        <div className={`${global.input_group} col-3 pe-2`}>
                            <p className={global.title}>Biaya Tenaga Kerja</p>
                            <input type="text" id='input-biaya-tenaga-kerja' name='input-biaya-tenaga-kerja' readOnly={true} />
                        </div>
                        <div className={`${global.input_group} col-3 pe-2`}>
                            <p className={global.title}>Biaya Overhead</p>
                            <input type="text" id='input-biaya-overhead' name='input-biaya-overhead' readOnly={true} />
                        </div>
                    </div>
                    <div className={`${global.input_group} col-8 pe-2`}>
                        <div className={`d-flex`}>
                            <p className={`${global.title} col-3 style.title fw-bold`}>Harga Pokok Produksi</p>
                            <input type="text" id='input-harga-pokok-produksi' name='input-harga-pokok-produksi' className='col-6' readOnly={true} />
                        </div>
                    </div>
                    <div className={`${global.input_group} col-8 pe-2`}>
                        <div className='d-flex'>
                            <p className={`${global.title} col-3 style.title fw-bold`}>Jumlah Produksi</p>
                            <input type="text" id='input-jumlah-produksi' name='input-jumlah-produksi'className='col-6' readOnly={true} />
                        </div>
                    </div>
                    <div className={`${global.input_group} col-8 pe-2`}>
                        <div className='d-flex'>
                            <p className={`${global.title} col-3 style.title fw-bold`}>Harga Pokok Produk</p>
                            <input type="text" id='input-harga-pokok-produksi-unit' name='input-harga-pokok-produksi-unit' className='col-6' readOnly={true} />
                        </div>
                    </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default laporan_hpp