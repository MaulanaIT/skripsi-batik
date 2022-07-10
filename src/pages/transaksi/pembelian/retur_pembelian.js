import React, { useState, useEffect } from 'react'

// Import Library
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import { MdAdd } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa';
import { baseURL, Calculate, config, GenerateCode, HideLoading, InputFormatNumber, ShowLoading } from '../../../component/helper';

// Import CSS
import global from '../../../css/global.module.css';
import style from '../../../css/transaksi/pembelian/retur_pembelian.module.css';

const CustomSelect = {
    control: (provided, state) => ({
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        color: 'white',
        cursor: 'pointer',
        display: 'flex',
        fontSize: 12
    }),
    input: (provided, state) => ({
        ...provided,
        color: 'white'
    }),
    menu: (provided, state) => ({
        backgroundColor: 'rgba(0, 0, 0, 3)',
        fontSize: 12,
        position: 'absolute',
        width: '100%',
        zIndex: 1
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.4)',
        fontSize: 12
    }),
    placeholder: (provided, state) => ({
        ...provided,
        whiteSpace: 'nowrap'
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: 'white',
        fontSize: 12
    })
}

export default function Retur_pembelian() {

    const [getDataAlat, setDataAlat] = useState([]);
    const [getDataBahan, setDataBahan] = useState([]);
    const [getDataItem, setDataItem] = useState([]);
    const [getDataPengeluaranKas, setDataPengeluaranKas] = useState([]);
    const [getDataRetur, setDataRetur] = useState([]);

    const [getDataSelectKodeItem, setDataSelectKodeItem] = useState([]);
    const [getDataSelectNamaItem, setDataSelectNamaItem] = useState([]);
    const [getDataSelectKodePengeluaranKas, setDataSelectKodePengeluaranKas] = useState([]);
    const [getDataSelectKodeSupplier, setDataSelectKodeSupplier] = useState([]);
    const [getDataSelectNamaSupplier, setDataSelectNamaSupplier] = useState([]);

    const [getHTMLTableDaftarAlat, setHTMLTableDaftarAlat] = useState([]);
    const [getHTMLTableDaftarBahan, setHTMLTableDaftarBahan] = useState([]);

    const [getValueHarga, setValueHarga] = useState(0);
    const [getValueJumlah, setValueJumlah] = useState(0);
    const [getValueJumlahRetur, setValueJumlahRetur] = useState(0);
    const [getValueKalkulasiTotalHarga, setValueKalkulasiTotalHarga] = useState(0);
    const [getValueKodeItem, setValueKodeItem] = useState([]);
    const [getValueKodePengeluaranKas, setValueKodePengeluaranKas] = useState([]);
    const [getValueKodeRetur, setValueKodeRetur] = useState([]);
    const [getValueKodeSupplier, setValueKodeSupplier] = useState('');
    const [getValueNamaItem, setValueNamaItem] = useState([]);
    const [getValueNamaSupplier, setValueNamaSupplier] = useState('');
    const [getValueTanggal, setValueTanggal] = useState(moment().format('YYYY-MM-DD'));
    const [getValueTotalHarga, setValueTotalHarga] = useState(0);

    const [getJenisRetur, setJenisRetur] = useState('');

    useEffect(() => {
        GetRetur();
    }, []);

    useEffect(() => {
        GetKasKeluar();
        $('#table-data').DataTable();
    }, [getJenisRetur]);

    useEffect(() => {
        if (getValueKodePengeluaranKas) GetItem();
    }, [getValueKodePengeluaranKas]);

    useEffect(() => {
        if (+getValueJumlahRetur > +getValueJumlah) setValueJumlahRetur(getValueJumlah);

        setValueTotalHarga(Calculate([getValueJumlahRetur * getValueHarga]));
    }, [getValueJumlahRetur]);

    useEffect(() => {
        GetDetailAlat();
    }, [getDataAlat]);

    useEffect(() => {
        GetDetailBahan();
    }, [getDataBahan]);

    useEffect(() => {
        $('#table-data').DataTable();

        KalkulasiTotalHarga();

        HideLoading();
    }, [getHTMLTableDaftarAlat, getHTMLTableDaftarBahan]);

    const AddDetail = () => {
        if (getJenisRetur.toLowerCase() === 'alat') {
            let dataAlat = [...getDataAlat];

            let check = dataAlat.findIndex(item => item.kode_item === getValueKodeItem.value);

            if (check < 0) {
                dataAlat.push({
                    kode: getValueKodeRetur,
                    tanggal: getValueTanggal,
                    kode_supplier: getValueKodeSupplier,
                    nama_supplier: getValueNamaSupplier,
                    kode_alat: getValueKodeItem.value,
                    nama_alat: getValueNamaItem.label,
                    kode_item: getValueKodeItem.value,
                    nama_item: getValueNamaItem.label,
                    jumlah: getValueJumlahRetur,
                    harga: getValueHarga,
                    total_harga: getValueTotalHarga
                });
            } else {
                dataAlat[check].jumlah = +dataAlat[check].jumlah + +getValueJumlahRetur;
                dataAlat[check].total_harga = +dataAlat[check].total_harga + +getValueTotalHarga;

                if (dataAlat[check].jumlah > getValueJumlah) {
                    dataAlat[check].jumlah = getValueJumlah;
                    dataAlat[check].total_harga = +getValueHarga * +getValueJumlah;
                }
            }

            setDataAlat(dataAlat);
            setValueKodeItem([]);
            setValueNamaItem([]);
            setValueJumlah(0);
            setValueJumlahRetur(0);
            setValueHarga(0);
            setValueTotalHarga(0);
        } else if (getJenisRetur.toLowerCase() === 'bahan') {
            let dataBahan = [...getDataBahan];

            let check = dataBahan.findIndex(item => item.kode_item === getValueKodeItem.value);

            if (check < 0) {
                dataBahan.push({
                    kode: getValueKodeRetur,
                    tanggal: getValueTanggal,
                    kode_supplier: getValueKodeSupplier,
                    nama_supplier: getValueNamaSupplier,
                    kode_bahan: getValueKodeItem.value,
                    nama_bahan: getValueNamaItem.label,
                    kode_item: getValueKodeItem.value,
                    nama_item: getValueNamaItem.label,
                    jumlah: getValueJumlahRetur,
                    harga: getValueHarga,
                    total_harga: getValueTotalHarga
                });
            } else {
                dataBahan[check].jumlah = +dataBahan[check].jumlah + +getValueJumlahRetur;
                dataBahan[check].total_harga = +dataBahan[check].total_harga + +getValueTotalHarga;

                if (dataBahan[check].jumlah > getValueJumlah) {
                    dataBahan[check].jumlah = getValueJumlah;
                    dataBahan[check].total_harga = +getValueHarga * +getValueJumlah;
                }
            }

            setDataBahan(dataBahan);
            setValueKodeItem([]);
            setValueNamaItem([]);
            setValueJumlah(0);
            setValueJumlahRetur(0);
            setValueHarga(0);
            setValueTotalHarga(0);
        }
    }

    const DeleteAlat = (id) => {
        let dataAlat = getDataAlat;

        dataAlat.splice(id, 1);

        setDataAlat(dataAlat);
    }

    const DeleteBahan = (id) => {
        let dataBahan = getDataBahan;

        dataBahan.splice(id, 1);

        setDataBahan(dataBahan);
    }

    const GetDetailAlat = () => {
        ShowLoading();

        let htmlTableDaftarAlat = [];

        if (getDataAlat.length > 0) {
            getDataAlat.forEach((item, index) => {
                htmlTableDaftarAlat.push(
                    <tr key={index}>
                        <td>{index + 1}.</td>
                        <td>{item.kode}</td>
                        <td>{item.kode_alat}</td>
                        <td>{item.nama_alat}</td>
                        <td>{item.satuan}</td>
                        <td>{item.jumlah}</td>
                        <td>{item.harga}</td>
                        <td>{item.total_harga}</td>
                        <td className={global.table_action}>
                            <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteAlat(item.id)}><FaTrash />Delete</button>
                        </td>
                    </tr>
                );
            });
        }

        $('#table-data').DataTable().destroy();

        setHTMLTableDaftarAlat(htmlTableDaftarAlat);
    }

    const GetDetailBahan = () => {
        ShowLoading();

        let htmlTableDaftarBahan = [];

        if (getDataBahan.length > 0) {
            getDataBahan.forEach((item, index) => {
                htmlTableDaftarBahan.push(
                    <tr key={index}>
                        <td>{index + 1}.</td>
                        <td>{item.kode}</td>
                        <td>{item.kode_bahan}</td>
                        <td>{item.nama_bahan}</td>
                        <td>{item.satuan}</td>
                        <td>{item.jumlah}</td>
                        <td>{item.harga}</td>
                        <td>{item.total_harga}</td>
                        <td className={global.table_action}>
                            <button type='button' id='button-delete' className={global.delete} onClick={() => this.DeleteBahan(item.id)}><FaTrash />Delete</button>
                        </td>
                    </tr>
                );
            });
        }

        $('#table-data').DataTable().destroy();

        setHTMLTableDaftarBahan(htmlTableDaftarBahan);
    }

    const GetItem = () => {
        const formData = new FormData();

        formData.append('kode', getValueKodePengeluaranKas.value);

        axios.post(`${baseURL}/api/transaksi/pembelian/detail-pengeluaran-kas/select.php`, formData, config).then(response => {
            let data = response.data.data;

            let dataSelectKodeItem = [];
            let dataSelectNamaItem = [];

            if (data.length > 0) {
                data.forEach(item => {
                    dataSelectKodeItem.push({
                        value: item.kode_item,
                        label: item.kode_item
                    });

                    dataSelectNamaItem.push({
                        value: item.kode_item,
                        label: item.nama_item
                    });
                });
            }

            setDataItem(data);
            setDataSelectKodeItem(dataSelectKodeItem);
            setDataSelectNamaItem(dataSelectNamaItem);
        }).catch(error => {
            console.log(error);
        });
    }

    const GetKasKeluar = async () => {
        ShowLoading();

        const formData = new FormData();

        formData.append('jenis_retur', getJenisRetur.toLowerCase());

        axios.post(`${baseURL}/api/transaksi/pembelian/retur/select-pengeluaran-kas.php`, formData, config).then(response => {
            let data = response.data.data;

            let dataSelectKodeKasKeluar = [];

            if (data && data.length > 0) {
                data.forEach(item => {
                    dataSelectKodeKasKeluar.push({
                        value: item.kode,
                        label: item.kode
                    });
                })
            }

            setDataPengeluaranKas(data);
            setDataSelectKodePengeluaranKas(dataSelectKodeKasKeluar);

            HideLoading();
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    const GetRetur = async () => {
        axios.get(`${baseURL}/api/transaksi/pembelian/retur/select.php`, config).then(response => {
            let dataRetur = response.data.data;

            setDataRetur(dataRetur);
            setValueKodeRetur(GenerateCode('RET', dataRetur));
        }).catch(error => {
            console.log(error);
        });
    }

    const InsertRetur = () => {
        let jenisRetur = getJenisRetur;

        ShowLoading();

        const formData = new FormData();

        let file = document.getElementById('input-file-nota').files[0];
        let arg = file.name.split('.');
        let extension = arg[arg.length - 1];

        formData.append('kode', getValueKodeRetur);
        formData.append('kode_kas_keluar', getValueKodePengeluaranKas.value);
        formData.append('tanggal', getValueTanggal);
        formData.append('kode_supplier', getValueKodeSupplier);
        formData.append('total_harga', getValueKalkulasiTotalHarga);
        formData.append('file_nota', file);
        formData.append('nama_file', `File Nota Pembelian - ${getValueKodeRetur} - ${getValueTanggal}.${extension}`);

        formData.append('jenis_retur', jenisRetur.toLowerCase());

        if (jenisRetur.toLowerCase() === 'alat')
            formData.append('data', JSON.stringify(getDataAlat));
        else if (jenisRetur.toLowerCase() === 'bahan')
            formData.append('data', JSON.stringify(getDataBahan));

        axios.post(`${baseURL}/api/transaksi/pembelian/retur/insert.php`, formData, config).then(() => {
            window.location.href = '/transaksi/pembelian/daftar-retur';
        }).catch(error => {
            console.log(error);

            HideLoading();
        });
    }

    const KalkulasiTotalHarga = () => {
        let totalHarga = 0;
        let jenisRetur = getJenisRetur;

        if (jenisRetur && jenisRetur.toString().toLowerCase() === 'alat') {
            let dataAlat = getDataAlat;

            dataAlat.forEach(item => {
                totalHarga += item.total_harga;
            });
        } else if (jenisRetur && jenisRetur.toString().toLowerCase() === 'bahan') {
            let dataBahan = getDataBahan;

            dataBahan.forEach(item => {
                totalHarga += item.total_harga;
            });
        }

        setValueKalkulasiTotalHarga(totalHarga);
    }

    const SelectItem = (data) => {
        if (data) {
            let valueKode = getDataSelectKodeItem.find(item => item.value === data?.value);
            let valueNama = getDataSelectNamaItem.find(item => item.value === data?.value);

            let dataItem = getDataItem.find(item => item.kode_item === valueKode.value);

            setValueKodeItem(valueKode);
            setValueNamaItem(valueNama);
            setValueJumlah(dataItem.jumlah);
            setValueHarga(dataItem.harga);
        } else {
            setValueKodeItem('');
            setValueNamaItem('');
        }
    }

    const SelectKodePengeluaranKas = (data) => {
        if (data) {
            let dataPengeluaranKas = getDataPengeluaranKas.find(item => item.kode === data.value);

            setValueKodePengeluaranKas(data);
            setValueKodeSupplier(dataPengeluaranKas.kode_supplier);
            setValueNamaSupplier(dataPengeluaranKas.nama_supplier);
        } else {
            setValueKodePengeluaranKas([]);
            setValueKodeSupplier('');
            setValueNamaSupplier('');
        }
    }

    const SelectRetur = (data) => {
        $('#table-data').DataTable().destroy();

        setDataAlat([]);
        setDataBahan([]);
        setJenisRetur(data ? data.value : '');
        setValueHarga(0);
        setValueJumlah(0);
        setValueJumlahRetur(0);
        setValueKodePengeluaranKas(null);
        setValueKodeItem(null);
        setValueNamaItem(null);
        setValueKodeSupplier('');
        setValueNamaSupplier('');
    }

    return (
        <React.Fragment>
            <div className={style.header}>
                <p className={style.title}>Retur Pembelian</p>
                <p className={style.pathname}>Transaksi / Pembelian / Retur Pembelian</p>
            </div>
            <div className={style.content}>
                <div className={`col-12 col-md-6 pe-md-2 pb-2 pb-md-0`}>
                    <div className={`${global.card}`}>
                        <p className={global.title}>Input Retur Pembelian</p>
                        <div className={`${global.input_group} col-4 pe-2`}>
                            <p className={global.title}>Jenis Retur</p>
                            <Select isClearable={true} isSearchable={true} options={[
                                { value: 'Bahan', label: 'Bahan' },
                                { value: 'Alat', label: 'Alat' }
                            ]} placeholder={'Select Retur...'} styles={CustomSelect} onChange={(value) => SelectRetur(value)} />
                        </div>
                        {getJenisRetur !== '' ?
                            <>
                                <div className={`d-flex`}>
                                    <div className={`${global.input_group} col-6 pe-2`}>
                                        <p className={global.title}>Kode Retur</p>
                                        <input type="text" id='valueKodeRetur' maxLength={10} value={getValueKodeRetur} readOnly={true} />
                                    </div>
                                    <div className={`${global.input_group} col-6 ps-2`}>
                                        <p className={global.title}>Tanggal</p>
                                        <input type="date" id='valueTanggal' value={getValueTanggal} onChange={e => setValueTanggal(e.target.value)} />
                                    </div>
                                </div>
                                <div className={`${global.input_group} col-6 pe-2`}>
                                    <p className={global.title}>Kode Kas Keluar</p>
                                    <Select escapeClearsValue={false} isClearable={true} isSearchable={true} options={getDataSelectKodePengeluaranKas} placeholder={'Select Kode...'} value={getValueKodePengeluaranKas} onChange={(data) => SelectKodePengeluaranKas(data)} styles={CustomSelect} isDisabled={(getDataAlat.length > 0 || getDataBahan.length > 0) ?? false} />
                                </div>
                                <div className={`d-flex`}>
                                    <div className={`${global.input_group} col-3 pe-2`}>
                                        <p className={global.title}>Kode Supplier</p>
                                        <input type="text" id='valueKodeSupplier' maxLength={10} value={getValueKodeSupplier} readOnly={true} />
                                    </div>
                                    <div className={`${global.input_group} col-5 ps-2`}>
                                        <p className={global.title}>Nama Supplier</p>
                                        <input type="text" id='valueNamaSupplier' maxLength={10} value={getValueNamaSupplier} readOnly={true} />
                                    </div>
                                </div>
                                {getJenisRetur === 'Bahan' ?
                                    <>
                                        <div className={`d-flex`}>
                                            <div className={`${global.input_group} col-5 pe-2`}>
                                                <p className={global.title}>Kode Bahan</p>
                                                <Select id='select-kode-bahan' isClearable={true} isSearchable={true} options={getDataSelectKodeItem} placeholder={'Select Kode...'} styles={CustomSelect} value={getValueKodeItem} onChange={(data) => SelectItem(data)} />
                                            </div>
                                            <div className={`${global.input_group} col-7 pe-2`}>
                                                <p className={global.title}>Nama Bahan</p>
                                                <Select id='select-nama-bahan' isClearable={true} isSearchable={true} options={getDataSelectNamaItem} placeholder={'Select Nama...'} styles={CustomSelect} value={getValueNamaItem} onChange={(data) => SelectItem(data)} />
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className={`d-flex`}>
                                            <div className={`${global.input_group} col-5 pe-2`}>
                                                <p className={global.title}>Kode Alat</p>
                                                <Select id='select-kode-alat' isClearable={true} isSearchable={true} options={getDataSelectKodeItem} placeholder={'Select Kode...'} styles={CustomSelect} value={getValueKodeItem} onChange={(data) => SelectItem(data)} />
                                            </div>
                                            <div className={`${global.input_group} col-7 pe-2`}>
                                                <p className={global.title}>Nama Alat</p>
                                                <Select id='select-nama-alat' isClearable={true} isSearchable={true} options={getDataSelectNamaItem} placeholder={'Select Nama...'} styles={CustomSelect} value={getValueNamaItem} onChange={(data) => SelectItem(data)} />
                                            </div>
                                        </div>
                                    </>
                                }
                                <div className={`d-flex`}>
                                    <div className={`${global.input_group} col-3 pe-2`}>
                                        <p className={global.title}>Jumlah</p>
                                        <input type="text" id='valueJumlah' className='text-end' value={getValueJumlah} readOnly={true} />
                                    </div>
                                    <div className={`${global.input_group} col-3 px-2`}>
                                        <p className={global.title}>Jumlah Retur</p>
                                        <input type="text" id='valueJumlahRetur' className='text-end' value={getValueJumlahRetur} onInput={InputFormatNumber} onChange={e => setValueJumlahRetur(e.target.value)} />
                                    </div>
                                    <div className={`${global.input_group} col-3 px-2`}>
                                        <p className={global.title}>Harga</p>
                                        <input type="text" id='valueHarga' className='text-end' value={getValueHarga} readOnly={true} />
                                    </div>
                                    <div className={`${global.input_group} col-3 ps-2`}>
                                        <p className={global.title}>Total Harga</p>
                                        <input type="text" id='valueTotalHarga' className='text-end' value={getValueTotalHarga} readOnly={true} />
                                    </div>
                                </div>
                                <button type='button' className={global.button} onClick={AddDetail}><MdAdd /> Tambah</button>
                            </>
                            : null}
                    </div>
                </div>
                {getJenisRetur !== '' ?
                    <div className={`col-12 col-md-6 ps-md-2 pt-2 pt-md-0`}>
                        <div className={global.card}>
                            <div className={`${global.header}`}>
                                <p className={global.title}>Daftar Retur Pembelian</p>
                            </div>
                            {getJenisRetur === 'Bahan' ?
                                <>
                                    <div className={`table-responsive`}>
                                        <table id='table-data' className={`table w-100`}>
                                            <thead>
                                                <tr>
                                                    <td>No.</td>
                                                    <td>Kode</td>
                                                    <td>Kode Bahan</td>
                                                    <td>Nama Bahan</td>
                                                    <td>Satuan</td>
                                                    <td>Jumlah Retur</td>
                                                    <td>Harga</td>
                                                    <td>Total Harga</td>
                                                    <td>Aksi</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getHTMLTableDaftarBahan}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                                :
                                <>
                                    <div className={`table-responsive`}>
                                        <table id='table-data' className={`table w-100`}>
                                            <thead>
                                                <tr>
                                                    <td>No.</td>
                                                    <td>Kode</td>
                                                    <td>Kode Alat</td>
                                                    <td>Nama Alat</td>
                                                    <td>Satuan</td>
                                                    <td>Jumlah Retur</td>
                                                    <td>Harga</td>
                                                    <td>Total Harga</td>
                                                    <td>Aksi</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getHTMLTableDaftarAlat}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            }
                            <div className={`d-flex flex-column gap-2 pb-2`}>
                                <div className={`align-items-center ${global.input_group_row}`}>
                                    <p className={`${global.title} col-3`}>Total Harga</p>
                                    <input type="text" id='valueKalkulasiTotalHarga' value={getValueKalkulasiTotalHarga} readOnly={true} />
                                </div>
                                <div className='align-items-center d-flex justify-content-between'>
                                    <p>Upload Nota Pembelian</p>
                                    <input type="file" accept='.pdf' id='input-file-nota' name='input-file-nota' />
                                </div>
                            </div>
                            <div className='d-flex flex-column gap-2 pt-2'>
                                <div className='d-flex'>
                                    <div className='col-6 pe-2'>
                                        <button type='button' className={`${global.button} w-100`} onClick={InsertRetur}>Simpan</button>
                                    </div>
                                    <div className='col-6 ps-2'>
                                        <button type='button' className={`${global.button} w-100`} style={{ "--button-first-color": '#8e0000', "--button-second-color": '#a06565' }}>Batal</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null}
            </div>
        </React.Fragment>
    )
}