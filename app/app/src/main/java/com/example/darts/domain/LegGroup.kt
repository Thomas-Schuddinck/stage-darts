package com.example.darts.domain

data class LegGroup(
    val legGroupId: Int,
    val legNr : Int,
    val winner: Int,
    val turns: List<PlayerLeg>
)