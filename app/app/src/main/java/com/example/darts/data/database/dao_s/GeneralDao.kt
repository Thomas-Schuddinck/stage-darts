package com.example.darts.data.database.dao_s

import androidx.lifecycle.LiveData
import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import com.example.darts.data.database.db_entities.*
import com.example.darts.data.database.db_relationship_mappers.LegGroupPlayerLegs
import com.example.darts.domain.DartThrow

@Dao
interface GeneralDao {

    // Games
    @Query("SELECT * FROM DatabaseGame")
    fun getAll(): LiveData<List<DatabaseGame>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertAll(vararg games: DatabaseGame)
    @Query("SELECT * FROM DatabasePlayer WHERE id = :id")
    fun getPlayerById(id: Int): DatabasePlayer
    // Players
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertAll(vararg players: DatabasePlayer)

    // LegGroups
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertAll(vararg legGroups: DatabaseLegGroup)

    // PlayerLegs
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertAll(vararg playerLegs: DatabasePlayerLeg)

    // Turns
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertAll(vararg turns: DatabaseTurn)

    // DartThrows
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertAll(vararg dartThrows: DatabaseDartThrow)

    @Query("DELETE FROM DatabaseGame")
    fun clearTable()
}