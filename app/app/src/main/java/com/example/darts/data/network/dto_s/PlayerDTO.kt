package com.example.darts.data.network.dto_s

import com.example.darts.data.database.db_entities.DatabasePlayer
import com.example.darts.domain.Player
import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class NetworkPlayer(val id: Int, val name: String, val email: String)

fun List<NetworkPlayer>.asDomainModel(): List<Player> {
    return map {
        Player(
            id = it.id,
            name = it.name,
            email = it.email
        )
    }
}

fun NetworkPlayer.asDomainModel() = Player(
    id = id,
    name = name,
    email = email
)

fun List<NetworkPlayer>.asDatabaseModel(): Array<DatabasePlayer> {
    return map {
        DatabasePlayer(
            id = it.id,
            name = it.name,
            email = it.email
        )
    }.toTypedArray()
}