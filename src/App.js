import React, { Component } from 'react';

// Import Library
import { Navigate, Route, Routes } from 'react-router-dom';

// Import Component
import Dashboard from './pages/dashboard';
import Header from './component/header';
import Sidebar from './component/sidebar';

// Import Page - Format: MenuSubmenu
import TransaksiPenjualanTransaksiPenjualan from './pages/transaksi/penjualan/transaksi_penjualan';
import MasterAkun from './pages/master/akun';
import TransaksiPembelianOrderPembelian from './pages/transaksi/pembelian/order_pembelian';

// Import CSS
import style from './App.module.css';

// Import Javascript
import WOW from 'wowjs';

export class App extends Component {

    componentDidMount() {
        const wow = new WOW.WOW({
            live: false
        });

        wow.init();
    }

    render() {
        return (
            <div className={style.container}>
                <Header />
                <div className={style.container_content}>
                    <Sidebar />

                    <div className={style.content}>
                        <Routes>
                            <Route patg={'/'} element={<Navigate to={'/dashboard'} />} />
                            <Route path={'/dashboard'} element={<Dashboard />} />
                            <Route path={'/master/user'} element={<Dashboard />} />
                            <Route path={'/master/akun'} element={<MasterAkun />} />
                            <Route path={'/master/supplier'} element={<Dashboard />} />
                            <Route path={'/master/customer'} element={<Dashboard />} />
                            <Route path={'/master/consignee'} element={<Dashboard />} />
                            <Route path={'/master/inventory/bahan-baku'} element={<Dashboard />} />
                            <Route path={'/master/inventory/bahan-penolong'} element={<Dashboard />} />
                            <Route path={'/master/inventory/bahan-alat'} element={<Dashboard />} />
                            <Route path={'/master/tenaga-kerja'} element={<Dashboard />} />
                            <Route path={'/transaksi/penjualan/transaksi-penjualan'} element={<TransaksiPenjualanTransaksiPenjualan />} />
                            <Route path={'/transaksi/penjualan/perhitungan-harga'} element={<Dashboard />} />
                            <Route path={'/transaksi/pembelian/order-pembelian'} element={<TransaksiPembelianOrderPembelian />} />
                            <Route path={'/transaksi/pembelian/pengeluaran-kas'} element={<Dashboard />} />
                            <Route path={'/transaksi/pembelian/penerimaan-barang'} element={<Dashboard />} />
                            <Route path={'/transaksi/pembelian/retur-pembelian'} element={<Dashboard />} />
                            <Route path={'/transaksi/penerimaan-kas/pengembalian-dana'} element={<Dashboard />} />
                            <Route path={'/transaksi/penerimaan-kas/uang-muka-pesanan'} element={<Dashboard />} />
                            <Route path={'/transaksi/penerimaan-kas/konsinyasi'} element={<Dashboard />} />
                            <Route path={'/transaksi/produksi/produksi'} element={<Dashboard />} />
                            <Route path={'/laporan/pembelian/transaksi-pembelian'} element={<Dashboard />} />
                            <Route path={'/laporan/pembelian/retur-pembelian'} element={<Dashboard />} />
                            <Route path={'/laporan/penjualan/transaksi-penjualan'} element={<Dashboard />} />
                            <Route path={'/laporan/penjualan/piutang-pesanan'} element={<Dashboard />} />
                            <Route path={'/laporan/penjualan/piutang-konsinyasi'} element={<Dashboard />} />
                            <Route path={'/laporan/kas/penerimaan-kas'} element={<Dashboard />} />
                            <Route path={'/laporan/kas/pengeluaran-kas'} element={<Dashboard />} />
                            <Route path={'/laporan/produksi/produksi'} element={<Dashboard />} />
                            <Route path={'/laporan/profitabilitas'} element={<Dashboard />} />
                        </Routes>
                    </div>
                </div>
            </div>
        )
    }
}

export default App