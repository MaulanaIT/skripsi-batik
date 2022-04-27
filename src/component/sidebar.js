import React, { Component } from 'react';

// Import Library
import { Link } from 'react-router-dom';
import { MdDashboard, MdExpandMore, MdLibraryBooks, MdStackedBarChart, MdStickyNote2 } from 'react-icons/md';

// Import CSS
import style from '../css/sidebar.module.css';

// Import Javascript
import $ from 'jquery';

export class sidebar extends Component {

    componentDidMount() {
        this.ToggleMenu();
    }

    ToggleMenu = () => {
        let ElementDropdown = document.querySelectorAll(`li.${style.dropdown}`);
        let ElementDropdownToggle = document.querySelectorAll(`li.${style.dropdown}>a, li.${style.dropdown}>div, li.${style.dropdown}>p`);

        ElementDropdownToggle.forEach(element => {
            element.addEventListener('click', function () {
                this.parentNode.classList.toggle(style.active);

                $(this).next('ul').slideToggle(500);
            });
        });

        let ElementMenu = document.querySelectorAll('ul>li>a[href]');

        for (let i = 0; i < ElementMenu.length; i++) {
            if (window.location.pathname.includes(ElementMenu[i].getAttribute('href'))) {
                ElementMenu[i].classList.add(style.active);

                for (let j = 0; j < ElementDropdown.length; j++) {
                    let Check = (ElementDropdown[j].querySelector(`ul`)).querySelector(`a.${style.active}`);

                    if (Check) {
                        ElementDropdown[j].firstElementChild.classList.add(style.active);

                        break;
                    }
                }

                break;
            }
        }

        ElementMenu.forEach(element => {
            element.addEventListener('click', function () {
                ElementMenu.forEach(item => {
                    if (item != element) {
                        item.classList.remove(style.active);
                    } else {
                        item.classList.add(style.active);
                    }
                });

                ElementDropdown.forEach(item => {
                    let Check = (item.querySelector(`ul`)).querySelector(`a.${style.active}`);

                    if (Check) {
                        item.firstElementChild.classList.add(style.active);
                    } else {
                        item.firstElementChild.classList.remove(style.active);
                    }
                });
            });
        });
    }

    render() {
        return (
            <div className={style.container}>
                <ul>
                    <li>
                        <Link to={'/dashboard'}>
                            <MdDashboard />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className={style.dropdown}>
                        <a>
                            <MdLibraryBooks />
                            <span>Master</span>
                            <MdExpandMore className={style.toggle} />
                        </a>
                        <ul className={style.dropdown_menu}>
                            <li><Link to={'/master/user'}><span>User</span></Link></li>
                            <li><Link to={'/master/daftar_akun'}><span>Akun</span></Link></li>
                            <li><Link to={'/master/supplier'}><span>Supplier</span></Link></li>
                            <li><Link to={'/master/customer'}><span>Customer</span></Link></li>
                            <li><Link to={'/master/consignee'}><span>Consignee</span></Link></li>
                            <li className={style.dropdown}>
                                <div>
                                    <span>Inventory</span>
                                    <MdExpandMore className={style.toggle} />
                                </div>
                                <ul className={style.dropdown_menu}>
                                    <li><Link to={'/master/inventory/bahan-baku'}><span>Bahan Baku</span></Link></li>
                                    <li><Link to={'/master/inventory/bahan-penolong'}><span>Bahan Penolong</span></Link></li>
                                    <li><Link to={'/master/inventory/alat'}><span>Alat</span></Link></li>
                                    <li><Link to={'/master/inventory/produk'}><span>Produk</span></Link></li>
                                </ul>
                            </li>
                            <li><Link to={'/master/tenaga-kerja'}><span>Tenaga Kerja</span></Link></li>
                        </ul>
                    </li>
                    <li className={style.dropdown}>
                        <a>
                            <MdStackedBarChart />
                            <span>Transaksi</span>
                            <MdExpandMore className={style.toggle} />
                        </a>
                        <ul className={style.dropdown_menu}>
                            <li className={style.dropdown}>
                                <div>
                                    <span>Penjualan</span>
                                    <MdExpandMore className={style.toggle} />
                                </div>
                                <ul className={style.dropdown_menu}>
                                    <li><Link to={'/transaksi/penjualan/transaksi-penjualan'}><span>Transaksi Penjualan</span></Link></li>
                                    <li><Link to={'/transaksi/penjualan/perhitungan-harga'}><span>Perhitungan Harga</span></Link></li>
                                </ul>
                            </li>
                            <li className={style.dropdown}>
                                <div>
                                    <span>Pembelian</span>
                                    <MdExpandMore className={style.toggle} />
                                </div>
                                <ul className={style.dropdown_menu}>
                                    <li><Link to={'/transaksi/pembelian/order-pembelian'}><span>Order Pembelian</span></Link></li>
                                    <li><Link to={'/transaksi/pembelian/pengeluaran-kas'}><span>Pengeluaran Kas</span></Link></li>
                                    <li><Link to={'/transaksi/pembelian/penerimaan-barang'}><span>Penerimaan Barang</span></Link></li>
                                    <li><Link to={'/transaksi/pembelian/retur-pembelian'}><span>Retur Pembelian</span></Link></li>
                                </ul>
                            </li>
                            <li className={style.dropdown}>
                                <div>
                                    <span>Penerimaan Kas</span>
                                    <MdExpandMore className={style.toggle} />
                                </div>
                                <ul className={style.dropdown_menu}>
                                    <li><Link to={'/transaksi/penerimaan-kas/pengembalian-dana'}><span>Pengembalian Dana</span></Link></li>
                                    <li><Link to={'/transaksi/penerimaan-kas/uang-muka-pesanan'}><span>Uang Muka Pesanan</span></Link></li>
                                    <li><Link to={'/transaksi/penerimaan-kas/konsinyasi'}><span>Konsinyasi</span></Link></li>
                                </ul>
                            </li>
                            <li className={style.dropdown}>
                                <div>
                                    <span>Produksi</span>
                                    <MdExpandMore className={style.toggle} />
                                </div>
                                <ul className={style.dropdown_menu}>
                                    <li><Link to={'/transaksi/produksi/permintaanprod'}><span>Permintaan Produksi</span></Link></li>
                                    <li><Link to={'/transaksi/produksi/daftar_produksi'}><span>Daftar Produksi</span></Link></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li className={style.dropdown}>
                        <a>
                            <MdStickyNote2 />
                            <span>Laporan</span>
                            <MdExpandMore className={style.toggle} />
                        </a>
                        <ul className={style.dropdown_menu}>
                            <li className={style.dropdown}>
                                <div>
                                    <span>Laporan Pembelian</span>
                                    <MdExpandMore className={style.toggle} />
                                </div>
                                <ul className={style.dropdown_menu}>
                                    <li><Link to={'/laporan/pembelian/transaksi-pembelian'}><span>Transaksi Pembelian</span></Link></li>
                                    <li><Link to={'/laporan/pembelian/retur-pembelian'}><span>Retur Pembelian</span></Link></li>
                                </ul>
                            </li>
                            <li className={style.dropdown}>
                                <div>
                                    <span>Laporan Penjualan</span>
                                    <MdExpandMore className={style.toggle} />
                                </div>
                                <ul className={style.dropdown_menu}>
                                    <li><Link to={'/laporan/penjualan/transaksi-penjualan'}><span>Transaksi Penjualan</span></Link></li>
                                    <li><Link to={'/laporan/penjualan/piutang-pesanan'}><span>Piutang Pesanan</span></Link></li>
                                    <li><Link to={'/laporan/penjualan/piutang-konsinyasi'}><span>Piutang Konsinyasi</span></Link></li>
                                </ul>
                            </li>
                            <li className={style.dropdown}>
                                <div>
                                    <span>Laporan Kas</span>
                                    <MdExpandMore className={style.toggle} />
                                </div>
                                <ul className={style.dropdown_menu}>
                                    <li><Link to={'/laporan/kas/penerimaan-kas'}><span>Penerimaan Kas</span></Link></li>
                                    <li><Link to={'/laporan/kas/pengeluaran-kas'}><span>Pengeluaran Kas</span></Link></li>
                                </ul>
                            </li>
                            <li className={style.dropdown}>
                                <div>
                                    <span>Laporan Produksi</span>
                                    <MdExpandMore className={style.toggle} />
                                </div>
                                <ul className={style.dropdown_menu}>
                                    <li><Link to={'/laporan/produksi/produksi'}><span>Produksi</span></Link></li>
                                </ul>
                            </li>
                            <li><Link to={'/laporan/profitabilitas'}><span>Laporan Profitabilitas</span></Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}

export default sidebar