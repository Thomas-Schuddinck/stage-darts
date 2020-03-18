package com.example.darts.data.database.db_relationship_mappers

import androidx.room.Embedded
import androidx.room.Relation
import com.example.darts.data.database.db_entities.DatabaseLegGroup
import com.example.darts.data.database.db_entities.DatabasePlayerLeg
import com.example.darts.data.database.db_entities.DatabaseTurn


data class PlayerLegTurns(
    @Embedded
    var playerLeg: DatabasePlayerLeg,

    @Relation(parentColumn = "playerLegId", entityColumn = "playerLegId", entity = DatabaseTurn::class)
    val turnsDartThrows: List<TurnDartThrows>
) {
}