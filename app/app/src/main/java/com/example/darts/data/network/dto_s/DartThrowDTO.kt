package com.example.darts.data.network.dto_s

import com.example.darts.data.database.db_entities.DatabaseDartThrow
import com.example.darts.data.database.db_entities.DatabaseGame
import com.example.darts.domain.DartThrow
import com.example.darts.domain.Game
import com.squareup.moshi.JsonClass
import java.time.LocalDate

@JsonClass(generateAdapter = true)
data class NetworkDartThrow(
    val throwId: Int,
    val value : Int
)


fun List<NetworkDartThrow>.asDomainModel(): List<DartThrow> {
    return map {
        DartThrow(
            throwId = it.throwId,
            value = it.value
        )
    }
}
/*
fun List<NetworkDartThrow>.asDatabaseModel(): Array<DatabaseDartThrow> {
    return map {
        DatabaseDartThrow(
            id = it.throwId,
            value = it.value
        )
    }.toTypedArray()
}

 */