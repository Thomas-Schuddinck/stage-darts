package com.example.darts.data.database.db_entities

import androidx.room.Entity
import androidx.room.Ignore
import androidx.room.PrimaryKey
import com.example.darts.data.database.db_relationship_mappers.GameLegGroups
import com.example.darts.domain.Game
import com.example.darts.domain.LegGroup
import com.example.darts.domain.Player
import java.time.LocalDate

@Entity
data class DatabaseGame(
    @PrimaryKey
    val gameId: Int,
    val startDate: LocalDate,
    val endDate: LocalDate,
    @Ignore
    val players: List<Player>,
    @Ignore
    val legGroups: List<LegGroup>

)

fun List<GameLegGroups>.asDomainModel(): List<Game>{
    return map {
        Game (
            gameId = it.game.gameId,
            startDate = it.game.startDate,
            endDate = it.game.endDate,
            players = emptyList(),
            legGroups = it.legGroupsPlayerLegs.asDomainModel()
        )
    }
}