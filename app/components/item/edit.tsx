'use client'

import { useState } from "react"
import ItemEdit from "@/app/server-actions/item/edit"

export function ItemEditForm({item}) {
    const [formData, setFormData] = useState({
        id: item[0].id,
        name: item[0].name,
        expiration_date: item[0].expiration_date,
        quantity: item[0].quantity,
    })
    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})

console.log("item : ",formData.name);
    return (
        <div>
                <div className="flex justify-center px-4">
                    <div >
                    <form action={ItemEdit}>
                    <input 
                            type="hidden" 
                            name="id" 
                            value={formData.id} 
                        />
                        <div >
                            <label htmlFor="name">Name</label>
                            <input 
                                type="text" 
                                id="name"
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div >
                            <label htmlFor="expiration_date">Expiration Date</label>
                            <input 
                                type="date" 
                                id="expiration_date"
                                name="expiration_date" 
                                value={formData.expiration_date} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div >
                            <label htmlFor="quantity">quantity </label>
                            <input 
                                type="number" 
                                id="quantity"
                                name="quantity" 
                                value={formData.quantity} 
                                onChange={handleChange} 
                            />
                        </div>
                        <button type="submit" className="ml-2 bg-blue-500 text-white px-2 py-1 rounded">
                            Edit
                        </button>
                    </form>
                    </div>
                </div>
        </div>
    )
}