package com.example.darts.data.database.dao_s

import androidx.lifecycle.LiveData
import androidx.room.*
import com.example.darts.data.database.db_entities.DatabaseDartThrow
import com.example.darts.data.database.db_entities.DatabasePlayer
import com.example.darts.domain.DartThrow

@Dao
interface DartThrowDao {
    @Query("SELECT * FROM DatabaseDartThrow")
    fun getAll(): LiveData<List<DatabaseDartThrow>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertAll(vararg dartThrows: DartThrow)

    @Query("DELETE FROM DatabaseDartThrow")
    fun clearTable()
}