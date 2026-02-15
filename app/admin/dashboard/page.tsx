'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Dashboard() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tech, setTech] = useState('')
  const [skillName, setSkillName] = useState('')
const [skillLevel, setSkillLevel] = useState('')


const handleAddSkill = async () => {
  await supabase.from('skills').insert([
    {
      name: skillName,
      level: skillLevel
    }
  ])

  setSkillName('')
  setSkillLevel('')
}


  const handleSubmit = async () => {
    const { error } = await supabase.from('projects').insert([
      {
        title,
        description,
        tech_stack: tech
      }
    ])

    if (!error) {
      alert('Project berhasil ditambahkan')
      setTitle('')
      setDescription('')
      setTech('')
    } else {
      alert('Gagal menambahkan project')
    }
  }

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tambah Project</h1>

      <div className="flex flex-col gap-4">
        <input
          className="border p-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Tech Stack"
          value={tech}
          onChange={(e) => setTech(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-black text-white py-2 rounded"
        >
          Simpan
        </button>
      </div>

      <div className="mt-10 flex flex-col gap-3 max-w-md">
  <h2 className="text-xl font-semibold">Tambah Skill</h2>

  <input
    className="border p-2"
    placeholder="Skill Name"
    value={skillName}
    onChange={(e) => setSkillName(e.target.value)}
  />

  <input
    className="border p-2"
    placeholder="Level (Beginner / Intermediate / Advanced)"
    value={skillLevel}
    onChange={(e) => setSkillLevel(e.target.value)}
  />

  <button
    onClick={handleAddSkill}
    className="bg-blue-600 text-white py-2 rounded"
  >
    Tambah Skill
  </button>
</div>

    </div>
  )
}
