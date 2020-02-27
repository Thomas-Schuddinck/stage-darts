package com.example.darts.ui.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.darts.domain.DaRtsRepository
import com.example.darts.domain.enums.DaRtsApiStatus
import kotlinx.coroutines.launch
import retrofit2.HttpException
import timber.log.Timber

class LoginViewModel(private val repository: DaRtsRepository) : ViewModel(){
    val userEmail = MutableLiveData<String>()
    val userPassword = MutableLiveData<String>()

    private val _navigateToApp = MutableLiveData<Boolean>()
    val navigateToApp: LiveData<Boolean> get() = _navigateToApp

    private val _status = MutableLiveData<DaRtsApiStatus>()
    val status: LiveData<DaRtsApiStatus> get() = _status

    init {
        userEmail.value = "thomas.schuddinck@mail.com"
        userPassword.value = "P@ssword1"
    }

    /**
     * changes the observed value for navigation to team list
     *
     */
    fun onClickNavigateToApp(){
        viewModelScope.launch {
            repository.loginUser(userEmail.value!!, userPassword.value!!)


            try {
                _status.value = DaRtsApiStatus.LOADING
                _navigateToApp.value = true

                _status.value = DaRtsApiStatus.DONE

            } catch (e: HttpException) {
                Timber.i(e.message())
                _status.value = DaRtsApiStatus.ERROR
            } catch (e: Exception) {
                Timber.i(e.message)
                _status.value = DaRtsApiStatus.ERROR
            }
        }
    }

    /**
     * changes the observed value back after navigation to main menu
     *
     */
    fun navigatedToApp(){
        _navigateToApp.value = false
    }

}