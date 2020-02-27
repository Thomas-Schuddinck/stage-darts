package com.example.darts.domain

import com.example.darts.data.database.DaRtsDatabase
import com.example.darts.data.network.DaRtsApiService

class DaRtsRepository(private val apiService: DaRtsApiService, private val database: DaRtsDatabase) {
    fun loginUser(email: String, password: String) {

    }
}