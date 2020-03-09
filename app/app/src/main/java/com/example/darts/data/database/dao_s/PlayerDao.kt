package com.example.darts.data.database.dao_s

import androidx.lifecycle.LiveData
import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import com.example.darts.data.database.db_entities.DatabasePlayer

@Dao
interface PlayerDao {
    @Query("SELECT * FROM DatabasePlayer")
    fun getAll(): LiveData<List<DatabasePlayer>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertAll(vararg players: DatabasePlayer)

    @Query("DELETE FROM DatabasePlayer")
    fun clearTable()
}