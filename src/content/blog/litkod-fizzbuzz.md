---
title: "#LitKod FizzBuzz Problem in Swift"
description: "Posting percobaan untuk verifikasi"
pubDate: 2025-12-22
tags: ["Swift", "DSA", "LeetCode"]
---

Karena banyak denger problem ini bikin Junior (seperti saya) gagal pas technical test, jadi memutuskan untuk menulis solusinya di sini.
Problem ini ada di LeetCode <u>[FizzBuzz](https://leetcode.com/problems/fizz-buzz/description/)</u>. Intinya kita diberikan suatu range angka, sebut saja n, dan kita diminta untuk me-return array dengan kondisi:

- Multiples dari 3 dan 5 → print("FizzBuzz")
- Multiples dari 3 → print("Fizz")
- Multiples dari 5 → print("Buzz")
- Selain dari angka itu → print(i) (tapi i-nya di-cast ke string)

n ini adalah batas range yang harus kita loop sampai ke n nantinya. Lebih jelasnya liat contoh test cases berikut:
```
Example 1:
Input: n = 3
Output: ["1","2","Fizz"]
```

```
Example 2:
Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]
```

```
Example 3:
Input: n = 15
Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]
```

Kalau dari LeetCode-nya sendiri, string FizzBuzz-nya diminta di-append ke dalam bentuk array, tapi logic dibaliknya tetap sama.
Berikut adalah kode solusinya:
```swift
class Solution {
    func fizzBuzz(_ n: Int) -> [String] {
        var arr = [String]()
        for i in 1...n {
            if i.isMultiple(of: 3) && i.isMultiple(of: 5) {
                arr.append("FizzBuzz")
            } else if i.isMultiple(of: 3) {
                arr.append("Fizz")
            } else if i.isMultiple(of: 5) {
                arr.append("Buzz")
            } else {
                arr.append("\(i)")
            }
        }
        return arr
    }
}
```

Pertama, kita cari dulu kondisi paling spesifiknya, yaitu 3 & 5 → FizzBuzz, ini yang harus ditaruh di pengecekan pertama. Kesalahan klasik (yang pernah saya lakukan juga) itu menaruhnya di paling akhir. Ini biasanya jebakan dari soal juga, di mana otak kita otomatis ngikut urutan logic yang diberikan soal. Intinya selalu ingat aja yang 3 dan 5 harus dicek di paling awal.

Setelah pengecekan FizzBuzz, sisanya terserah mau 3 atau 5 yang dicek di urutan kedua. Terakhir, untuk kondisi selain yang tertera, kita harus meng-append angka ke dalam array-nya, tapi ingat harus dalam bentuk string jadi kita pakai string interpolation aja.

Time complexity solusi di atas adalah O(n) di mana kita mengiterasi dari angka 1 sampai n, jadi semakin banyak angka semakin besar n. Space complexity-nya adalah O(n) juga, karena kita menyimpan hasilnya dalam array dengan ukuran n. Kalau langsung di-print maka space complexity-nya jadi O(1).
<br>
<br>

<br>

<br>

<br>

