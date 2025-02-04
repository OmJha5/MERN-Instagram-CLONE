import React from 'react'
import {
    Dialog,
    DialogContent,

} from "@/components/ui/dialog"

export default function CommentDialog({ isOpen, setIsOpen }) {
    return (
        <div>
            <Dialog open={isOpen}>
                <DialogContent onInteractOutside={() => setIsOpen(false)}>
                    <div>
                        <img src="https://images.unsplash.com/photo-1738471743329-b50393cf6319?q=80&w=2001&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className=" rounded-md aspect-square object-fit" alt="" />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
