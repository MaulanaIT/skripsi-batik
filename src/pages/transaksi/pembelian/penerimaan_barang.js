import React, { useEffect, useState } from 'react';

// Import Library
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
import { Link, useLocation } from 'react-router-dom';
import { baseURL, config, GenerateCode, HideLoading, ShowLoading } from '../../../component/helper';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/pembelian/penerimaan_barang.module.css';

export default function Penerimaan_barang() {

    const [getDataDetailOrder, setDataDetailOrder] = useState([]);

    const [getHTMLTableDaftarDetailOrderAlat, setHTMLTableDaftarDetailOrderAlat] = useState([]);
    const [getHTMLTableDaftarDetailOrderBahan, setHTMLTableDaftarDetailOrderBahan] = useState([]);

    const [getValueJenisPembelian, setValueJenisPembelian] = useState('');
    const [getValueKodeOrder, setValueKodeOrder] = useState('');
    const [getValueKodePenerimaan, setValueKodePenerimaan] = useState('');
    const [getValueKodeSupplier, setValueKodeSupplier] = useState('');
    const [getValueNamaSupplier, setValueNamaSupplier] = useState('');
    const [getValueTanggal, setValueTanggal] = useState('');
    const [getValueTanggalOrder, setValueTanggalOrder] = useState('');
    const [getValueTotalBarang, setValueTotalBarang] = useState(0);
    const [getValueTotalKapasitas, setValueTotalKapasitas] = useState(0);

    const location = useLocation();

    useEffect(() => {
        GetOrder();
        GetTerimaBarang();
    }, []);

    useEffect(() => {
        $('#table-data-alat').DataTable();
    }, [getHTMLTableDaftarDetailOrderAlat]);

    useEffect(() => {
        $('#table-data-bahan').DataTable();
    }, [getHTMLTableDaftarDetailOrderBahan]);

    useEffect(() => {
        if (getValueJenisPembelian !== '') GetDetailOrder();
    }, [getValueJenisPembelian]);

    const GetDetailOrder = () => {
        const formData = new FormData();

        formData.append('kode', location.state.kode);

        axios.post(`${baseURL}/api/transaksi/pembelian/detail-order/select.php`, formData, config).then(response => {
            let dataDetailOrder = response.data.data;

            let htmlTableDaftarDetailOrderAlat = [];
            let htmlTableDaftarDetailOrderBahan = [];
            let totalBarang = 0;

            if (dataDetailOrder.length > 0) {
                dataDetailOrder.forEach((item, index) => {
                    if (getValueJenisPembelian === 'alat') {
                        htmlTableDaftarDetailOrderAlat.push(
                            <tr key={index}>
                                <td>{index + 1}.</td>
                                <td>{item.kode_item}</td>
                                <td>{item.nama_item}</td>
                                <td>{item.jumlah}</td>
                                <td>{item.harga}</td>
                                <td>{parseInt(item.jumlah) * parseInt(item.harga)}</td>
                                <td>{item.total_kapasitas}</td>
                            </tr>
                        );
                    }

                    if (getValueJenisPembelian === 'bahan') {
                        htmlTableDaftarDetailOrderBahan.push(
                            <tr key={index}>
                                <td>{index + 1}.</td>
                                <td>{item.kode_item}</td>
                                <td>{item.nama_item}</td>
                                <td>{item.jumlah}</td>
                                <td>{item.harga}</td>
                                <td>{parseInt(item.jumlah) * parseInt(item.harga)}</td>
                            </tr>
                        );
                    }

                    totalBarang += parseInt(item.jumlah);
                });
            }

            $('#table-data-alat').DataTable().destroy();
            $('#table-data-bahan').DataTable().destroy();

            setDataDetailOrder(dataDetailOrder);
            setHTMLTableDaftarDetailOrderAlat(htmlTableDaftarDetailOrderAlat);
            setHTMLTableDaftarDetailOrderBahan(htmlTableDaftarDetailOrderBahan);
            setValueTotalBarang(totalBarang);
            setValueTanggal(moment().format('YYYY-MM-DD'));
        }).catch(error => {
            console.log(error);
        });
    }

    const GetOrder = () => {
        axios.get(`${baseURL}/api/transaksi/pembelian/order/select.php`, config).then(response => {
            ShowLoading();
            let dataOrder = response.data.data.find(item => item.kode === location.state.kode);

            setValueJenisPembelian(dataOrder.jenis_pembelian);
            setValueKodeOrder(dataOrder.kode);
            setValueKodeSupplier(dataOrder.kode_supplier);
            setValueNamaSupplier(dataOrder.nama_supplier);
            setValueTanggalOrder(dataOrder.tanggal);

            HideLoading();
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    const GetTerimaBarang = () => {
        axios.get(`${baseURL}/api/transaksi/pembelian/terima-barang/select.php`, config).then(response => {
            ShowLoading();
            let dataPenerimaan = response.data.data;

            setValueKodePenerimaan(GenerateCode('TB', dataPenerimaan));

            HideLoading();
        }).catch(error => {
            HideLoading();

            console.log(error);
        });
    }

    const TerimaBarang = () => {
        ShowLoading();

        const formData = new FormData();

        let file = document.getElementById('input-file-nota').files[0];

        if (file) {
            let arg = file.name.split('.');
            let extension = arg[arg.length - 1];
            formData.append('file_nota', file);
            
            formData.append('nama_file', `File Nota Pembelian - ${getValueKodePenerimaan} - ${getValueTanggal}.${extension}`);
        }

        formData.append('kode', getValueKodePenerimaan);
        formData.append('kode_order', getValueKodeOrder);
        formData.append('jenis_pembelian', getValueJenisPembelian);
        formData.append('kode_supplier', getValueKodeSupplier);
        formData.append('total_barang', getValueTotalBarang);
        formData.append('data', JSON.stringify(getDataDetailOrder));

        axios.post(`${baseURL}/api/transaksi/pembelian/terima-barang/insert.php`, formData, config).then(() => {
            const formData = new FormData();

            formData.append('kode', getValueKodeOrder);
            formData.append('status', 3);

            axios.post(`${baseURL}/api/transaksi/pembelian/order/update-status.php`, formData, config).then(() => {
                window.location.href = '/#/transaksi/pembelian/daftar-terima-barang';
            }).catch(error => {
                console.log(error)

                HideLoading();
            });
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    return (
        <React.Fragment>
            <div className={style.header}>
                <p className={style.title}>Penerimaan Barang</p>
                <p className={style.pathname}>Transaksi / Pembelian / Penerimaan Barang</p>
            </div>
            <div className={style.content}>
                <div className={`col-12 col-md-6 pe-md-2 pb-2 pb-md-0`}>
                    <div className={`${global.card}`}>
                        <p className={global.title}>Input Penerimaan Barang</p>
                        <div className={`d-flex`}>
                            <div className={`${global.input_group} col-6 pe-2`}>
                                <p className={global.title}>Kode Penerimaan</p>
                                <input type="text" id='input-kode-terima-barang' value={getValueKodePenerimaan} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-6 ps-2`}>
                                <p className={global.title}>Tanggal Terima</p>
                                <input type="date" id='input-tanggal-terima-barang' value={getValueTanggal} onChange={e => setValueTanggal(e.target.value)} />
                            </div>
                        </div>
                        <div className={`d-flex`}>
                            <div className={`${global.input_group} col-3 pe-2`}>
                                <p className={global.title}>Kode Order</p>
                                <input type="text" id='input-kode-order' value={getValueKodeOrder} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-5 ps-2`}>
                                <p className={global.title}>Tanggal Order</p>
                                <input type="text" id='input-tanggal-order' value={getValueTanggalOrder} readOnly={true} />
                            </div>
                        </div>
                        <div className={`d-flex`}>
                            <div className={`${global.input_group} col-3 pe-2`}>
                                <p className={global.title}>Kode Supplier</p>
                                <input type="text" id='input-kode-supplier' value={getValueKodeSupplier} readOnly={true} />
                            </div>
                            <div className={`${global.input_group} col-5 ps-2`}>
                                <p className={global.title}>Nama Supplier</p>
                                <input type="text" id='input-nama-supplier' value={getValueNamaSupplier} readOnly={true} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`col-12 col-md-6 ps-md-2 pt-2 pt-md-0`}>
                    <div className={global.card}>
                        <div className={`${global.header}`}>
                            <p className={global.title}>Daftar Pembelian</p>
                        </div>
                        <div className={`${getValueJenisPembelian === 'bahan' && 'd-none'} table-responsive`}>
                            <table id='table-data-alat' className={`table w-100`}>
                                <thead>
                                    <tr>
                                        <td>No.</td>
                                        <td>Kode Alat</td>
                                        <td>Nama Alat</td>
                                        <td>Jumlah</td>
                                        <td>Harga</td>
                                        <td>Total Harga</td>
                                        <td>Total Kapasitas</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getHTMLTableDaftarDetailOrderAlat}
                                </tbody>
                            </table>
                        </div>
                        <div className={`${getValueJenisPembelian === 'alat' && 'd-none'} table-responsive`}>
                            <table id='table-data-bahan' className={`table w-100`}>
                                <thead>
                                    <tr>
                                        <td>No.</td>
                                        <td>Kode Bahan</td>
                                        <td>Nama Bahan</td>
                                        <td>Jumlah</td>
                                        <td>Harga</td>
                                        <td>Total Harga</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getHTMLTableDaftarDetailOrderBahan}
                                </tbody>
                            </table>
                        </div>
                        <div className={`d-flex flex-column gap-2 pb-2`}>
                            <div className={`align-items-center ${global.input_group_row}`}>
                                <p className={`${global.title} col-3`}>Total Barang</p>
                                <input type="text" id='input-detail-total-pembelian' name='input-detail-total-pembelian' className={`col-3`} value={getValueTotalBarang} readOnly={true} />
                            </div>
                        </div>
                        <div className='d-flex flex-column gap-2 pt-2'>
                            <div className='d-flex'>
                                <div className='align-items-center d-flex justify-content-between'>
                                    <p>Upload Nota Pembelian</p>
                                    <input type="file" accept='.pdf' id='input-file-nota' name='input-file-nota' />
                                </div>
                            </div>
                            <div className='d-flex flex-column gap-2 pt-2'>
                                <div className='d-flex'>
                                    <div className='col-6 pe-2'>
                                        <button type='button' className={`${global.button} w-100`} onClick={TerimaBarang}>Simpan</button>
                                    </div>
                                    <div className='col-6 ps-2'>
                                        <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }}>Batal</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}