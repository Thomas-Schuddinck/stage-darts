package com.example.darts.data.network.dto_s

import com.example.darts.data.database.db_entities.DatabaseGame
import com.example.darts.domain.Game
import com.example.darts.domain.LegGroup
import com.squareup.moshi.JsonClass
import java.time.LocalDate

@JsonClass(generateAdapter = true)
data class NetworkGame(
    val gameId: Int,
    val startDate: LocalDate,
    val endDate: LocalDate,
    val players: List<NetworkPlayer>,
    val legGroups: List<NetworkLegGroup>
)


fun List<NetworkGame>.asDomainModel(): List<Game> {
    return map {
        Game(
            gameId = it.gameId,
            startDate = it.startDate,
            endDate = it.endDate,
            players = it.players.asDomainModel(),
            legGroups = it.legGroups.asDomainModel()
        )
    }
}
/*
fun List<NetworkGame>.asDatabaseModel(): Array<DatabaseGame> {
    return map {
        DatabaseGame(
            gameId = it.gameId,
            startDate = it.startDate,
            endDate = it.endDate,
            players = it.players.asDomainModel(),
            legGroups = it.legGroups.asDomainModel()
        )
    }.toTypedArray()
}

 */