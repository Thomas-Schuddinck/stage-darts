package com.example.darts.domain

import java.time.LocalDate

data class Game(
    val gameId: Int,
    val startDate: LocalDate,
    val endDate: LocalDate,
    val players: List<Player>,
    val legGroups: List<LegGroup>
)