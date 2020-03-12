package com.example.darts.data.database.db_relationship_mappers

import androidx.room.Embedded
import androidx.room.Relation
import com.example.darts.data.database.db_entities.DatabaseGame
import com.example.darts.data.database.db_entities.DatabaseLegGroup
import com.example.darts.data.database.db_entities.DatabasePlayerLeg


data class LegGroupPlayerLegs(
    @Embedded
    var legGroup: DatabaseLegGroup,
    @Relation(parentColumn = "legGroupId", entityColumn = "legGroupId", entity = DatabasePlayerLeg::class)
    val playerLegsTurns: List<PlayerLegTurns>
) {
}