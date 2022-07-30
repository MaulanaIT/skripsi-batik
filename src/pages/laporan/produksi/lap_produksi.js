import React, { Component } from 'react';

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

export class laporan_produksi extends Component {

    render() {
        return (
            <>
                <div className={style.header}>
                    <p className={style.title}>Laporan Produksi</p>
                    <p className={style.pathname}>Laporan / Laporan Produksi / Laporan Produksi </p>
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
                            <div className={`${global.input_group_row} col-4 `}>
                            <p className={`${global.title} col-6`}>Tanggal</p>
                            <div>
                                <input type="date" className={global.input1} id='input-tanggal-awal' name='input-tanggal-awal' />
                            </div>
                            <div>
                                <p className={`${global.title} col-auto px-3`}>sampai</p>
                            </div>
                            <div>
                                <input type="date" className={global.input1} id='input-tanggal-akhir' name='input-tanggal-akhir' />
                            </div>
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
                            <p className={`${style.title} text-center w-100 fw-bold`}>LAPORAN PRODUKSI</p>
                            <div className={`d-flex`}>
                                <div className={`${global.input_group_row} col-6`}>
                                    <p className={`${global.title} col-12 col-lg-3 col-md-3 pb-2 pb-md-0`}>Produksi</p>
                                    <input type="text" id='input-produksi' name='input-produksi' readOnly={true} />
                                </div>
                            </div>
                                <div className={`${bootstrap[`d-flex`]}`}>
                                    <div className={`${global.input_group_row} col-6`}>
                                        <p className={`${global.title} col-6 col-lg-3 col-md-3 pb-2 pb-md-0`}>Tanggal Produksi</p>
                                        <input type="date" id='input-tanggal-awal-produksi' name='input-tanggal-awal-produksi' readOnly={true} />
                                        <p className={`${global.title} col-1 ps-2`}>s/d</p>
                                        <input type="date" id='input-tanggal-akhir-produksi' name='input-tanggal-akhir-produksi' readOnly={true} />
                                    </div>
                                </div>
                            <br></br>
                            <div className={`table-responsive`}>
                                <table id='table-data' className={`table table-bordered table-striped table-hover w-100`}>
                                    <thead className="align-middle text-center text-nowrap">
                                        <tr>
                                            <th>No.</th>
                                            <th>Tanggal Produksi</th>
                                            <th>Kode Produksi</th>
                                            <th>Jumlah</th>
                                            <th>Lama Produksi</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default laporan_produksi
