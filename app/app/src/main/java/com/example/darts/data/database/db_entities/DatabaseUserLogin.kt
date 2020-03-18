package com.example.darts.data.database.db_entities

import androidx.room.Entity
import androidx.room.PrimaryKey
import com.example.darts.domain.Player

@Entity
data class DatabaseUserLogin(
    @PrimaryKey
    val id : Int,
    val name: String,
    val email: String
)
/*  mogelijks niet gebruikt
fun List<DatabaseUserLogin>.asDomainModel(): List<Player>{
    return map {
        Player (
            id = it.id,
            name = it.name,
            email = it.email
        )
    }
}

 */