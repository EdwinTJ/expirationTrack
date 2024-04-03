'use client'

import { useState } from "react"
import CabinetEdit from "@/app/server-actions/cabinet/edit"
import {Cabinet} from "@/app/interfeces"

export function CabinetEditForm({cabinet,id} : {cabinet: Cabinet[],id: string}) {
    const [formData, setFormData] = useState({
        name: cabinet[0].name,
        description: cabinet[0].description,
    })
    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})

console.log("cabinet : ",formData.name);
    return (
        <div >
            <form action={CabinetEdit}>
            <input 
                    type="hidden" 
                    name="id" 
                    value={id} 
                />
                <div >
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" 
                        id="name"
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Desciption</label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange} 
                    />
                </div>
                <button type="submit" className="ml-2 bg-blue-500 text-white px-2 py-1 rounded">
                    Edit
                </button>
            </form>
        </div>
    )
}