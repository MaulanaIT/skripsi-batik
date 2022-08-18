import axios from 'axios';
import React, { Component, useEffect, useState } from 'react'

// Import Library
import { FiXCircle } from 'react-icons/fi';
import { baseURL, config, SetNumberFormat, SetPriceFormat } from '../../../component/helper';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/produksi/daftar_produksi.module.css';

export default function Detail_pesanan({ kode }) {

    const [getDataDetailPesanan, setDataDetailPesanan] = useState([]);

    useEffect(() => {
        axios.get(`${baseURL}/api/transaksi/penjualan/estimasi-pesanan/select.php`, config).then(response => {
            let data = response.data.data.find(item => item.kode === kode);

            setDataDetailPesanan(data);
        }).catch(error => {
            console.log(error);
        });
    }, [kode]);

    const CloseDetail = () => {
        document.getElementById('detail-pesanan').classList.add('d-none');
    }

    return (
        <div id='detail-pesanan' className={`${global.popup_detail} d-none`}>
            <FiXCircle className={global.toggle} onClick={CloseDetail} />
            <div className={style.content}>
                <div className={global.card_detail}>
                    <p className={global.title}>Detail Pesanan</p>
                    <div className='d-flex'>
                        <div className={`${global.input_group} col-6 px-2`}>
                            <p className={global.title}>Tanggal</p>
                            <input type="text" id='input-tanggal-pesan' name='input-tanggal-pesan' value={getDataDetailPesanan?.tanggal} readOnly={true} />
                        </div>
                        <div className={`${global.input_group} col-6 pe-2`}>
                            <p className={global.title}>Kode Pesanan</p>
                            <input type="text" id='input-kode-pesan' name='input-pesan' value={getDataDetailPesanan?.tanggal} readOnly={true} />
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div className={`${global.input_group} col-12 px-2`}>
                            <p className={global.title}>Nama Pesanan</p>
                            <input type="text" id='input-nama-pesanan' name='input-nama-pesanan' value={getDataDetailPesanan?.nama} readOnly={true} />
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div className={`${global.input_group} col-4 px-2`}>
                            <p className={global.title}>Kode Customer</p>
                            <input type="text" id='input-kode-customer' name='input-kode-customer' value={getDataDetailPesanan?.kode_customer} readOnly={true} />
                        </div>
                        <div className={`${global.input_group} col-4 px-2`}>
                            <p className={global.title}>Nama Customer</p>
                            <input type="text" id='input-nama-customer' name='input-nama-customer' value={getDataDetailPesanan?.nama_customer} readOnly={true} />
                        </div>
                        <div className={`${global.input_group} col-4 px-2`}>
                            <p className={global.title}>Jumlah</p>
                            <input type="text" id='input-jumlah' name='input-jumlah' value={SetNumberFormat(getDataDetailPesanan?.jumlah)} readOnly={true} />
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div className={`${global.input_group} col-4 px-2`}>
                            <p className={global.title}>HPP</p>
                            <input type="text" id='input-hpp' name='input-hpp' value={SetPriceFormat(getDataDetailPesanan?.hpp)} readOnly={true} />
                        </div>
                        <div className={`${global.input_group} col-4 px-2`}>
                            <p className={global.title}>Profit</p>
                            <input type="text" id='input-profit' name='input-profit' value={`${SetNumberFormat(getDataDetailPesanan?.profit)}%`} readOnly={true} />
                        </div>
                        <div className={`${global.input_group} col-4 px-2`}>
                            <p className={global.title}>Harga Jual</p>
                            <input type="text" id='input-harga-jual' name='input-harga-jual' value={SetPriceFormat(getDataDetailPesanan?.harga_jual)} readOnly={true} />
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div className={`${global.input_group} col-12 px-2`}>
                            <p className={global.title}>Catatan Pesanan</p>
                            <input type="text" id='input-catatan-pesanan' name='input-catatan-pesanan' value={getDataDetailPesanan?.deskripsi} readOnly={true} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}