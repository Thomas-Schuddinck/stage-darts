package com.example.darts.data.network.dto_s

import com.example.darts.domain.LegGroup
import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class NetworkLegGroup(
    val legGroupId: Int,
    val legNr : Int,
    val winner: Int,
    val playerLegs: List<NetworkPlayerLeg>
)


fun List<NetworkLegGroup>.asDomainModel(): List<LegGroup> {
    return map {
        LegGroup(
            legGroupId = it.legGroupId,
            legNr = it.legNr,
            winner = it.winner,
            playerLegs = it.playerLegs.asDomainModel()
        )
    }
}
/*
fun List<NetworkLegGroup>.asDatabaseModel(): Array<DatabaseLegGroup {
    return map {
        DatabaseLegGroup(
            legGroupId = it.legGroupId,
            legNr = it.legNr,
            winner = it.winner,
            turns = it.turns.asDatabaseModel()
        )
    }.toTypedArray()
}

*/