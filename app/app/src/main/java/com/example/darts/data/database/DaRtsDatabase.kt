package com.example.darts.data.database

import androidx.room.Database
import androidx.room.RoomDatabase
import com.example.darts.data.database.dao_s.GeneralDao
import com.example.darts.data.database.dao_s.UserLoginDao
import com.example.darts.data.database.db_entities.*

@Database(entities = [
    DatabasePlayer::class,
    DatabaseLegGroup::class,
    DatabasePlayerLeg::class,
    DatabaseGame::class,
    DatabaseUserLogin::class,
    DatabaseTurn::class,
    DatabaseDartThrow::class
], version = 2, exportSchema = false)
abstract class DaRtsDatabase  : RoomDatabase() {
    abstract val generalDao: GeneralDao
    abstract val loginDao: UserLoginDao
}