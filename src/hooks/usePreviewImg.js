import React, { useState } from 'react'
import useShowToast from './useShowToast'

const usePreviewImg = () => {
    const [selectedFile, setSelectedFile] = useState(null)
    const showToast = useShowToast()
    const maxFileSizeinBytes = 5 * 1024 * 1024; // 5MB


    const handleImageChange = (e) => {
        const file = e.target.files[0]

        if (file && file.type.startsWith("image/")) {
            if (file.size > maxFileSizeinBytes) {
                showToast("Error", "File size must be less than 5MB", "error")
                setSelectedFile(null)
                return
            }

            const reader = new FileReader();

            reader.onloadend = () => {
                setSelectedFile(reader.result)
            }

            reader.readAsDataURL(file)

        } else {
            showToast("Error", "Please select an image file", "error")
            setSelectedFile(null)
        }
    }

    return { selectedFile, handleImageChange, setSelectedFile }
}

export default usePreviewImg