'use client'

import { useState } from "react"
import {CabinetDelete} from "@/app/server-actions/cabinet/delete"
import {Cabinet} from "@/app/interfeces"
export function CabinetDeleteForm({cabinet,id}: {cabinet: Cabinet[],id: bigint}) {
    const [formData, setFormData] = useState({
        name: cabinet[0].name,
        description: cabinet[0].description,
    })


    return (
        <div >
            <form action={CabinetDelete}>
            <input 
            
                    type="hidden" 
                    name="id" 
                    value={id} 
                />
                <div >
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" 
                        id="name"
                        name="name" 
                        value={formData.name} 
                        readOnly
                                                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Desciption</label>
                    <textarea 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        name="description" 
                        value={formData.description} 
                        readOnly       
                                                />
                </div>
                <button type="submit" className="ml-2 bg-blue-500 text-white px-2 py-1 rounded">
                    Delete
                </button>
            </form>
        </div>
    )
}