import React from 'react';

// Import Library
import axios from 'axios';
import { useEffect, useState } from 'react';
import { baseURL, config, HideLoading, ShowLoading } from './component/helper';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

// Import Component
import Dashboard from './pages/dashboard';
import Header from './component/header';
import Loading from './component/loading';
import Sidebar from './component/sidebar';
import Login from './pages/login';

// Import Page - Format: MenuSubmenu
import TransaksiPenjualanKalkulatorEstimasi from './pages/transaksi/penjualan/kalkulator_estimasi';
import TransaksiPenjualanDaftarPesanan from './pages/transaksi/penjualan/daftar_pesanan';
import TransaksiPenjualanTransaksiPenjualan from './pages/transaksi/penjualan/transaksi_penjualan';
import TransaksiPenjualanJualPesan from './pages/transaksi/penjualan/jual_pesan';
import MasterUser from './pages/master/user';
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
import MasterDaftarProduk from './pages/master/inventory/daftar_produk';
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
import TransaksiPenerimaanKasTerimaPiutang from './pages/transaksi/penerimaan_kas/terima_piutang';
import TransaksiPermintaanProduksi from './pages/transaksi/produksi/permintaanprod';
import TransaksiPermintaanProduksiPesanan from './pages/transaksi/produksi/permintaan_prod_pesanan';
import DaftarProduksi from './pages/transaksi/produksi/daftar_produksi';
import DaftarHargaPokokProduksi from './pages/transaksi/produksi/daftar_hpp';
import Produksi from './pages/transaksi/produksi/produksi';
import HargaPokokProduksi from './pages/transaksi/produksi/hpp';
import AddHPP from './pages/transaksi/produksi/add_hpp';
import LaporanPembelianTransaksiPembelian from './pages/laporan/pembelian/transaksi_pembelian';
import LaporanPembelianReturPembelian from './pages/laporan/pembelian/retur_pembelian';
import LaporanPenjualanTransaksiPenjualan from './pages/laporan/penjualan/transaksi_penjualan';
import LaporanPenjualanPiutangKonsinyasi from './pages/laporan/penjualan/piutang_konsinyasi';
import LaporanKasPenerimaanKas from './pages/laporan/kas/penerimaan_kas';
import LaporanKasPengeluaranKas from './pages/laporan/kas/pengeluaran_kas';
import LaporanProfitabilitas from './pages/laporan/profitabilitas';
import LaporanHargaPokokProduksi from './pages/laporan/produksi/lap_hpp';
import LaporanProduksi from './pages/laporan/produksi/lap_produksi';
import LaporanTenagaKerja from './pages/laporan/produksi/lap_tenaga_kerja';
import KartuAlat from './pages/laporan/produksi/kartu_alat';
import KartuPersediaanBahanBaku from './pages/laporan/produksi/kartu_persediaan_bb';
import KartuPersediaanBahanPenolong from './pages/laporan/produksi/kartu_persediaan_bp';

import PopupResponse from './component/popup_response';

// Import CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'datatables.net-bs5/css/dataTables.bootstrap5.css';
import style from './App.module.css';

// Import Javascript
import 'datatables.net-bs5/js/dataTables.bootstrap5';


export default function App() {
    const [getJabatan, setJabatan] = useState('');

    const location = useLocation();

    useEffect(() => {
        localStorage.getItem('leksana_token') && login();
    }, []);

    const login = () => {
        ShowLoading();
        
        const formData = new FormData();

        formData.append('username', localStorage.getItem('leksana_username'));
        formData.append('password', localStorage.getItem('leksana_token'));

        axios.post(`${baseURL}/api/login.php`, formData, config).then(response => {
            let login = response.data.data;
            
            setJabatan(login.data.jabatan);

            HideLoading();
        }).catch(error => {
            if (location.pathname !== '/' && location.pathname !== '/login') window.location.href = '/#/login';
            console.log(error);

            localStorage.clear();

            alert(error.message);

            HideLoading();
        });
    }

    return (
        <React.Fragment>
            <Loading />
            <PopupResponse />
            {location.pathname === '/' || location.pathname === '/login' ?
                <Routes>
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/'} element={<Navigate to={'/login'} />} />
                </Routes>
                :
                <div className={style.container}>
                    <Header jabatan={getJabatan} />
                    <div className={style.container_content}>
                        <Sidebar jabatan={getJabatan} />

                        <div className={style.content}>
                            <Routes>
                                <Route path={'/dashboard'} element={<Dashboard />} />
                                <Route path={'/master/user'} element={<MasterUser />} />
                                <Route path={'/master/akun'} element={<MasterAkun />} />
                                <Route path={'/master/daftar-akun'} element={<MasterDaftarAkun />} />
                                <Route path={'/master/supplier'} element={<MasterSupplier />} />
                                <Route path={'/master/customer'} element={<MasterCustomer />} />
                                <Route path={'/master/consignee'} element={<MasterConsignee />} />
                                <Route path={'/master/inventory/bahan-baku'} element={<MasterBahanBaku />} />
                                <Route path={'/master/inventory/daftar-bahan-baku'} element={<MasterDaftarBB />} />
                                <Route path={'/master/inventory/bahan-penolong'} element={<MasterBahanPenolong />} />
                                <Route path={'/master/inventory/daftar-bahan-penolong'} element={<MasterDaftarBP />} />
                                <Route path={'/master/inventory/alat'} element={<MasterAlat />} />
                                <Route path={'/master/inventory/daftar-alat'} element={<MasterDaftarAlat />} />
                                <Route path={'/master/inventory/daftar-produk'} element={<MasterDaftarProduk />} />
                                <Route path={'/master/inventory/produk'} element={<MasterProduk />} />
                                <Route path={'/master/tenaga-kerja'} element={<MasterTenagaKerja />} />
                                <Route path={'/transaksi/penjualan/transaksi-penjualan'} element={<TransaksiPenjualanTransaksiPenjualan />} />
                                <Route path={'/transaksi/penjualan/daftar-pesanan'} element={<TransaksiPenjualanDaftarPesanan />} />
                                <Route path={'/transaksi/penjualan/jual-pesan'} element={<TransaksiPenjualanJualPesan />} />
                                <Route path={'/transaksi/penjualan/daftar-pesanan/kalkulator-estimasi'} element={<TransaksiPenjualanKalkulatorEstimasi />} />
                                <Route path={'/transaksi/pembelian/order-pembelian'} element={<TransaksiPembelianOrderPembelian />} />
                                <Route path={'/transaksi/pembelian/daftar-order'} element={<TransaksiPembelianDaftarOrder />} />
                                <Route path={'/transaksi/pembelian/pengeluaran-kas'} element={<TransaksiPembelianPengeluaranKas />} />
                                <Route path={'/transaksi/pembelian/penerimaan-barang'} element={<TransaksiPembelianPenerimaanBarang />} />
                                <Route path={'/transaksi/pembelian/daftar-terima-barang'} element={<TransaksiPembelianDaftarTerimaBarang />} />
                                <Route path={'/transaksi/pembelian/retur-pembelian'} element={<TransaksiPembelianReturPembelian />} />
                                <Route path={'/transaksi/pembelian/daftar-retur'} element={<TransaksiPembelianDaftarRetur />} />
                                <Route path={'/transaksi/penerimaan-kas/pengembalian-dana'} element={<TransaksiPenerimaanKasPengembalianDana />} />
                                <Route path={'/transaksi/penerimaan-kas/uang-muka-pesanan'} element={<TransaksiPenerimaanKasUangMukaPesanan />} />
                                <Route path={'/transaksi/penerimaan-kas/daftar-uangmuka'} element={<TransaksiPenerimaanKasDaftarUangMuka />} />
                                <Route path={'/transaksi/penerimaan-kas/terima-piutang'} element={<TransaksiPenerimaanKasTerimaPiutang />} />
                                <Route path={'/transaksi/produksi/permintaanprod'} element={<TransaksiPermintaanProduksi />} />
                                <Route path={'/transaksi/produksi/permintaan-prod-pesanan'} element={<TransaksiPermintaanProduksiPesanan />} />
                                <Route path={'/transaksi/produksi/daftar-produksi'} element={<DaftarProduksi />} />
                                <Route path={'/transaksi/produksi/produksi'} element={<Produksi />} />
                                <Route path={'/transaksi/produksi/daftar-hpp'} element={<DaftarHargaPokokProduksi />} />
                                <Route path={'/transaksi/produksi/hpp'} element={<HargaPokokProduksi />} />
                                <Route path={'/transaksi/produksi/add-hpp'} element={<AddHPP />} />
                                <Route path={'/laporan/pembelian/transaksi-pembelian'} element={<LaporanPembelianTransaksiPembelian />} />
                                <Route path={'/laporan/pembelian/retur-pembelian'} element={<LaporanPembelianReturPembelian />} />
                                <Route path={'/laporan/penjualan/transaksi-penjualan'} element={<LaporanPenjualanTransaksiPenjualan />} />
                                <Route path={'/laporan/penjualan/piutang-konsinyasi'} element={<LaporanPenjualanPiutangKonsinyasi />} />
                                <Route path={'/laporan/kas/penerimaan-kas'} element={<LaporanKasPenerimaanKas />} />
                                <Route path={'/laporan/kas/pengeluaran-kas'} element={<LaporanKasPengeluaranKas />} />
                                <Route path={'/laporan/produksi/lap-produksi'} element={<LaporanProduksi />} />
                                <Route path={'/laporan/produksi/lap-hpp'} element={<LaporanHargaPokokProduksi />} />
                                <Route path={'/laporan/produksi/lap-tenaga-kerja'} element={<LaporanTenagaKerja />} />
                                <Route path={'/laporan/produksi/kartu-alat'} element={<KartuAlat />} />
                                <Route path={'/laporan/produksi/kartu-persediaan-bb'} element={<KartuPersediaanBahanBaku />} />
                                <Route path={'/laporan/produksi/kartu-persediaan-bp'} element={<KartuPersediaanBahanPenolong />} />
                                <Route path={'/laporan/profitabilitas'} element={<LaporanProfitabilitas />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}