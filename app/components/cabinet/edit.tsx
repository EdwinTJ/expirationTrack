'use client'

import { useState } from "react"
import CabinetEdit from "@/app/server-actions/cabinet/edit"

export function CabinetEditForm({cabinet,id}) {
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        name: cabinet.name,
        description: cabinet.description,
    })
    console.log("cabinet : ",id)
    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})


    return (
        <div>
            <button onClick={() => setShowModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Edit
            </button>
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center px-4">
                    <div className="modal-content bg-gray-900 p-6 rounded-lg w-full max-w-md">
                    <span  onClick={() => setShowModal(false)}>&times;</span>
                    <form action={CabinetEdit} onSubmit={() => setShowModal(false)} className="mt-4">
                    <input 
                            type="hidden" 
                            name="id" 
                            value={id} 
                        />
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                            <input 
                                type="text" 
                                id="name"
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500" 

                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-300 mb-2" >Desciption</label>
                            <textarea 
                                id="description"
                                name="description" 
                                value={formData.description} 
                                onChange={handleChange} 
                                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500" 
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Update Watch
                        </button>
                    </form>
                    </div>
                </div>
            )}
        </div>
    )
}