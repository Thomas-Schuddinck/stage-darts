package com.example.darts

import android.app.Application
import timber.log.Timber

class DaRtsApp : Application() {


    override fun onCreate() {
        super.onCreate()
        appContext = this

        if(BuildConfig.DEBUG){
            Timber.plant(Timber.DebugTree())
        }
    }

    companion object {
        lateinit var appContext: DaRtsApp
            private set
    }
}