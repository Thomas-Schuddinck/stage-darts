package com.example.darts.data.database.db_relationship_mappers

import androidx.room.Embedded
import androidx.room.Relation
import com.example.darts.data.database.db_entities.DatabaseDartThrow
import com.example.darts.data.database.db_entities.DatabaseTurn

data class TurnDartThrows(
    @Embedded
    var turn: DatabaseTurn,
    @Relation(parentColumn = "turnId", entityColumn = "turnId", entity = DatabaseDartThrow::class)
    val dartThrows: List<DatabaseDartThrow>
) {
}