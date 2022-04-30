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
import MasterDaftarBB from './pages/master/inventory/daftar_bb';
import MasterBahanPenolong from './pages/master/inventory/bahan_penolong';
import MasterDaftarBP from './pages/master/inventory/daftar_bp';
import MasterAlat from './pages/master/inventory/alat';
import MasterDaftarAlat from './pages/master/inventory/daftar_alat';
import MasterProduk from './pages/master/inventory/produk';
import TransaksiPembelianOrderPembelian from './pages/transaksi/pembelian/order_pembelian';
import TransaksiPembelianDaftarOrder from './pages/transaksi/pembelian/daftar_order';
import TransaksiPembelianPengeluaranKas from './pages/transaksi/pembelian/pengeluaran_kas';
import TransaksiPembelianPenerimaanBarang from './pages/transaksi/pembelian/penerimaan_barang';
import TransaksiPembelianDaftarTerimaBarang from './pages/transaksi/pembelian/daftar_terimabarang';
import TransaksiPembelianReturPembelian from './pages/transaksi/pembelian/retur_pembelian';
import TransaksiPembelianDaftarRetur from './pages/transaksi/pembelian/daftar_retur';
import TransaksiPenerimaanKasPengembalianDana from './pages/transaksi/penerimaan_kas/pengembalian_dana';
import TransaksiPenerimaanKasUangMukaPesanan from './pages/transaksi/penerimaan_kas/uang_muka_pesanan';
import TransaksiPenerimaanKasDaftarUangMuka from './pages/transaksi/penerimaan_kas/daftar_uangmuka';
import TransaksiPenerimaanKasKonsinyasi from './pages/transaksi/penerimaan_kas/konsinyasi';
import TransaksiPermintaanProduksi from './pages/transaksi/produksi/permintaanprod';
import DaftarProduksi from './pages/transaksi/produksi/daftar_produksi';
import LaporanPembelianTransaksiPembelian from './pages/laporan/pembelian/transaksi_pembelian';
import LaporanPembelianReturPembelian from './pages/laporan/pembelian/retur_pembelian';
import LaporanPenjualanTransaksiPenjualan from './pages/laporan/penjualan/transaksi_penjualan';
import LaporanPenjualanPiutangPesanan from './pages/laporan/penjualan/piutang_pesanan';
import LaporanPenjualanPiutangKonsinyasi from './pages/laporan/penjualan/piutang_konsinyasi';
import LaporanKasPenerimaanKas from './pages/laporan/kas/penerimaan_kas';
import LaporanKasPengeluaranKas from './pages/laporan/kas/pengeluaran_kas';
import LaporanProfitabilitas from './pages/laporan/profitabilitas';


// Import CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'datatables.net-bs5/css/dataTables.bootstrap5.css';
import style from './App.module.css';

// Import Javascript
import 'datatables.net-bs5/js/dataTables.bootstrap5';

export class App extends Component {

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
                            <Route path={'/master/daftar-akun'} element={<MasterDaftarAkun />} />
                            <Route path={'/master/supplier'} element={<MasterSupplier />} />
                            <Route path={'/master/customer'} element={<MasterCustomer />} />
                            <Route path={'/master/consignee'} element={<MasterConsignee />} />
                            <Route path={'/master/inventory/bahan-baku'} element={<MasterBahanBaku />} />
                            <Route path={'/master/inventory/daftar-bb'} element={<MasterDaftarBB />} />
                            <Route path={'/master/inventory/bahan-penolong'} element={<MasterBahanPenolong />} />
                            <Route path={'/master/inventory/daftar-bp'} element={<MasterDaftarBP />} />
                            <Route path={'/master/inventory/alat'} element={<MasterAlat />} />
                            <Route path={'/master/inventory/daftar-alat'} element={<MasterDaftarAlat />} />
                            <Route path={'/master/inventory/produk'} element={<MasterProduk />} />
                            <Route path={'/master/tenaga-kerja'} element={<MasterTenagaKerja />} />
                            <Route path={'/transaksi/penjualan/transaksi-penjualan'} element={<TransaksiPenjualanTransaksiPenjualan />} />
                            <Route path={'/transaksi/penjualan/perhitungan-harga'} element={<TransaksiPenjualanPerhitunganHarga />} />
                            <Route path={'/transaksi/penjualan/perhitungan-harga/kalkulator-estimasi'} element={<TransaksiPenjualanKalkulatorEstimasi />} />
                            <Route path={'/transaksi/pembelian/order-pembelian'} element={<TransaksiPembelianOrderPembelian />} />
                            <Route path={'/transaksi/pembelian/daftar-order'} element={<TransaksiPembelianDaftarOrder />} />
                            <Route path={'/transaksi/pembelian/pengeluaran-kas'} element={<TransaksiPembelianPengeluaranKas />} />
                            <Route path={'/transaksi/pembelian/penerimaan-barang'} element={<TransaksiPembelianPenerimaanBarang />} />
                            <Route path={'/transaksi/pembelian/daftar-terimabarang'} element={<TransaksiPembelianDaftarTerimaBarang />} />
                            <Route path={'/transaksi/pembelian/retur-pembelian'} element={<TransaksiPembelianReturPembelian />} />
                            <Route path={'/transaksi/pembelian/daftar-retur'} element={<TransaksiPembelianDaftarRetur />} />
                            <Route path={'/transaksi/penerimaan-kas/pengembalian-dana'} element={<TransaksiPenerimaanKasPengembalianDana />} />
                            <Route path={'/transaksi/penerimaan-kas/uang-muka-pesanan'} element={<TransaksiPenerimaanKasUangMukaPesanan />} />
                            <Route path={'/transaksi/penerimaan-kas/daftar-uangmuka'} element={<TransaksiPenerimaanKasDaftarUangMuka />} />
                            <Route path={'/transaksi/penerimaan-kas/konsinyasi'} element={<TransaksiPenerimaanKasKonsinyasi />} />
                            <Route path={'/transaksi/produksi/permintaanprod'} element={<TransaksiPermintaanProduksi />} />
                            <Route path={'/transaksi/produksi/daftar_produksi'} element={<DaftarProduksi />} />
                            <Route path={'/laporan/pembelian/transaksi-pembelian'} element={<LaporanPembelianTransaksiPembelian />} />
                            <Route path={'/laporan/pembelian/retur-pembelian'} element={<LaporanPembelianReturPembelian />} />
                            <Route path={'/laporan/penjualan/transaksi-penjualan'} element={<LaporanPenjualanTransaksiPenjualan />} />
                            <Route path={'/laporan/penjualan/piutang-pesanan'} element={<LaporanPenjualanPiutangPesanan />} />
                            <Route path={'/laporan/penjualan/piutang-konsinyasi'} element={<LaporanPenjualanPiutangKonsinyasi />} />
                            <Route path={'/laporan/kas/penerimaan-kas'} element={<LaporanKasPenerimaanKas />} />
                            <Route path={'/laporan/kas/pengeluaran-kas'} element={<LaporanKasPengeluaranKas />} />
                            <Route path={'/laporan/produksi/produksi'} element={<Dashboard />} />
                            <Route path={'/laporan/profitabilitas'} element={<LaporanProfitabilitas />} />
                        </Routes>
                    </div>
                </div>
            </div>
        )
    }
}

export default App