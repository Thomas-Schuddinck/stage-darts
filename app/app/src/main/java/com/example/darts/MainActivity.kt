package com.example.darts

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.databinding.DataBindingUtil
import com.example.darts.data.appViewModelModule
import com.example.darts.databinding.ActivityMainBinding
import org.koin.android.ext.koin.androidContext
import org.koin.android.ext.koin.androidLogger
import org.koin.core.context.startKoin
import org.koin.core.context.stopKoin

class MainActivity : AppCompatActivity() {

    private lateinit var binding : ActivityMainBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_main)

        startKoin {
            androidLogger()
            androidContext(this@MainActivity)
            modules(appViewModelModule)


        }
    }
    override fun onDestroy() {
        super.onDestroy()
        stopKoin()
    }
}
