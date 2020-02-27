package com.example.darts.ui.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import com.example.darts.R
import com.example.darts.databinding.FragmentHomescreenBinding
import com.example.darts.domain.enums.DaRtsApiStatus
import com.example.darts.ui.viewmodels.HomeViewModel
import com.google.android.material.snackbar.Snackbar
import org.koin.android.viewmodel.ext.android.sharedViewModel

class HomescreenFragment : Fragment(){
    private val viewModel: HomeViewModel by sharedViewModel()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        val binding = FragmentHomescreenBinding.inflate(inflater)
        binding.lifecycleOwner = this
        binding.homeViewModel = viewModel



        viewModel.status.observe(this, Observer {
            when(it) {
                DaRtsApiStatus.ERROR -> {
                    Snackbar.make(
                        activity!!.findViewById(android.R.id.content),
                        getString(R.string.no_network),
                        Snackbar.LENGTH_LONG
                    ).show()
                }
            }
        })
        return binding.root

    }
}