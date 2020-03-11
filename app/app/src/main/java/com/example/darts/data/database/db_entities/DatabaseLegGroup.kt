package com.example.darts.data.database.db_entities

import androidx.room.Entity
import androidx.room.ForeignKey
import androidx.room.ForeignKey.CASCADE
import androidx.room.Ignore
import androidx.room.PrimaryKey
import com.example.darts.data.database.db_relationship_mappers.LegGroupPlayerLegs
import com.example.darts.domain.LegGroup

@Entity
data class DatabaseLegGroup(
    @PrimaryKey
    val legGroupId: Int,
    val legNr : Int,
    val winner: Int,
    @Ignore
    val playerLegs: List<DatabasePlayerLeg>,
    @ForeignKey(entity = DatabaseGame::class, parentColumns = ["gameId"], childColumns = ["gameId"], onDelete = CASCADE)
    var gameId: Int

)


fun List<LegGroupPlayerLegs>.asDomainModel(): List<LegGroup>{
    return map {
        LegGroup (
            legGroupId = it.legGroup.legGroupId,
            legNr = it.legGroup.legNr,
            winner = it.legGroup.winner,
            playerLegs = it.playerLegsTurns.asDomainModel()
        )
    }
}

