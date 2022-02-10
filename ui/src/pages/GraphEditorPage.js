import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { GraphEditor } from '../components/GraphEditor';
import axios from '../utils/GqlAxiosClient'

export const GraphEditorPage = () => {

  const params = useParams()
  const { enqueueSnackbar } = useSnackbar()

  const [ schema, setSchema ] = useState( { code: '', libraries: '' } )
  const [ loading, setLoading ] = useState( false )

  const onSave = async ( schema ) => {
    // console.log( 'Saving Schema...', params.id, schema )
    setLoading( true )
    try {
      const res = await axios.post( '/', schema.code, {
        params: { sdl: params.id },
        headers: { 'content-type': 'text/plain; charset="utf-8"' }
      } )
      enqueueSnackbar( 'Saved Schema', { variant: 'success' } )
      setSchema( { ...schema, code: res.data } )
    } catch ( e ) {
      enqueueSnackbar( 'Error Saving Schema', { variant: 'error' } )
    }
    setLoading( false )
  }

  const onFetch = () => {
    // console.log( 'Loading Schema...', params.id )
    setLoading( true )
    axios
      .get( '/', { params: { sdl: params.id } } )
      .then( ( res ) => {
        setSchema( { ...schema, code: res.data } )
        enqueueSnackbar( 'Schema Loaded' )
      } )
      .catch( () => {
        setSchema( { ...schema, code: '' } )
        enqueueSnackbar( 'Error Loading Schema', { variant: 'error' } )
      } )
      .finally( () => setLoading( false ) )
  }

  useEffect( () => {
    onFetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ params ] )

  if ( schema?.code === '' ) return null

  return (
    <GraphEditor key={params?.id || 'new'}
      code={schema.code} libraries={schema.libraries}
      loading={loading} onSave={onSave} onRefetch={onFetch}
    />
  );
};

export default GraphEditorPage