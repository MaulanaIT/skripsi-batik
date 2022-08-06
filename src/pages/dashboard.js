import React, { useEffect, useState } from 'react';
import {
    ArcElement,
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Import Library
import axios from 'axios';
import moment from 'moment';
import { baseURL, config, cx, GenerateCode, HideLoading, SetNumberFormat, SetPriceFormat, ShowLoading } from '../component/helper';

// Import CSS
import global from '../css/global.module.css';
import style from '../css/dashboard.module.css';

// Import Javacsript

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard() {

    const [getLabelGrafik, setLabelGrafik] = useState([]);
    const [getDataGrafik, setDataGrafik] = useState([]);
    const [getDataNotification, setDataNotification] = useState([]);

    const [getValueKodePesanan, setValueKodePesanan] = useState([]);

    const [getValueTanggalAwal, setValueTanggalAwal] = useState(moment().subtract(1, 'weeks').format('YYYY-MM-DD'));
    const [getValueTanggalAkhir, setValueTanggalAkhir] = useState(moment().add(1, 'days').format('YYYY-MM-DD'));

    useEffect(() => {
        GetPermintaanPesanan();
    }, []);

    useEffect(() => {
        GetNotifikasi();
        GetPenjualan();
    }, [getValueTanggalAwal, getValueTanggalAkhir]);

    const GetPermintaanPesanan = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/transaksi/produksi/permintaan-pesanan/select.php`, config).then(response => {
            let data = response.data.data;

            setValueKodePesanan(GenerateCode('PPP', data));

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const GetNotifikasi = () => {
        ShowLoading();

        axios.get(`${baseURL}/api/notifikasi/select.php`, config).then(response => {
            let data = response.data.data;

            setDataNotification(data);

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
    }

    const GetPenjualan = async () => {
        ShowLoading();

        let labelGrafik = [];

        let dataGrafik = [];

        const formDataTunai = new FormData();

        formDataTunai.append('jenis_penjualan', 'tunai');
        formDataTunai.append('tanggal_awal', getValueTanggalAwal);
        formDataTunai.append('tanggal_akhir', getValueTanggalAkhir);

        await axios.post(`${baseURL}/api/laporan/penjualan/transaksi/select.php`, formDataTunai, config).then(response => {
            let data = response.data.data;

            console.log(data);

            if (data && data.length > 0) {
                for (const item of data) {
                    labelGrafik.push(item.tanggal);
                    dataGrafik.push({
                        label: 'Penjualan Tunai',
                        data: item.total_harga,
                        backgroundColor: [
                            "#ffbb11",
                            "#ecf0f1",
                            "#50AF95",
                            "#f3ba2f",
                            "#2a71d0"
                        ],
                        borderColor: '#f3ba2f',
                        borderWidth: 2,
                        tension: 0.3
                    });
                }
            }

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });

        const formDataKonsinyasi = new FormData();

        formDataKonsinyasi.append('jenis_penjualan', 'konsinyasi');
        formDataKonsinyasi.append('tanggal_awal', getValueTanggalAwal);
        formDataKonsinyasi.append('tanggal_akhir', getValueTanggalAkhir);

        await axios.post(`${baseURL}/api/laporan/penjualan/transaksi/select.php`, formDataKonsinyasi, config).then(response => {
            let data = response.data.data;

            console.log(data);

            if (data && data.length > 0) {
                for (const item of data) {
                    labelGrafik.push(item.tanggal);
                    dataGrafik.push({
                        label: 'Penjualan Konsinyasi',
                        data: item.total_harga,
                        backgroundColor: [
                            "#ffbb11",
                            "#ecf0f1",
                            "#50AF95",
                            "#f3ba2f",
                            "#2a71d0"
                        ],
                        borderColor: '#ffbb11',
                        borderWidth: 2,
                        tension: 0.3
                    });
                }
            }

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });

        const formDataPesanan = new FormData();

        formDataPesanan.append('jenis_penjualan', 'pesanan');
        formDataPesanan.append('tanggal_awal', getValueTanggalAwal);
        formDataPesanan.append('tanggal_akhir', getValueTanggalAkhir);

        await axios.post(`${baseURL}/api/laporan/penjualan/transaksi/select.php`, formDataPesanan, config).then(response => {
            let data = response.data.data;

            if (data && data.length > 0) {
                for (const item of data) {
                    labelGrafik.some(data => data === item.tanggal) === false && labelGrafik.push(item.tanggal);
                    dataGrafik.push({
                        label: 'Penjualan Pesanan',
                        data: item.total_harga,
                        backgroundColor: [
                            "#ffbb11",
                            "#ecf0f1",
                            "#50AF95",
                            "#f3ba2f",
                            "#2a71d0"
                        ],
                        borderColor: '#2a71d0',
                        borderWidth: 2,
                        tension: 0.3
                    });
                }
            }

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });

        console.log(labelGrafik);
        console.log(dataGrafik);

        setLabelGrafik(labelGrafik);
        setDataGrafik(dataGrafik);
    }

    const InsertPermintaanPesanan = (data) => {
        ShowLoading();

        const formData = new FormData();

        formData.append('kode', getValueKodePesanan);
        formData.append('kode_pesanan', data.kode);
        formData.append('jumlah', data.jumlah);

        axios.post(`${baseURL}/api/transaksi/produksi/permintaan-pesanan/insert.php`, formData, config).then(() => {
            GetNotifikasi();
            GetPermintaanPesanan();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        })
    }

    return (
        <div className={style.container}>
            <div className={global.card}>
                <div className={global.header}>
                    <p className={global.title}>Periode</p>
                </div>
                <div className='d-flex gap-4'>
                    <input type="date" value={getValueTanggalAwal} min={moment().subtract(2, 'months').format('YYYY-MM-DD')} max={moment().format('YYYY-MM-DD')} onChange={e => setValueTanggalAwal(e.target.value)} />
                    <p>Sampai</p>
                    <input type="date" value={getValueTanggalAkhir} readOnly={true} />
                </div>
                <div className={global.header}>
                    <p className={global.title}>Grafik Penjualan</p>
                </div>
                <div className={style.chart}>
                    <Line
                        data={{
                            labels: getLabelGrafik,
                            datasets: getDataGrafik
                        }}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: false
                                },
                                legend: {
                                    display: false
                                }
                            },
                            responsive: true,
                            scales: {
                                x: {
                                    ticks: {
                                        color: '#eaeeff'
                                    },
                                    grid: {
                                        borderColor: 'rgba(0, 0, 0, 0)',
                                        display: false
                                    }
                                },
                                y: {
                                    display: false
                                }
                            }
                        }}
                    />
                </div>
            </div>
            <div className={style.notification}>
                <div className={global.card}>
                    <div className={global.header}>
                        <p className={global.title}>Notifikasi Stok Minimum</p>
                    </div>
                    <div className='overflow-auto' style={{ maxHeight: 326 }}>
                        {getDataNotification && getDataNotification.filter(item => !item.kode.includes('PESAN') && !item.kode.includes('PPS')).length > 0 ?
                            getDataNotification.map((item, index) =>
                                item.kode.includes('PESAN') ?
                                    null
                                    :
                                    item.kode.includes('PPS') ?
                                        null
                                        :
                                        <div key={index} className={style.item}>
                                            <p className={style.description}>Stok barang <span className={style.green}>{item.kode} - {item.nama}</span> menipis.</p>
                                        </div>
                            )
                            :
                            <div className={cx([style.item, style.empty])}>
                                <p className={style.description}>Tidak ada notifikasi</p>
                            </div>
                        }
                    </div>
                </div>
                <div className={global.card}>
                    <div className={global.header}>
                        <p className={global.title}>Notifikasi Pesanan</p>
                    </div>
                    <div className='overflow-auto' style={{ maxHeight: 326 }}>
                        {getDataNotification && getDataNotification.filter(item => item.kode.includes('PESAN')).length > 0 ?
                            getDataNotification.map((item, index) =>
                                item.kode.includes('PESAN') &&
                                <div key={index} className={cx([style.item, style.pesanan])}>
                                    <p className={style.description}>Transaksi pesanan produk telah masuk dengan nomor kode <span className={style.green}>{item.kode}</span></p>
                                    <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#0F008E', "--button-second-color": '#656EA0' }} onClick={() => InsertPermintaanPesanan(item)}>Terima</button>
                                </div>
                            )
                            :
                            <div className={cx([style.item, style.empty])}>
                                <p className={style.description}>Tidak ada notifikasi</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}