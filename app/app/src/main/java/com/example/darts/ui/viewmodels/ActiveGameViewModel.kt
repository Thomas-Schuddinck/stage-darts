package com.example.darts.ui.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.darts.domain.DaRtsRepository
import com.example.darts.domain.Game
import com.example.darts.domain.enums.DaRtsApiStatus
import kotlinx.coroutines.launch
import retrofit2.HttpException
import timber.log.Timber

class ActiveGameViewModel(private val repository: DaRtsRepository) : ViewModel() {

    private var _games = MutableLiveData<List<Game>>()
    val games : LiveData<List<Game>> get() = _games

    private val _navigateToGameDetails = MutableLiveData<Boolean>()
    val navigateToGameDetails: LiveData<Boolean> get() = _navigateToGameDetails

    private val _status = MutableLiveData<DaRtsApiStatus>()
    val status: LiveData<DaRtsApiStatus> get() = _status

    init {
    }

    /**
     * changes the observed value for navigation to team list
     *
     */
    fun onClickNavigateToGameDetails() {
        viewModelScope.launch {


            try {
                _status.value = DaRtsApiStatus.LOADING
                _navigateToGameDetails.value = true

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
     * changes the observed value back after navigation to game details
     *
     */
    fun navigatedToGameDetails() {
        _navigateToGameDetails.value = false
    }

    fun handleGameClick(game: Any) {

    }


}