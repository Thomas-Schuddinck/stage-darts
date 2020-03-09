package com.example.darts.data.network.dto_s

import com.example.darts.domain.Player
import com.example.darts.domain.PlayerLeg
import com.example.darts.domain.Turn
import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class NetworkPlayerLeg(
    val playerLegId: Int,
    val currentScore : Int,
    val player: NetworkPlayer,
    val turns: List<NetworkTurn>
)


fun List<NetworkPlayerLeg>.asDomainModel(): List<PlayerLeg> {
    return map {
        PlayerLeg(
            playerLegId = it.playerLegId,
            currentScore = it.currentScore,
            player = it.player.asDomainModel(),
            turns = it.turns.asDomainModel()
        )
    }
}
/*
fun List<NetworkPlayerLeg>.asDatabaseModel(): Array<DatabaseTaskTeam> {
    return map {
        DatabaseTaskTeam(
            teamId = it.teamId,
            teamName = it.teamName,
            description = it.description,
            ownerId = it.ownerId,
            users = it.users,
            tasks = it.tasks)
    }.toTypedArray()
}
*/