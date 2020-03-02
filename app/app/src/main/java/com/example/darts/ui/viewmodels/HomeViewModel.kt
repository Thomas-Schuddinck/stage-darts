package com.example.darts.ui.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.darts.domain.DaRtsRepository
import com.example.darts.domain.enums.DaRtsApiStatus
import kotlinx.coroutines.launch
import retrofit2.HttpException
import timber.log.Timber

class HomeViewModel(private val repository: DaRtsRepository) : ViewModel(){

    private val _navigateToGameList = MutableLiveData<Boolean>()
    val navigateToGameList: LiveData<Boolean> get() = _navigateToGameList

    private val _status = MutableLiveData<DaRtsApiStatus>()
    val status: LiveData<DaRtsApiStatus> get() = _status

    init {
    }

    /**
     * changes the observed value for navigation to team list
     *
     */
    fun onClickNavigateToGameList(){
        viewModelScope.launch {


            try {
                _status.value = DaRtsApiStatus.LOADING
                _navigateToGameList.value = true

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
        _navigateToGameList.value = false
    }

}