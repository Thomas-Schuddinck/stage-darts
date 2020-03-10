package com.example.darts.data.database.db_relationship_mappers

import androidx.room.Embedded
import androidx.room.Relation
import com.example.darts.data.database.db_entities.DatabasePlayer
import com.example.darts.data.database.db_entities.DatabasePlayerLeg


data class PlayerPlayerLegs(
    @Embedded
    var player: DatabasePlayer,
    @Relation(parentColumn = "playerId", entityColumn = "playerId", entity = DatabasePlayerLeg::class)
    val playerLegsTurns: List<PlayerLegTurns>
) {
}