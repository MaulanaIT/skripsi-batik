import React, { Component } from 'react'

// Import Library
import { FiXCircle } from 'react-icons/fi';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/produksi/daftar_produksi.module.css';

const CloseDetail = () => {
    document.getElementById('detail_pesanan').classList.add('d-none');
}

export class detail_pesanan extends Component {
    render() {
        return (
            <>
                <div id='detail_pesanan' className={`${global.popup_detail} d-none`}>
                    <FiXCircle className={global.toggle} onClick={CloseDetail} />
                <div className={style.content}>
                    <div className={global.card_detail}>
                        <p className={global.title}>Detail Pesanan</p>
                            <div className='d-flex'>
                                <div className={`${global.input_group} col-6 px-2`}>
                                    <p className={global.title}>Tanggal <span className={global.important}>*</span></p>
                                    <input type="date" id='input-tanggal-pesan' name='input-tanggal-pesan' readOnly={true}/>
                                </div>
                                <div className={`${global.input_group} col-6 pe-2`}>
                                    <p className={global.title}>Kode Pesanan <span className={global.important}>*</span></p>
                                    <input type="text" id='input-kode-pesan' name='input-pesan' readOnly={true} />
                                </div>
                            </div>
                            <div className='d-flex'>
                                <div className={`${global.input_group} col-12 px-2`}>
                                    <p className={global.title}>Nama Pesanan <span className={global.important}>*</span></p>
                                    <input type="text" id='input-nama-pesanan' name='input-nama-pesanan' readOnly={true}/>
                                </div>
                            </div>
                            <div className='d-flex'>
                                <div className={`${global.input_group} col-4 px-2`}>
                                    <p className={global.title}>Kode Customer <span className={global.important}>*</span></p>
                                    <input type="text" id='input-kode-customer' name='input-kode-customer' readOnly={true}/>
                                </div>
                                <div className={`${global.input_group} col-4 px-2`}>
                                    <p className={global.title}>Nama Customer <span className={global.important}>*</span></p>
                                    <input type="text" id='input-nama-customer' name='input-nama-customer' readOnly={true}/>
                                </div>
                                <div className={`${global.input_group} col-4 px-2`}>
                                    <p className={global.title}>Jumlah <span className={global.important}>*</span></p>
                                    <input type="text" id='input-jumlah' name='input-jumlah' readOnly={true}/>
                                </div>
                            </div>
                            <div className='d-flex'>
                                <div className={`${global.input_group} col-4 px-2`}>
                                    <p className={global.title}>HPP <span className={global.important}>*</span></p>
                                    <input type="text" id='input-hpp' name='input-hpp' readOnly={true}/>
                                </div>
                                <div className={`${global.input_group} col-4 px-2`}>
                                    <p className={global.title}>Profit <span className={global.important}>*</span></p>
                                    <input type="text" id='input-profit' name='input-profit' readOnly={true}/>
                                </div>
                                <div className={`${global.input_group} col-4 px-2`}>
                                    <p className={global.title}>Harga Jual <span className={global.important}>*</span></p>
                                    <input type="text" id='input-harga-jual' name='input-harga-jual' readOnly={true}/>
                                </div>
                            </div>
                            <div className='d-flex'>
                                <div className={`${global.input_group} col-12 px-2`}>
                                    <p className={global.title}>Catatan Pesanan <span className={global.important}>*</span></p>
                                    <input type="text" id='input-catatan-pesanan' name='input-catatan-pesanan' readOnly={true}/>
                                </div>
                            </div>
                    </div>
                </div>
                </div>
            </>
        )
    }
}

export default detail_pesanan