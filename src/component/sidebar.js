import React, { Component } from 'react';

// Import Library
import { Link } from 'react-router-dom';
import { MdDashboard, MdExpandMore, MdLibraryBooks, MdStackedBarChart, MdStickyNote2 } from 'react-icons/md';

// Import CSS
import style from '../css/sidebar.module.css';

export class sidebar extends Component {

    componentDidMount() {
        this.ToggleMenu();
    }

    ToggleDropdown = (ele) => {
        let ElementChild = ele.querySelector('ul');

        if (ElementChild.style.height == '' || parseInt(ElementChild.style.height) === 0) {
            ElementChild.style.height = `${ElementChild.children.length * ElementChild.children[0].offsetHeight}px`;

            if (ele.parentNode.classList.contains(style.dropdown_menu)) ele.parentNode.style.height = `${parseInt(ele.parentNode.style.height) + parseInt(ElementChild.style.height)}px`;
        } else {
            if (ele.parentNode.classList.contains(style.dropdown_menu)) ele.parentNode.style.height = `${parseInt(ele.parentNode.style.height) - parseInt(ElementChild.style.height)}px`;

            ele.classList.remove(style.active);
            ElementChild.style.height = '0px';
        }
    }

    ToggleMenu = () => {
        let Element = this;
        let ElementDropdown = document.querySelectorAll(`li.${style.dropdown}`);
        let ElementDropdownToggle = document.querySelectorAll(`li.${style.dropdown}>a, li.${style.dropdown}>div, li.${style.dropdown}>p`);

        ElementDropdownToggle.forEach(element => {
            element.addEventListener('click', function () {
                this.parentNode.classList.toggle(style.active);

                Element.ToggleDropdown(this.parentNode);
            });
        });

        let ElementMenu = document.querySelectorAll('ul>li>a[href]');

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
                    let Check = item.querySelector(`a.${style.active}`);

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
                        <Link to={'/dashboard'} className={style.active}>
                            <MdDashboard />
                            <span>DASHBOARD</span>
                        </Link>
                    </li>
                    <li className={style.dropdown}>
                        <a>
                            <MdLibraryBooks />
                            <span>MASTER</span>
                            <MdExpandMore className={style.toggle} />
                        </a>
                        <ul className={style.dropdown_menu}>
                            <li><Link to={'/master/user'}><span>USER</span></Link></li>
                            <li><Link to={'/master/akun'}><span>AKUN</span></Link></li>
                            <li><Link to={'/master/supplier'}><span>SUPPLIER</span></Link></li>
                            <li><Link to={'/master/customer'}><span>CUSTOMER</span></Link></li>
                            <li><Link to={'/master/consignee'}><span>CONSIGNEE</span></Link></li>
                            <li className={style.dropdown}>
                                <div>
                                    <span>INVENTORY</span>
                                    <MdExpandMore className={style.toggle} />
                                </div>
                                <ul className={style.dropdown_menu}>
                                    <li><Link to={'/master/inventory/bahan-baku'}><span>BAHAN BAKU</span></Link></li>
                                    <li><Link to={'/master/inventory/bahan-penolong'}><span>BAHAN PENOLONG</span></Link></li>
                                    <li><Link to={'/master/inventory/bahan-alat'}><span>BAHAN ALAT</span></Link></li>
                                </ul>
                            </li>
                            <li><Link to={'/master/tenaga-kerja'}><span>TENAGA KERJA</span></Link></li>
                        </ul>
                    </li>
                    <li className={style.dropdown}>
                        <a>
                            <MdStackedBarChart />
                            <span>TRANSAKSI</span>
                            <MdExpandMore className={style.toggle} />
                        </a>
                        <ul className={style.dropdown_menu}>
                            <li className={style.dropdown}>
                                <div>
                                    <span>PENJUALAN</span>
                                    <MdExpandMore className={style.toggle} />
                                </div>
                                <ul className={style.dropdown_menu}>
                                    <li><Link to={'/transaksi/penjualan/transaksi-penjualan'}><span>TRANSAKSI PENJUALAN</span></Link></li>
                                    <li><Link to={'/transaksi/penjualan/perhitungan-harga'}><span>PERHITUNGAN HARGA</span></Link></li>
                                </ul>
                            </li>
                            <li className={style.dropdown}>
                                <div>
                                    <span>PEMBELIAN</span>
                                    <MdExpandMore className={style.toggle} />
                                </div>
                                <ul className={style.dropdown_menu}>
                                    <li><Link to={'/transaksi/pembelian/order-pembelian'}><span>ORDER PEMBELIAN</span></Link></li>
                                    <li><Link to={'/transaksi/pembelian/pengeluaran-kas'}><span>PENGELUARAN KAS</span></Link></li>
                                    <li><Link to={'/transaksi/pembelian/penerimaan-barang'}><span>PENERIMAAN BARANG</span></Link></li>
                                    <li><Link to={'/transaksi/pembelian/retur-pembelian'}><span>RETUR PEMBELIAN</span></Link></li>
                                </ul>
                            </li>
                            <li className={style.dropdown}>
                                <div>
                                    <span>PENERIMAAN KAS</span>
                                    <MdExpandMore className={style.toggle} />
                                </div>
                                <ul className={style.dropdown_menu}>
                                    <li><Link to={'/transaksi/penerimaan-kas/pengembalian-dana'}><span>PENGEMBALIAN DANA</span></Link></li>
                                    <li><Link to={'/transaksi/penerimaan-kas/uang-muka-pesanan'}><span>UANG MUKA PESANAN</span></Link></li>
                                    <li><Link to={'/transaksi/penerimaan-kas/konsinyasi'}><span>KONSINYASI</span></Link></li>
                                </ul>
                            </li>
                            <li className={style.dropdown}>
                                <div>
                                    <span>PRODUKSI</span>
                                    <MdExpandMore className={style.toggle} />
                                </div>
                                <ul className={style.dropdown_menu}>
                                    <li><Link to={'/transaksi/produksi/produksi'}><span>PRODUKSI</span></Link></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li className={style.dropdown}>
                        <a>
                            <MdStickyNote2 />
                            <span>LAPORAN</span>
                            <MdExpandMore className={style.toggle} />
                        </a>
                        <ul className={style.dropdown_menu}>
                            <li className={style.dropdown}>
                                <div>
                                    <span>LAPORAN PEMBELIAN</span>
                                    <MdExpandMore className={style.toggle} />
                                </div>
                                <ul className={style.dropdown_menu}>
                                    <li><Link to={'/laporan/pembelian/transaksi-pembelian'}><span>TRANSAKSI PEMBELIAN</span></Link></li>
                                    <li><Link to={'/laporan/pembelian/retur-pembelian'}><span>RETUR PEMBELIAN</span></Link></li>
                                </ul>
                            </li>
                            <li className={style.dropdown}>
                                <div>
                                    <span>LAPORAN PENJUALAN</span>
                                    <MdExpandMore className={style.toggle} />
                                </div>
                                <ul className={style.dropdown_menu}>
                                    <li><Link to={'/laporan/penjualan/transaksi-penjualan'}><span>TRANSAKSI PENJUALAN</span></Link></li>
                                    <li><Link to={'/laporan/penjualan/piutang-pesanan'}><span>PIUTANG PESANAN</span></Link></li>
                                    <li><Link to={'/laporan/penjualan/piutang-konsinyasi'}><span>PIUTANG KONSINYASI</span></Link></li>
                                </ul>
                            </li>
                            <li className={style.dropdown}>
                                <div>
                                    <span>LAPORAN KAS</span>
                                    <MdExpandMore className={style.toggle} />
                                </div>
                                <ul className={style.dropdown_menu}>
                                    <li><Link to={'/laporan/kas/penerimaan-kas'}><span>PENERIMAAN KAS</span></Link></li>
                                    <li><Link to={'/laporan/kas/pengeluaran-kas'}><span>PENGELUARAN KAS</span></Link></li>
                                </ul>
                            </li>
                            <li className={style.dropdown}>
                                <div>
                                    <span>LAPORAN PRODUKSI</span>
                                    <MdExpandMore className={style.toggle} />
                                </div>
                                <ul className={style.dropdown_menu}>
                                    <li><Link to={'/laporan/produksi/produksi'}><span>PRODUKSI</span></Link></li>
                                </ul>
                            </li>
                            <li><Link to={'/laporan/profitabilitas'}><span>LAPORAN PROFITABILITAS</span></Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}

export default sidebar