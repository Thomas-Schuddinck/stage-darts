package com.example.darts.data.database.dao_s

import androidx.lifecycle.LiveData
import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import com.example.darts.data.database.db_entities.DatabasePlayer
import com.example.darts.data.database.db_entities.DatabaseUserLogin

@Dao
interface UserLoginDao {
    @Query("SELECT * FROM DatabaseUserLogin LIMIT 1")
    fun getLoggedInUser(): DatabaseUserLogin

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertLoggedInUser(project: DatabaseUserLogin)

    @Query("DELETE FROM DatabaseUserLogin")
    fun clearTable()
}