// Import Library
import React from 'react';
import { cx, SetNumberFormat, SetPriceFormat } from '../../../component/helper';

// Import Assets
import Logo from '../../../assets/images/logo.jpg';

// Import CSS
import style from '../../../css/printout.module.css';

export default function Printout_order({ data, dataDetail }) {
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
                <p className={style.title}>SURAT ORDER PEMBELIAN</p>
                <div className={style.date}>
                    <p>Kepada Yth. {data.nama_supplier} <br />{data.alamat_supplier}</p>
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
                            <td colSpan={4}>Jumlah</td>
                            <td>{SetPriceFormat(data.total_harga)}</td>
                        </tr>
                    </tfoot>
                </table>
                <div className={style.signature}>
                    <div className={style.sign}>
                        <p>Hormat Kami,</p>
                        <p>Gudang & Pembelian</p>
                        <br /><br />
                        <p>(_______________________)</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
