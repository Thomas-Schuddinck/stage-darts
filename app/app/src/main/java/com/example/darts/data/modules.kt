package com.example.darts.data

import android.content.Context
import androidx.room.Room
import com.example.darts.data.database.DaRtsDatabase
import com.example.darts.data.network.DaRtsApiService
import com.example.darts.domain.DaRtsRepository
import com.example.darts.ui.viewmodels.HomeViewModel
import com.example.darts.ui.viewmodels.LoginViewModel
import com.jakewharton.retrofit2.adapter.kotlin.coroutines.CoroutineCallAdapterFactory
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import org.koin.android.ext.koin.androidContext
import org.koin.android.viewmodel.dsl.viewModel
import org.koin.dsl.module
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory

val appViewModelModule = module {
    viewModel { LoginViewModel(get()) }
    viewModel { HomeViewModel(get()) }
    single { DaRtsRepository(Network.mulTeamService, getDatabase(androidContext())) }
}

private fun moshi(): Moshi = Moshi.Builder()
    .add(KotlinJsonAdapterFactory())
    .build()



fun getDatabase(context: Context): DaRtsDatabase {
    synchronized(DaRtsDatabase::class.java) {
        if (!::INSTANCE.isInitialized) {
            INSTANCE = Room.databaseBuilder(context.applicationContext,
                DaRtsDatabase::class.java,
                "dartsDatabase").fallbackToDestructiveMigration().build()
        }
    }
    return INSTANCE
}

object Network{
    private fun retrofit() = Retrofit.Builder()
        .addConverterFactory(MoshiConverterFactory.create(moshi()).asLenient())
        .addCallAdapterFactory(CoroutineCallAdapterFactory())
        .baseUrl(BASE_URL)
        .build()

    val mulTeamService: DaRtsApiService by lazy {
        retrofit().create( DaRtsApiService::class.java)
    }
}


private const val BASE_URL = "http://10.0.2.2:5000/api/"
private lateinit var INSTANCE: DaRtsDatabase