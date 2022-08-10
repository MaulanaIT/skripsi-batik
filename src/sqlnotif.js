SELECT
    `kode` AS `kode`,
    `nama` AS `nama`,
    `jumlah` AS `jumlah`,
    `stok_minimal` AS `stok_minimal`,
    `harga` AS `harga`,
    `created_at` AS `created_at`,
    `updated_at` AS `updated_at`
FROM
    `master_inventory_bahanbaku`
WHERE
    `jumlah` <= `stok_minimal`
UNION
SELECT
    `kode` AS `kode`,
    `nama` AS `nama`,
    `jumlah` AS `jumlah`,
    `stok_minimal` AS `stok_minimal`,
    `harga` AS `harga`,
    `created_at` AS `created_at`,
    `updated_at` AS `updated_at`
FROM
    `master_inventory_bahanpenolong`
WHERE
    `jumlah` <= `stok_minimal`
UNION
SELECT
    `kode` AS `kode`,
    `nama` AS `nama`,
    `jumlah` AS `jumlah`,
    `stok_minimal` AS `stok_minimal`,
    `harga_jual` AS `harga`,
    `created_at` AS `created_at`,
    `updated_at` AS `updated_at`
FROM
    `master_inventory_produk`
WHERE
    `jumlah` <= `stok_minimal`
UNION
SELECT
    `kode` AS `kode`,
    `nama` AS `nama`,
    `jumlah` AS `jumlah`,
    NULL AS `stok_minimal`,
    `harga_jual` AS `harga`,
    `created_at` AS `created_at`,
    `updated_at` AS `updated_at`
FROM
    `estimasi_pesanan`
WHERE
    `notifikasi` = 0 AND `status` < 2
UNION
SELECT
    `kode` AS `kode`,
    `kode_produk` AS `nama`,
    `jumlah` AS `jumlah`,
    NULL AS `stok_minimal`,
    NULL AS `harga`,
    `created_at` AS `created_at`,
    `updated_at` AS `updated_at`
FROM
    `permintaan_stok`
WHERE
    `status` = 1
ORDER BY
    `updated_at`