package com.example.darts.data.database

import androidx.room.Database
import androidx.room.RoomDatabase
import com.example.darts.data.database.db_entities.DatabasePlayer

@Database(entities = [DatabasePlayer::class], version = 1, exportSchema = false)
abstract class DaRtsDatabase  : RoomDatabase() {

}