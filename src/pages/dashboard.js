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

    const [getLabelGrafikTunai, setLabelGrafikTunai] = useState([]);
    const [getDataGrafikTunai, setDataGrafikTunai] = useState([]);
    const [getLabelGrafikKonsinyasi, setLabelGrafikKonsinyasi] = useState([]);
    const [getDataGrafikKonsinyasi, setDataGrafikKonsinyasi] = useState([]);
    const [getLabelGrafikPesanan, setLabelGrafikPesanan] = useState([]);
    const [getDataGrafikPesanan, setDataGrafikPesanan] = useState([]);
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

    const GetPenjualan = () => {
        ShowLoading();

        const formDataTunai = new FormData();

        formDataTunai.append('jenis_penjualan', 'tunai');
        formDataTunai.append('tanggal_awal', getValueTanggalAwal);
        formDataTunai.append('tanggal_akhir', getValueTanggalAkhir);

        axios.post(`${baseURL}/api/laporan/penjualan/transaksi/select-grafik.php`, formDataTunai, config).then(response => {
            let data = response.data.data;

            let labelGrafik = [];
            let dataGrafik = [];

            if (data && data.length > 0) {
                for (const item of data) {
                    labelGrafik.push(item.tanggal);
                    dataGrafik.push(item.total_harga);
                }
            }

            setLabelGrafikTunai(labelGrafik);
            setDataGrafikTunai(dataGrafik);

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

        axios.post(`${baseURL}/api/laporan/penjualan/transaksi/select-grafik.php`, formDataKonsinyasi, config).then(response => {
            let data = response.data.data;

            let labelGrafik = [];
            let dataGrafik = [];

            if (data && data.length > 0) {
                for (const item of data) {
                    labelGrafik.push(item.tanggal);
                    dataGrafik.push(item.total_harga);
                }
            }

            setLabelGrafikKonsinyasi(labelGrafik);
            setDataGrafikKonsinyasi(dataGrafik);

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

        axios.post(`${baseURL}/api/laporan/penjualan/transaksi/select-grafik.php`, formDataPesanan, config).then(response => {
            let data = response.data.data;

            let labelGrafik = [];
            let dataGrafik = [];

            if (data && data.length > 0) {
                for (const item of data) {
                    labelGrafik.push(item.tanggal);
                    dataGrafik.push(item.total_harga);
                }
            }

            setLabelGrafikPesanan(labelGrafik);
            setDataGrafikPesanan(dataGrafik);

            HideLoading();
        }).catch(error => {
            console.log(error);

            alert(error);

            HideLoading();
        });
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
                    <p className={global.title}>Grafik Penjualan Tunai</p>
                </div>
                <div className={style.chart}>
                    <Line
                        data={{
                            labels: getLabelGrafikTunai,
                            datasets: [{
                                label: 'Penjualan Tunai',
                                data: getDataGrafikTunai,
                                borderColor: 'black',
                                borderWidth: 2,
                                tension: 0.3
                            }]
                        }}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: true
                                },
                                legend: {
                                    display: false
                                }
                            },
                            responsive: true,
                            scales: {
                                x: {
                                    display: true,
                                    ticks: {
                                        color: 'black'
                                    },
                                    title: {
                                        color: 'black'
                                    }
                                },
                                y: {
                                    display: true,
                                    ticks: {
                                        color: 'black'
                                    },
                                    title: {
                                        color: 'black'
                                    }
                                }
                            }
                        }}
                    />
                </div>
                <div className={global.header}>
                    <p className={global.title}>Grafik Penjualan Konsinyasi</p>
                </div>
                <div className={style.chart}>
                    <Line
                        data={{
                            labels: getLabelGrafikKonsinyasi,
                            datasets: [{
                                label: 'Penjualan Konsinyasi',
                                data: getDataGrafikKonsinyasi,
                                borderColor: 'black',
                                borderWidth: 2,
                                tension: 0.3
                            }]
                        }}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: true
                                },
                                legend: {
                                    display: false
                                }
                            },
                            responsive: true,
                            scales: {
                                x: {
                                    display: true,
                                    ticks: {
                                        color: 'black'
                                    },
                                    title: {
                                        color: 'black'
                                    }
                                },
                                y: {
                                    display: true,
                                    ticks: {
                                        color: 'black'
                                    },
                                    title: {
                                        color: 'black'
                                    }
                                }
                            }
                        }}
                    />
                </div>
                <div className={global.header}>
                    <p className={global.title}>Grafik Penjualan Pesanan</p>
                </div>
                <div className={style.chart}>
                    <Line
                        data={{
                            labels: getLabelGrafikPesanan,
                            datasets: [{
                                label: 'Penjualan Pesanan',
                                data: getDataGrafikPesanan,
                                borderColor: 'black',
                                borderWidth: 2,
                                tension: 0.3
                            }]
                        }}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: true
                                },
                                legend: {
                                    display: false
                                }
                            },
                            responsive: true,
                            scales: {
                                x: {
                                    display: true,
                                    ticks: {
                                        color: 'black'
                                    },
                                    title: {
                                        color: 'black'
                                    }
                                },
                                y: {
                                    display: true,
                                    ticks: {
                                        color: 'black'
                                    },
                                    title: {
                                        color: 'black'
                                    }
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