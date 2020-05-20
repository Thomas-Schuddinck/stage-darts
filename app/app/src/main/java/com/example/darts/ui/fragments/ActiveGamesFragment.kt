package com.example.darts.ui.fragments

import android.content.res.Configuration
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.GridLayoutManager
import com.example.darts.R
import com.example.darts.databinding.FragmentActiveGamesListBinding
import com.example.darts.databinding.FragmentHomescreenBinding
import com.example.darts.domain.enums.DaRtsApiStatus
import com.example.darts.ui.adapters.ActiveGameListAdapter
import com.example.darts.ui.viewmodels.ActiveGameViewModel
import com.google.android.material.snackbar.Snackbar
import org.koin.android.viewmodel.ext.android.sharedViewModel

class ActiveGamesFragment : Fragment(){
    private val viewModel: ActiveGameViewModel by sharedViewModel()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        val binding = FragmentActiveGamesListBinding.inflate(inflater)
        binding.lifecycleOwner = this

        val adapter = ActiveGameListAdapter(
            ActiveGameListAdapter.OnClickListener{
                        game ->
                    run {
                        viewModel.handleGameClick(game)
                    }
                }
                )

        binding.activeGamesList.adapter = adapter


        viewModel.games.observe(viewLifecycleOwner, Observer {
            it?.let {
                adapter.submitList(it)
                if(viewModel.games.value!!.isEmpty()){
                    binding.emptyView.visibility = View.VISIBLE
                    binding.activeGamesList.visibility = View.GONE
                }else{
                    binding.emptyView.visibility = View.GONE
                    binding.activeGamesList.visibility = View.VISIBLE
                }
            }
        } )

        var numberOfColumns = 1

        if (this.context!!.getResources().configuration.orientation == Configuration.ORIENTATION_LANDSCAPE){
            numberOfColumns = 2
        }

        binding.activeGamesList.setLayoutManager(
            GridLayoutManager(
                this.context,
                numberOfColumns,
                GridLayoutManager.VERTICAL, false
            )
        )

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