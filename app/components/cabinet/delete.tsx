'use client'

import { useState } from "react"
import {CabinetDelete} from "@/app/server-actions/cabinet/delete"
export function CabinetDeleteForm({cabinet,id}) {
    const [formData, setFormData] = useState({
        name: cabinet[0].name,
        description: cabinet[0].description,
    })


    return (
        <div>
                <div className="flex justify-center px-4">
                    <div >
                    <form action={CabinetDelete}>
                    <input 
                            type="hidden" 
                            name="id" 
                            value={id} 
                        />
                        <div >
                            <label htmlFor="name" >Name</label>
                            <input 
                                type="text" 
                                id="name"
                                name="name" 
                                value={formData.name} 
                                readOnly
                                                            />
                        </div>
                        <div>
                            <label htmlFor="description">Desciption</label>
                            <textarea 
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
                </div>
        </div>
    )
}