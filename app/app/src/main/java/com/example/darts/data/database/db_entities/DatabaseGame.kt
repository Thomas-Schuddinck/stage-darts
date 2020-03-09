package com.example.darts.data.database.db_entities

import androidx.room.PrimaryKey
import com.example.darts.domain.Game
import com.example.darts.domain.LegGroup
import com.example.darts.domain.Player
import java.time.LocalDate

data class DatabaseGame constructor(
    @PrimaryKey
    val gameId: Int,
    val startDate: LocalDate,
    val endDate: LocalDate
    /*
    val players: List<Player>,
    val legGroups: List<LegGroup>
    */
)

fun List<DatabaseGame>.asDomainModel(): List<Game>{
    return map {
        Game (
            gameId = it.gameId,
            startDate = it.startDate,
            endDate = it.endDate,
            players = emptyList(),
            legGroups = emptyList()
        )
    }
}