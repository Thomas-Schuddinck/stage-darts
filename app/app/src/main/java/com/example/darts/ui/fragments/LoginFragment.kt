package com.example.darts.ui.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.navigation.fragment.NavHostFragment.findNavController
import androidx.navigation.fragment.findNavController
import com.example.darts.ui.viewmodel.LoginViewModel
import com.google.android.material.snackbar.Snackbar
import org.koin.android.viewmodel.ext.android.sharedViewModel

class LoginFragment : Fragment(){
    private val viewModel: LoginViewModel by sharedViewModel()
/*
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        val binding =FragmentLoginBinding.inflate(inflater)
        binding.lifecycleOwner = this
        binding.loginViewModel = viewModel

        viewModel.navigateToApp.observe(this, Observer {
            if(it) {
                findNavController().navigate(LoginFragmentDirections.actionLoginFragmentToMainMenuFragment())
                viewModel.navigatedToApp()
            }
        })

        viewModel.status.observe(this, Observer {
            when(it) {
                MulTeamApiStatus.ERROR -> {
                    Snackbar.make(
                        activity!!.findViewById(android.R.id.content),
                        getString(R.string.no_network),
                        Snackbar.LENGTH_LONG
                    ).show()
                }
            }
        })
        return binding.root

    } */

}