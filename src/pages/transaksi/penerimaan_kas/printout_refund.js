// Import Library
import React from 'react';
import { cx, SetNumberFormat, SetPriceFormat } from '../../../component/helper';

// Import Assets
import Logo from '../../../assets/images/logo.jpg';

// Import CSS
import style from '../../../css/printout.module.css';

export default function Printout_refund({ data }) {
    return (
        <div className={cx([style.container, 'print'])}>
            <div className={style.box}>
                <div className={style.header}>
                    <div className={style.company}>
                        <img src={Logo} alt="Logo" height={96} width={96} />
                        <div className={style.description}>
                            <p className={style.title}>Leksana Batik Jaya</p>
                            <p className={style.detail}>Jl. Nusa Jaya RT.01/RW.01, Kutawaru</p>
                            <p className={style.detail}>CILACAP 53225</p>
                            <p className={style.detail}>Telp. 0838-xxxx-xxxx</p>
                        </div>
                    </div>
                    <p className={style.code}>{data.kode}</p>
                </div>
                <p className={style.title}>BUKTI PENGEMBALIAN DANA</p>
                <div className={style.date}>
                    <p>
                        Kode Supplier : {data.kode_supplier} <br />
                        Nama Supplier : {data.nama_supplier} <br />
                        Alamat Supplier : {data.alamat_supplier}
                    </p>
                    <p>Tanggal : {data.tanggal}</p>
                </div>
                <p>Telah diterima Pengembalian Dana atas transaksi Retur Pembelian senilai {SetPriceFormat(data.total_harga)}</p>
                <div className={style.signature}>
                    <div className={style.sign}>
                        <p>Validasi,</p>
                        <p>Admin & Keuangan</p>
                        <br /><br />
                        <p>(_______________________)</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
