---
title: "LeetCode #2 — Two Sum"
description: "Catatan penyelesaian Two Sum di Swift menggunakan brute force dan hash map."
lang: id
pubDate: 2025-12-22
tags: ["Swift", "LeetCode", "DSA"]
---

Hai, ketemu lagi. Karena menulis menggunakan Bahasa Inggris sangat mengganggu perfeksionisme ku, aku bakal nyoba nulis pakai Bahasa Indonesia aja untuk problem-problem LeetCode yang kuselesaiin. At least sebagai catatan pribadi.

Two Sum adalah salah satu problem LeetCode easy yang kalau kalian buka list problem, pasti dia ada di posisi paling atas. Deskripsi dari problemnya (dengan bahasaku) kira-kira gini:

Ada 2 input, yaitu array bertipe integer dan sebuah integer target , return di dalam array yang jika ditambahkan akan menghasilkan nilai yang sama dengan target .

**Contoh:**

```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```

**Penyelesaian**

Kita bisa pakai cara paling naif seperti di bawah untuk menyelesaikan case ini, yaitu dengan bruteforce. Ya, walaupun ini akan menghasilkan time complexity O(n²) sih.

```swift
class Solution {
    func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
        guard !nums.isEmpty else { return [] } 
        for i in 0..<nums.count {
            for j in (i + 1)..<nums.count {
                if nums[i] + nums[j] == target {
                    return [i, j]
                }
            }
        }   
        return []
    }
}
```

Solusi di atas menjalankan dua loop, dengan variabel i dan j untuk menyimpan kedua index. Di dalam scope loop j , kita cek kondisi apakah pertambahannums pada indeks i dan j sama dengan nilai target . Jika iya, maka return indeks i dan j tersebut. Jangan lupa return array kosong kalau ga nemu elemen yang bisa ditambahin untuk dapat nilai target .

Solusi kedua yang aku coba dengan time complexity yang lebih baik adalah menggunakan dictionary dengan time complexity O(n).

```swift
func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
    var dict: [Int: Int] = [:]
    for (index, num) in nums.enumerated() {
        let complement = target - num
        if let complementIndex = dict[complement] {
            return [complementIndex, index]
        }
        dict[num] = index
    }
    return []
}
```

Sebenarnya solusi di atas sama dengan jika kita menggunakan hashmap di bahasa lain. Namun di Swift tipe datanya disebut Dictionary yang menyimpan key : value pairs dari sebuah data.

Di solusi di atas, pertama inisialisasi dulu dictionary kosong, kemudian iterasi indeks dan angka yang ada di array. Setelah itu, variabel complement akan berperan dalam mencari pasangan dari penjumlahan. Misal kita nyari 9 di array [1, 8] maka complement pertama akan menghasilkan angka 8. Karena angka 8 belum ada di dictionary, maka scope if di-skip dan akan langsung menyimpan dict[1] = 0. Di loop kedua, karena angka 8 sudah ketemu, tinggal mencari pasangannya lagi yaitu angka 1. Di pengecekan if yang kedua, angka 1 sudah ada di dictionary pada indeks 0. Jadi kode if akan dieksekusi dengan complementIndex = 0 dan langsung me-return complementIndex dan index yang mana adalah [0, 1] .

Sederhananya, solusi ini seperti mencari dengan logika “Setiap kali aku melihat sebuah angka, aku hitung angka pasangannya (complement). Kalau pasangannya sudah pernah muncul sebelumnya, berarti dua angka ini adalah solusi.”

