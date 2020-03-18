package com.example.darts.ui.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.darts.databinding.ActiveGameListItemBinding
import com.example.darts.domain.Game

/**
 * The adapter for the active games list.
 *
 * @property onClickListener the click listener for the list items
 * @constructor Creates an new ActiveGameListAdapter.
 * */
class ActiveGameListAdapter (private val onClickListener: OnClickListener) : ListAdapter<Game,ActiveGameListAdapter.ActiveGameViewHolder>(DiffCallback){


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ActiveGameViewHolder {
        return ActiveGameViewHolder.from(parent)
    }

    override fun onBindViewHolder(holder:ActiveGameViewHolder, position: Int) {
        val game = getItem(position) as Game

        holder.bind(game, onClickListener)
    }
    /**
     * The viewholder for the active game list items.
     *
     * @property binding the databinding for the listitems
     * @constructor Creates an new ActiveGameViewHolder.
     * */
    class ActiveGameViewHolder(private var binding: ActiveGameListItemBinding): RecyclerView.ViewHolder(binding.root) {

        fun bind(game: Game, clickListener: OnClickListener) {
            binding.game = game
            binding.clickListener = clickListener
            binding.executePendingBindings()

        }

        companion object {
            fun from(parent: ViewGroup): ActiveGameViewHolder {
                val layoutInflater = LayoutInflater.from(parent.context)

                val binding = ActiveGameListItemBinding.inflate(layoutInflater, parent, false)
                return ActiveGameViewHolder(binding)
            }
        }
    }

    companion object DiffCallback : DiffUtil.ItemCallback<Game>() {
        override fun areItemsTheSame(oldItem: Game, newItem: Game): Boolean {
            return oldItem.gameId == newItem.gameId
        }

        override fun areContentsTheSame(oldItem: Game, newItem: Game): Boolean {

            return oldItem == newItem
        }
    }

    /**
     * The adapter for the new tasks list.
     *
     * @property onClickListener the click listener for the list items
     * @constructor Creates an new OnClickListener.
     * */
    class OnClickListener(val clickListener: (game: Game) -> Unit) {
        fun onClick(game: Game) = clickListener(game)
    }
}