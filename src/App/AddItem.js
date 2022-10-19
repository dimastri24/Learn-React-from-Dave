import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { useRef } from 'react'

export const AddItem = ({newItem, setNewItem, handleSubmit}) => {
    const inpuRef = useRef();

    return (
        <form className="addForm" onSubmit={handleSubmit}>
            <label htmlFor="addItem">Add Item</label>
            <input
                autoFocus
                ref={inpuRef}
                id="addItem"
                type="text"
                placeholder="Add Item"
                required
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
            />
            <button
                type="submit"
                aria-label='Add Item'
                onClick={() => inpuRef.current.focus()}
            >
                <FaPlus/>
            </button>
        </form>
    )
}
