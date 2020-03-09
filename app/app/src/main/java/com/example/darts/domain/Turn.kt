package com.example.darts.domain

data class Turn(
    val turnId: Int,
    val turnNr : Int,
    val dartThrows: List<DartThrow>
)