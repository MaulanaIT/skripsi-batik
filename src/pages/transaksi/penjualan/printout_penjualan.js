// Import Library
import React from 'react';
import { cx, SetNumberFormat, SetPriceFormat } from '../../../component/helper';

// Import Assets
import Logo from '../../../assets/images/logo.jpg';

// Import CSS
import style from '../../../css/printout.module.css';

export default function Printout_penjualan({ bayar, data, diskon, jenis, ongkosKirim, kembalian, tanggal, totalJual, uangMuka = 0 }) {
    return (
        <div className={cx([style.container, 'print'])} style={{ maxWidth: 600 }}>
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
                </div>
                <div style={{ borderBottom: '1px dashed black', borderTop: '1px dashed black', height: 8, marginBottom: 24, marginTop: 24, width: '100%' }}></div>
                <table className={cx([style.table, 'table', 'table-bordered', 'w-100'])}>
                    <thead>
                        <tr className='text-center'>
                            <td>Nama Produk/Pesanan</td>
                            <td>Jumlah</td>
                            <td>Harga</td>
                            <td>Total</td>
                        </tr>
                    </thead>
                    <tbody>
                        {(jenis === 'pesanan' && data.kode) ?
                            <tr key={0}>
                                <td>{data.nama}</td>
                                <td>{SetNumberFormat(data.jumlah)}</td>
                                <td>{SetPriceFormat(+data.total_harga / +data.jumlah)}</td>
                                <td>{SetPriceFormat(data.total_harga)}</td>
                            </tr>
                            :
                            (data && data.length > 0) && data.map((item, index) =>
                                <tr key={index}>
                                    <td>{item.nama_item}</td>
                                    <td>{SetNumberFormat(item.jumlah)}</td>
                                    <td>{SetPriceFormat(item.harga)}</td>
                                    <td>{SetPriceFormat(item.total_harga)}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <div style={{ borderTop: '1px dashed black', marginBottom: 24, marginTop: 24, width: '100%' }}></div>
                <div className='d-flex justify-content-between py-2'>
                    <p>Pembelian</p>
                    <p>{SetPriceFormat(totalJual)}</p>
                </div>
                <div className='d-flex justify-content-between py-2'>
                    <p>Diskon</p>
                    <p>{SetPriceFormat(diskon)}</p>
                </div>
                {jenis === 'tunai' &&
                    <React.Fragment>
                        <div className='d-flex justify-content-between py-2'>
                            <p>Ongkos Kirim</p>
                            <p>{SetPriceFormat(ongkosKirim)}</p>
                        </div>
                        <div className='d-flex justify-content-between py-2'>
                            <p>Pembayaran</p>
                            <p>{SetPriceFormat(bayar)}</p>
                        </div>
                        <div className='d-flex justify-content-between py-2'>
                            <p>Kembalian</p>
                            <p>{SetPriceFormat(kembalian)}</p>
                        </div>
                    </React.Fragment>
                }
                {jenis === 'pesanan' &&
                    <React.Fragment>
                        <div className='d-flex justify-content-between py-2'>
                            <p>Uang Muka</p>
                            <p>{SetPriceFormat(uangMuka)}</p>
                        </div>
                        <div className='d-flex justify-content-between py-2'>
                            <p>Pembayaran</p>
                            <p>{SetPriceFormat(bayar)}</p>
                        </div>
                        <div className='d-flex justify-content-between py-2'>
                            <p>Kembalian</p>
                            <p>{SetPriceFormat(kembalian)}</p>
                        </div>
                    </React.Fragment>
                }
                <div className='align-items-center d-flex gap-2'>
                    <div style={{ borderTop: '1px dashed black', borderBottom: '1px dashed black', height: 8, marginBottom: 24, marginTop: 24, width: '100%' }}></div>
                    <div className='text-nowrap'>{tanggal}</div>
                    <div style={{ borderTop: '1px dashed black', borderBottom: '1px dashed black', height: 8, marginBottom: 24, marginTop: 24, width: '100%' }}></div>
                </div>
                <div style={{ borderTop: '1px dashed black', marginBottom: 24, marginTop: 24, width: '100%' }}></div>
                <p className='text-center'>Terima Kasih Telah Berbelanja Barang yang sudah dibeli tidak dapat dikembalikan</p>
                <div style={{ borderTop: '1px dashed black', marginBottom: 24, marginTop: 24, width: '100%' }}></div>
            </div>
        </div>
    )
}
