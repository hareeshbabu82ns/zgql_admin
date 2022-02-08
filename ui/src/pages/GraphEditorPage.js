import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GraphEditor, } from '../components/GraphEditor';
import axios from '../utils/GqlAxiosClient'

export const GraphEditorPage = () => {

  const params = useParams()

  const [ schema, setSchema ] = React.useState( { code: '', libraries: '' } )
  const [ loading, setLoading ] = React.useState( false )

  const onSave = async ( schema ) => {
    // console.log( 'Saving Schema...', params.id, schema )
    setLoading( true )
    const res = await axios.post( '/', schema.code, {
      params: { sdl: params.id },
      headers: { 'content-type': 'text/plain; charset="utf-8"' }
    } )
    setSchema( { ...schema, code: res.data } )
    setLoading( false )
  }

  useEffect( () => {
    // console.log( 'Loading Schema...', params.id )
    setLoading( true )
    axios
      .get( '/', { params: { sdl: params.id } } )
      .then( ( res ) => setSchema( { ...schema, code: res.data } ) )
      .catch( () => setSchema( { ...schema, code: '' } ) )
      .finally( () => setLoading( false ) )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ params ] )

  if ( schema?.code === '' ) return null

  return (

    <GraphEditor key={params?.id || 'new'}
      code={schema.code} libraries={schema.libraries}
      loading={loading} onSave={onSave}
    />

  );
};

export default GraphEditorPage