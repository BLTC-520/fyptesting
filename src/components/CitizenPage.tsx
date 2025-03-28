import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Citizen } from '../types'

const CitizenPage = () => {
  const [citizens, setCitizens] = useState<Citizen[]>([])

  useEffect(() => {
    fetchCitizens()
  }, [])

  const fetchCitizens = async () => {
    const { data, error } = await supabase.from('citizens').select('*')

    if (error) {
      console.error('Error fetching citizens:', error)
    } else {
      setCitizens(data || [])
    }
  }

  return (
    <div>
      <h1>Citizen List</h1>
      {citizens.map((citizen) => (
        <div key={citizen.id}>
          {citizen.full_name} - {citizen.email}
        </div>
      ))}
    </div>
  )
}

export default CitizenPage
