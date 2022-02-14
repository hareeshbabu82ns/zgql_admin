import { Grid } from "@mui/material"

import FormInputText from './FormInput/FormInputText'

const SchemaFormView = ( { form, onSubmit } ) => {
  const { formState, control, handleSubmit, setValue } = form
  const { errors, isSubmitting } = formState

  return (
    <form onSubmit={handleSubmit( onSubmit )}>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <FormInputText
            name="name" label="Schema ID"
            control={control} />
        </Grid>

        <Grid item xs={12}>
          <FormInputText
            name="description" label="Description"
            control={control} />
        </Grid>

        <Grid item xs={12}>
          <FormInputText
            name="path" label="Path"
            control={control} />
        </Grid>

      </Grid>
    </form>
  )
}

export default SchemaFormView