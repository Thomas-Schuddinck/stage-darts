package com.example.darts.data.database

import android.os.Build
import androidx.annotation.RequiresApi
import com.example.darts.data.database.dao_s.GeneralDao
import com.example.darts.data.database.db_entities.DatabaseLegGroup
import com.example.darts.data.database.db_entities.asDomainModel
import com.example.darts.data.database.db_relationship_mappers.PlayerLegTurns
import com.example.darts.domain.LegGroup
import com.example.darts.domain.PlayerLeg
import timber.log.Timber
import java.util.function.Consumer

class DatabaseHelper {
    private var dao: GeneralDao? = null

    fun DatabaseHelper(database: DaRtsDatabase) {
        dao = database.generalDao
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    private fun insertLegGroupsForGame(
        id: Int,
        legGroups: List<DatabaseLegGroup>
    ) {

        legGroups.forEach(Consumer<DatabaseLegGroup> { legGroup: DatabaseLegGroup ->
            legGroup.gameId = id
        })
    }

}