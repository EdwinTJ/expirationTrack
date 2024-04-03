'use client'

import { useState } from "react"
import {ItemDelete} from "@/app/server-actions/item/delete"
export function ItemDeleteForm({item}) {
    const [formData, setFormData] = useState({
        id: item[0].id,
        name: item[0].name,
        expiration_date: item[0].expiration_date,
        quantity: item[0].quantity,
    })


    return (
        <div >
            <form action={ItemDelete}>
            <input 
                    type="hidden" 
                    name="id" 
                    value={formData.id} 
                />
                <div >
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2" >Name</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" 
                        id="name"
                        name="name" 
                        value={formData.name} 
                        readOnly
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
                        readOnly
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
                        readOnly
                    />
                </div>
                <div className="md:flex md:items-center">
                    <button type="submit" className="ml-2 bg-blue-500 text-white px-2 py-1 rounded">
                        Delete
                    </button>
                </div>
            </form>
        </div>
    )
}