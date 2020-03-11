package com.example.darts.data.database.db_relationship_mappers

import androidx.room.Embedded
import androidx.room.Relation
import com.example.darts.data.database.db_entities.DatabaseGame
import com.example.darts.data.database.db_entities.DatabaseLegGroup

data class GameLegGroups(
    @Embedded
    var game: DatabaseGame,
    @Relation(parentColumn = "gameId", entityColumn = "gameId", entity = DatabaseLegGroup::class)
    val legGroupsPlayerLegs: List<LegGroupPlayerLegs>
) {
}