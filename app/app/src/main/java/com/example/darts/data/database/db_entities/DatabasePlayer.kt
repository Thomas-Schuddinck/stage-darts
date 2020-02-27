package com.example.darts.data.database.db_entities

import androidx.room.Entity
import androidx.room.PrimaryKey
import com.example.darts.domain.Player

@Entity
data class DatabasePlayer constructor(
    @PrimaryKey
    val id : Int,
    val name: String,
    val email: String
)

fun List<DatabasePlayer >.asDomainModel(): List<Player>{
    return map {
        Player (
            id = it.id,
            name = it.name,
            email = it.email
        )
    }
}