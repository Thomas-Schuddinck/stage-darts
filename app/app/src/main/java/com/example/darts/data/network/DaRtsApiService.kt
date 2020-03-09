package com.example.darts.data.network

import com.example.darts.data.network.dto_s.NetworkGame
import kotlinx.coroutines.Deferred
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.PUT
import retrofit2.http.Path

interface DaRtsApiService {
    @GET("Game/{gameId}")
    fun getGameByIdTaskTeamsFromUser(@Path("gameId") gameId: Int): Deferred<List<NetworkGame>>

}