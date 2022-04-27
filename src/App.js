import React, { Component } from 'react';

// Import Library
import { Navigate, Route, Routes } from 'react-router-dom';

// Import Component
import Dashboard from './pages/dashboard';
import Header from './component/header';
import Sidebar from './component/sidebar';

// Import Page - Format: MenuSubmenu
import TransaksiPenjualanKalkulatorEstimasi from './pages/transaksi/penjualan/kalkulator_estimasi';
import TransaksiPenjualanPerhitunganHarga from './pages/transaksi/penjualan/perhitungan_harga';
import TransaksiPenjualanTransaksiPenjualan from './pages/transaksi/penjualan/transaksi_penjualan';
import MasterAkun from './pages/master/akun';
import MasterDaftarAkun from './pages/master/daftar_akun';
import MasterSupplier from './pages/master/supplier';
import MasterCustomer from './pages/master/customer';
import MasterConsignee from './pages/master/consignee';
import MasterTenagaKerja from './pages/master/tenaga_kerja';
import MasterBahanBaku from './pages/master/inventory/bahan_baku';
import MasterBahanPenolong from './pages/master/inventory/bahan_penolong';
import MasterAlat from './pages/master/inventory/alat';
import MasterProduk from './pages/master/inventory/produk';
import TransaksiPembelianOrderPembelian from './pages/transaksi/pembelian/order_pembelian';
import TransaksiPermintaanProduksi from './pages/transaksi/produksi/permintaanprod';
import DaftarProduksi from './pages/transaksi/produksi/daftar_produksi';


// Import CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'datatables.net-bs5/css/dataTables.bootstrap5.css';
import style from './App.module.css';

// Import Javascript
import 'datatables.net-bs5/js/dataTables.bootstrap5';
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
                            <Route path={'/master/daftar_akun'} element={<MasterDaftarAkun />} />
                            <Route path={'/master/supplier'} element={<MasterSupplier />} />
                            <Route path={'/master/customer'} element={<MasterCustomer />} />
                            <Route path={'/master/consignee'} element={<MasterConsignee />} />
                            <Route path={'/master/inventory/bahan-baku'} element={<MasterBahanBaku />} />
                            <Route path={'/master/inventory/bahan-penolong'} element={<MasterBahanPenolong />} />
                            <Route path={'/master/inventory/alat'} element={<MasterAlat />} />
                            <Route path={'/master/inventory/produk'} element={<MasterProduk />} />
                            <Route path={'/master/tenaga-kerja'} element={<MasterTenagaKerja />} />
                            <Route path={'/transaksi/penjualan/transaksi-penjualan'} element={<TransaksiPenjualanTransaksiPenjualan />} />
                            <Route path={'/transaksi/penjualan/perhitungan-harga'} element={<TransaksiPenjualanPerhitunganHarga />} />
                            <Route path={'/transaksi/penjualan/perhitungan-harga/kalkulator-estimasi'} element={<TransaksiPenjualanKalkulatorEstimasi />} />
                            <Route path={'/transaksi/pembelian/order-pembelian'} element={<TransaksiPembelianOrderPembelian />} />
                            <Route path={'/transaksi/pembelian/pengeluaran-kas'} element={<Dashboard />} />
                            <Route path={'/transaksi/pembelian/penerimaan-barang'} element={<Dashboard />} />
                            <Route path={'/transaksi/pembelian/retur-pembelian'} element={<Dashboard />} />
                            <Route path={'/transaksi/penerimaan-kas/pengembalian-dana'} element={<Dashboard />} />
                            <Route path={'/transaksi/penerimaan-kas/uang-muka-pesanan'} element={<Dashboard />} />
                            <Route path={'/transaksi/penerimaan-kas/konsinyasi'} element={<Dashboard />} />
                            <Route path={'/transaksi/produksi/permintaanprod'} element={<TransaksiPermintaanProduksi />} />
                            <Route path={'/transaksi/produksi/daftar_produksi'} element={<DaftarProduksi />} />
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