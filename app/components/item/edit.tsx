'use client'

import { useState } from "react"
import ItemEdit from "@/app/server-actions/item/edit"
import {Cabinet} from "@/app/interfeces"
import {Item} from "@/app/interfeces"

export function ItemEditForm({item,cabinet}:{item: Item[],cabinet: Cabinet[]}) {
    const [formData, setFormData] = useState({
        id: item[0].id,
        name: item[0].name,
        expiration_date: item[0].expiration_date,
        quantity: item[0].quantity,
    })
    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})
    return (
                    <div >
                    <form action={ItemEdit}>
                    <input 
                            type="hidden" 
                            name="id" 
                            value={formData.id} 
                        />
                        <div >
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                            <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text" 
                                id="name"
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div >
                            <label htmlFor="expiration_date" className="block text-gray-700 text-sm font-bold mb-2">Expiration Date</label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="date" 
                                id="expiration_date"
                                name="expiration_date" 
                                value={formData.expiration_date} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div >
                            <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">quantity </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="number" 
                                id="quantity"
                                name="quantity" 
                                value={formData.quantity} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="inline-block relative w-64">
                        <label htmlFor="cabinet" className="block text-gray-700 text-sm font-bold mb-2">
                        <select name="cabinet" id="cabinet" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        {cabinet.map((cabinet) => (
                            <option key={cabinet.id} value={cabinet.id}>
                            {cabinet.name}
                            </option>
                        ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </label> 
                        </div>
                     <div className="md:flex md:items-center">
                     <button type="submit" className="ml-2 bg-blue-500 text-white px-2 py-1 rounded">
                            Edit
                        </button>
                     </div>
                    </form>
                    </div>
    )
}