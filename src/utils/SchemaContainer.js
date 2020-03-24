import { useState } from "react"
import { createContainer } from "unstated-next"
import axios from '../utils/GqlAxiosClient'

function useSchemaContainer(initialState = '') {
  let [schema, setSchema] = useState(initialState)
  let [isLoading, setLoading] = useState(false)

  const save = async (schema, sdl) => {
    console.log(sdl)
    if (!sdl)
      return;
    setLoading(true)
    try {
      const resp = await axios.post('', sdl, {
        params: { sdl: schema },
        headers: { 'content-type': 'text/plain; charset="utf-8"' }
      })
      // console.log(resp)
      return resp.data
    } finally {
      setLoading(false)
    }
  }
  const load = async (schemaName) => {
    setSchema(schemaName)
    setLoading(true)
    try {
      const resp = await axios.get('', { params: { sdl: schemaName } })
      return resp.data
    } finally {
      setLoading(false)
    }
  }
  return { schema, setSchema, save, load, isLoading }
}

const SchemaContainer = createContainer(useSchemaContainer)

export default SchemaContainer