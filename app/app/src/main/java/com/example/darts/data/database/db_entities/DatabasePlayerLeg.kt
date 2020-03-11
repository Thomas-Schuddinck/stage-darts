package com.example.darts.data.database.db_entities

import androidx.room.Entity
import androidx.room.ForeignKey
import androidx.room.Ignore
import androidx.room.PrimaryKey
import com.example.darts.data.database.db_relationship_mappers.PlayerLegTurns
import com.example.darts.domain.PlayerLeg

@Entity
data class DatabasePlayerLeg(
    @PrimaryKey
    val playerLegId: Int,
    val currentScore : Int,
    @Ignore
    val turns: List<DatabaseTurn>,
    @ForeignKey(entity = DatabaseLegGroup::class, parentColumns = ["legGroupId"], childColumns = ["legGroupId"], onDelete = ForeignKey.CASCADE)
    val legGroupId: Int,
    @ForeignKey(entity = DatabasePlayer::class, parentColumns = ["playerId"], childColumns = ["playerId"], onDelete = ForeignKey.CASCADE)
    val playerId: Int


)
fun List<PlayerLegTurns>.asDomainModel(): List<PlayerLeg>{

    return map {
        PlayerLeg (
            playerLegId = it.playerLeg.playerLegId,
            currentScore = it.playerLeg.currentScore,
            player = it.playerLeg.playerId,
            turns = it.turnsDartThrows.asDomainModel()
        )
    }
}
