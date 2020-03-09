package com.example.darts.data.network.dto_s

import com.example.darts.data.database.db_entities.DatabasePlayer
import com.example.darts.domain.DartThrow
import com.example.darts.domain.Player
import com.example.darts.domain.Turn
import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class NetworkTurn(val turnId: Int,
                       val turnNr : Int,
                       val dartThrows: List<NetworkDartThrow>)

fun List<NetworkTurn>.asDomainModel(): List<Turn> {
    return map {
        Turn(
            turnId = it.turnId,
            turnNr = it.turnNr,
            dartThrows = it.dartThrows.asDomainModel()
        )
    }
}

/*
fun List<NetworkTurn>.asDatabaseModel(): Array<DatabaseTurn> {
    return map {
        DatabaseTurn(
            turnId = it.turnId,
            turnNr = it.turnNr,
            dartThrows = it.dartThrows.asDomainModel()
        )
    }.toTypedArray()
}*/