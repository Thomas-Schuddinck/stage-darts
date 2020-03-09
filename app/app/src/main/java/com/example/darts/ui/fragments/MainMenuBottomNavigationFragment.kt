package com.example.darts.ui.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.MenuItem
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import com.example.darts.MainActivity
import com.example.darts.R
import com.example.darts.databinding.FragmentMainMenuBottomNavigationBinding
import com.example.darts.domain.enums.DaRtsApiStatus
import com.example.darts.ui.viewmodels.MainMenuViewModel
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.google.android.material.snackbar.Snackbar
import org.koin.android.viewmodel.ext.android.sharedViewModel


class MainMenuBottomNavigationFragment : Fragment(){

    private val viewModel: MainMenuViewModel by sharedViewModel()
    private var currentFragment: Fragment? = null
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val binding = FragmentMainMenuBottomNavigationBinding.inflate(inflater)
        binding.lifecycleOwner = this

        viewModel.status.observe(this, Observer {
            when (it) {
                DaRtsApiStatus.ERROR -> {
                    Snackbar.make(
                        activity!!.findViewById(R.id.content),
                        getString(R.string.no_network_message_text),
                        Snackbar.LENGTH_LONG
                    ).show()
                }
            }
        })

        binding.bottomNavigationMainMenu.setOnNavigationItemSelectedListener {
            handleBottomNavigation(it)
            true
        }

        if (savedInstanceState == null) {
            binding.bottomNavigationMainMenu.selectedItemId = R.id.join_game_menu_item
        }

        return binding.root
    }


    fun handleBottomNavigation(menuItem: MenuItem) {
        var fragment: Fragment = JoinTeamFragment()
        val ft = (activity as MainActivity).supportFragmentManager.beginTransaction()


        when (menuItem.itemId) {

            R.id.active_games_menu_item -> {
                fragment = ActiveGamesFragment()
                ft.setCustomAnimations(
                    R.anim.slide_in_left,
                    R.anim.slide_out_right,
                    R.anim.fade_in,
                    R.anim.fade_out
                )
            }
            R.id.overview_menu_item -> {
                fragment = OverviewsFragment()
                ft.setCustomAnimations(
                    R.anim.slide_in_right,
                    R.anim.slide_out_left,
                    R.anim.fade_in,
                    R.anim.fade_out
                )

            }

        }

        if(currentFragment == null || currentFragment!!::class.java != fragment::class.java){

            currentFragment = fragment
            ft.replace(R.id.bottom_navigation_container, fragment).commit()
        }


    }
}