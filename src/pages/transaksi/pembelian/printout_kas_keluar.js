// Import Library
import React from 'react';
import { cx, SetNumberFormat, SetPriceFormat } from '../../../component/helper';

// Import Assets
import Logo from '../../../assets/images/logo.jpg';

// Import CSS
import style from '../../../css/printout.module.css';

export default function Printout_kas_keluar({ data, dataDetail, diskon, ongkosKirim, total, totalJual }) {
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
                <p className={style.title}>BUKTI TRANSAKSI PEMBELIAN</p>
                <div className={style.date}>
                    <p>
                        Kode Supplier : {data.kode_supplier} <br />
                        Nama Supplier : {data.nama_supplier} <br />
                        Alamat Supplier : {data.alamat_supplier}
                    </p>
                    <p>Tanggal : {data.tanggal}</p>
                </div>
                <table className={cx([style.table, 'table', 'table-bordered', 'w-100'])}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Barang</th>
                            <th>Jumlah Beli</th>
                            <th>Harga</th>
                            <th>Total Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(dataDetail && dataDetail.length > 0) && dataDetail.map((item, index) =>
                            <tr key={index}>
                                <td>{index + 1}.</td>
                                <td>{item.nama_item}</td>
                                <td>{SetNumberFormat(item.jumlah)}</td>
                                <td>{SetPriceFormat(item.harga)}</td>
                                <td>{SetPriceFormat(item.total_harga)}</td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3} rowSpan={4}></td>
                            <td>Jumlah</td>
                            <td>{SetPriceFormat(total)}</td>
                        </tr>
                        <tr>
                            <td>Diskon</td>
                            <td>{SetPriceFormat(diskon)}</td>
                        </tr>
                        <tr>
                            <td>Ongkos Kirim</td>
                            <td>{SetPriceFormat(ongkosKirim)}</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>{SetPriceFormat(totalJual)}</td>
                        </tr>
                    </tfoot>
                </table>
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
