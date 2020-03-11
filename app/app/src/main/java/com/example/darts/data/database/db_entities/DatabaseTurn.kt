package com.example.darts.data.database.db_entities

import androidx.room.Entity
import androidx.room.ForeignKey
import androidx.room.Ignore
import androidx.room.PrimaryKey
import com.example.darts.data.database.db_relationship_mappers.TurnDartThrows
import com.example.darts.data.network.dto_s.NetworkTurn
import com.example.darts.domain.DartThrow
import com.example.darts.domain.PlayerLeg
import com.example.darts.domain.Turn

@Entity
data class DatabaseTurn(
    @PrimaryKey
    val turnId: Int,
    val turnNr : Int,
    @Ignore
    val dartThrows: List<DatabaseDartThrow>,
    @ForeignKey(entity = DatabasePlayerLeg::class, parentColumns = ["playerLegId"], childColumns = ["playerLegId"], onDelete = ForeignKey.CASCADE)
    val playerLegId: Int
)

fun List<TurnDartThrows>.asDomainModel(): List<Turn>{
    return map {
        Turn (
            turnId = it.turn.turnId,
            turnNr = it.turn.turnNr,
            dartThrows = it.dartThrows.asDomainModel()
        )
    }
}