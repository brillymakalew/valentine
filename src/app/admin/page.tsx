"use client";

import { useState, useEffect } from "react";
import { MoveLeft, Plus, Trash, Save } from "lucide-react";
import Link from "next/link";

interface ConfigData {
    name: string;
    partnerName: string;
    hints: string[];
    correctCode: string;
    photoUrl: string;
    welcomePhotoUrl?: string;
}

export default function AdminPage() {
    const [formData, setFormData] = useState<ConfigData>({
        name: "Dian Firstiana",
        partnerName: "Brilly",
        hints: [],
        correctCode: "",
        photoUrl: ""
    });
    const [status, setStatus] = useState("");

    useEffect(() => {
        fetch("/api/admin")
            .then((res) => res.json())
            .then((data) => setFormData(data))
            .catch((err) => console.error(err));
    }, []);

    const handleChange = (field: keyof ConfigData, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleHintChange = (index: number, value: string) => {
        const newHints = [...formData.hints];
        newHints[index] = value;
        setFormData({ ...formData, hints: newHints });
    };

    const addHint = () => {
        setFormData({ ...formData, hints: [...formData.hints, "New Hint"] });
    };

    const removeHint = (index: number) => {
        const newHints = formData.hints.filter((_, i) => i !== index);
        setFormData({ ...formData, hints: newHints });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Saving...");
        try {
            const res = await fetch("/api/admin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) setStatus("Saved successfully! ✅");
            else setStatus("Failed to save ❌");
        } catch (error) {
            console.error(error);
            setStatus("Error saving");
        }
    };
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: keyof ConfigData) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setStatus("Uploading...");
        const data = new FormData();
        data.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: data,
            });
            const result = await res.json();
            if (result.success) {
                setFormData(prev => ({ ...prev, [field]: result.url }));
                setStatus("Uploaded! Don't forget to Save.");
            } else {
                setStatus("Upload failed ❌");
            }
        } catch (err) {
            console.error(err);
            setStatus("Upload error ❌");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans text-gray-800">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Cupid's Dashboard 🏹</h1>
                    <Link href="/" className="text-rose-500 hover:underline flex items-center gap-2">
                        <MoveLeft size={16} /> Back to App
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Her Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-300 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                            <input
                                type="text"
                                value={formData.partnerName}
                                onChange={(e) => handleChange("partnerName", e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-300 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Secret Code (4 digits)</label>
                        <input
                            type="text"
                            maxLength={4}
                            value={formData.correctCode}
                            onChange={(e) => handleChange("correctCode", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-300 outline-none transition-all font-mono tracking-widest text-center text-xl"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">Puzzle Hints</label>
                            <button type="button" onClick={addHint} className="text-xs text-rose-500 font-bold flex items-center gap-1 hover:bg-rose-50 px-2 py-1 rounded">
                                <Plus size={14} /> ADD HINT
                            </button>
                        </div>

                        <div className="space-y-3">
                            {formData.hints.map((hint, i) => (
                                <div key={i} className="flex gap-2">
                                    <span className="py-3 px-3 bg-gray-100 rounded-lg text-gray-500 font-mono text-sm">{i + 1}</span>
                                    <input
                                        type="text"
                                        value={hint}
                                        onChange={(e) => handleHintChange(i, e.target.value)}
                                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 outline-none transition-all"
                                    />
                                    <button type="button" onClick={() => removeHint(i)} className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Her Photo (Welcome Screen)</label>
                            <div className="flex flex-col gap-2">
                                <input
                                    type="text"
                                    placeholder="/dian.png"
                                    value={formData.welcomePhotoUrl || ""}
                                    onChange={(e) => handleChange("welcomePhotoUrl", e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 outline-none transition-all text-sm mb-1"
                                />
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e, "welcomePhotoUrl")}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <button type="button" className="w-full py-2 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors border border-gray-200 uppercase tracking-wide">
                                        📁 Upload New Photo
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500">
                                    Current: <a href={formData.welcomePhotoUrl || "#"} target="_blank" className="text-rose-500 hover:underline">{formData.welcomePhotoUrl || "None"}</a>
                                </p>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Our Photo (Ask Screen)</label>
                            <div className="flex flex-col gap-2">
                                <input
                                    type="text"
                                    placeholder="https://... or /photo.jpg"
                                    value={formData.photoUrl}
                                    onChange={(e) => handleChange("photoUrl", e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-300 outline-none transition-all text-sm mb-1"
                                />
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e, "photoUrl")}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <button type="button" className="w-full py-2 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors border border-gray-200 uppercase tracking-wide">
                                        📁 Upload New Photo
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500">
                                    Current: <a href={formData.photoUrl || "#"} target="_blank" className="text-rose-500 hover:underline">{formData.photoUrl || "None"}</a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className={`text-sm font-medium ${status.includes("✅") ? "text-green-600" : "text-gray-500"}`}>{status}</span>
                        <button
                            type="submit"
                            className="px-8 py-3 bg-rose-500 text-white font-bold rounded-xl shadow-lg hover:bg-rose-600 active:scale-95 transition-all flex items-center gap-2"
                        >
                            <Save size={18} /> Save Changes
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
