'use client'

import { useState } from "react"
import CabinetEdit from "@/app/server-actions/cabinet/edit"

export function CabinetEditForm({cabinet,id}) {
    const [formData, setFormData] = useState({
        name: cabinet[0].name,
        description: cabinet[0].description,
    })
    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})

console.log("cabinet : ",formData.name);
    return (
        <div>
                <div className="flex justify-center px-4">
                    <div >
                    <form action={CabinetEdit}>
                    <input 
                            type="hidden" 
                            name="id" 
                            value={id} 
                        />
                        <div >
                            <label htmlFor="name">Name </label>
                            <input 
                                type="text" 
                                id="name"
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Desciption</label>
                            <textarea 
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
                </div>
        </div>
    )
}