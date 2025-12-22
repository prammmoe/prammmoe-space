---
title: "Perbedaan .sort() dan .sorted() di Swift"
description: ""
pubDate: 2025-12-22
tags: ["Swift", "SwiftUI", "Swift Programming"]
---

Karena saya pribadi seringkali masih salah menggunakan .sort() dan .sorted(), jadi saya tulis saja di sini sekalian sebagai catatan pribadi.

## sort()

.sort() adalah method yang melakukan mutasi langsung ke sebuah array, yang artinya dia merubah langsung element original dari sebuah array, bukan meng-copy array original dan men-sort array-nya di array baru. Analoginya seperti kita mau sortir lemari buku, tapi kita langsung memindahkan buku-buku yang ada di lemari itu satu per satu.

Contoh:

```swift
var bestSoccerGame: [String] = ["Winning Eleven", "PES", "Fifa"]
bestSoccerGame.sort()
print(bestSoccerGame)
```

Method .sort() mengembalikan Void, makanya tidak bisa disimpan ke dalam variable dan juga tidak bisa di-print langsung. Dia harus dipanggil dulu kemudian baru bisa di-print nilainya.

Kalau kita cek (Cmd + Click) ke .sort(), bisa terlihat juga kalau dia adalah mutating func.

`@inlinable public mutating func sort()`

## sorted()

.sorted() adalah method yang melakukan sorting array, tapi dia meng-copy array original dan dibuatkan array baru, berbeda dengan .sort() yang langsung memutasi array original. Analoginya sama seperti kalau kita mau mensortir buku di lemari, tapi kita sediakan lemari baru lalu memindahkan bukunya satu per satu sesuai urutan yang kita inginkan ke lemari baru.

Contoh:

```swift
var bestSoccerGame: [String] = ["Winning Eleven", "PES", "Fifa"]
let sortedBestSoccerGame = bestSoccerGame.sorted()
print(sortedBestSoccerGame)
```

Pada kode di atas, .sorted() akan meng-copy array original, melakukan sorting, kemudian mengembalikan nilainya sehingga harus disimpan di variable.

Kalau .sort() adalah mutating func yang boleh mengubah isi Struct atau Enum, maka .sorted hanyalah public func biasa.

`@inlinable public func sorted() -> [Element]`

## Jadi, kapan penggunaan .sort() dan .sorted() yang aman?

Sejauh pengetahuan dan pengalaman saya, meskipun frekuensi menggunakan .sort() lebih jarang, namun .sort() seharusnya aman digunakan di event handler seperti button.

```swift
@State private var items = [3, 1, 2]

var body: some View {
    VStack {
        Button("Sort ascending") {
            items.sort()   // aman, mutasi terjadi di action UI event
        }

        List(items, id: \.self) { Text("\($0)") }
    }
}
```

Lalu untuk .sorted() sendiri, dia biasanya lebih stabil dan aman digunakan di manapun, tapi harus hati-hati kalau datanya sangat besar, misal mengurutkan 10000 data json sekaligus di dalam body, yang mana berarti Swift akan membuat array baru sebanyak 10000 elemen setiap kali dipanggil.

Contoh .sorted() yang aman:

```swift
class VM: ObservableObject {
    @Published var items = [Model]()
    @Published var sorted = [Model]()

    func sortByName() { 
        sorted = items.sorted { $0.name < $1.name }
    }
}
```

.sorted() di atas aman karena diletakkan di dalam viewModel, yang mana “seharusnya” jarang dipanggil. Di use case asli seharusnya kita bisa meng-cache hasil sorting atau pakai flag didSort . Tapi hal ini balik lagi gimana developer menangani rendering view. Kalau digunakan di .onAppeardan sort dipanggil berulang setiap kali view di-render tetap akan resource expensive juga.