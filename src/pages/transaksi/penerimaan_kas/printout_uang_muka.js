// Import Library
import React from 'react';
import { cx, SetNumberFormat, SetPriceFormat } from '../../../component/helper';

// Import Assets
import Logo from '../../../assets/images/logo.jpg';

// Import CSS
import style from '../../../css/printout.module.css';

export default function Printout_uang_muka({ customer, kode, tanggal, uangMuka, totalHarga, namapesanan, jumlah }) {
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
                    <p className={style.code}>{kode}</p>
                </div>
                <p className={style.title}>KUITANSI UANG MUKA PESANAN
                </p>
                <div className={style.date}>
                    <table className='table w-80'>
                        <tbody>
                            <tr>
                                <td>Tanggal</td>
                                <td>:</td>
                                <td>{tanggal}</td>
                            </tr>
                            <tr>
                                <td>Sudah Diterima Dari</td>
                                <td>:</td>
                                <td>{customer}</td>
                            </tr>
                            <tr>
                                <td> Atas Pesanan</td>
                                <td>:</td>
                                <td>{namapesanan}</td>
                            </tr>
                            <tr>
                                <td>Jumlah Pesanan</td>
                                <td>:</td>
                                <td>{jumlah} pcs</td>
                            </tr>
                            <tr>
                                <td>Sebesar</td>
                                <td>:</td>
                                <td>{SetPriceFormat(uangMuka)}</td>
                            </tr>
                            <tr>
                                <td>Nilai Pesanan</td>
                                <td>:</td>
                                <td>{SetPriceFormat(totalHarga)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={style.signature}>
                    <div className={style.sign}>
                        <p>Hormat Kami,</p>
                        <p>Admin & Keuangan</p>
                        <br /><br />
                        <p>(_______________________)</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
