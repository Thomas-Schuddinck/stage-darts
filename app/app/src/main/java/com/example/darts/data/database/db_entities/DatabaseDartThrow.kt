package com.example.darts.data.database.db_entities

import androidx.room.Entity
import androidx.room.ForeignKey
import androidx.room.PrimaryKey
import com.example.darts.domain.DartThrow
import com.example.darts.domain.Player


@Entity
data class DatabaseDartThrow(
    @PrimaryKey
    val id : Int,
    val value: Int,
    @ForeignKey(entity = DatabaseTurn::class, parentColumns = ["turnId"], childColumns = ["turnId"], onDelete = ForeignKey.CASCADE)
    val turnId: Int
)

fun List<DatabaseDartThrow>.asDomainModel(): List<DartThrow>{
    return map {
        DartThrow(
            throwId = it.id,
            value = it.value
        )
    }
}