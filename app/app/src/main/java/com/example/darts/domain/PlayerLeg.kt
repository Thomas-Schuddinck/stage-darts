package com.example.darts.domain

data class PlayerLeg(
    val playerLegId: Int,
    val currentScore : Int,
    val player: Player,
    val turns: List<Turn>
)