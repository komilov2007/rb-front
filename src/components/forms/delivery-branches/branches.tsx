import { Card } from './style'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useQueryClient } from '@tanstack/react-query'
import { FormBranch } from '@/components/forms/branch'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { type SchemaTypeDeliveryBranches } from '@/utils/schema'
import { InputCheckbox } from '@/components/inputs/input-checkbox'
import { type ServiceProps, type BranchProps } from '@/types/branch'
import { ReactComponent as IconLocationMap } from '@/assets/icons/location-map.svg'

interface BranchesProps {
  type: ServiceProps
  count?: number
}

export const DeliveryBranches = ({ type, count }: BranchesProps) => {
  const queryClient = useQueryClient()
  const form = useFormContext<SchemaTypeDeliveryBranches>()
  const { fields, prepend } = useFieldArray({
    name: 'branches',
    control: form.control,
  })

  const handleUpdate = (values: BranchProps) => {
    const branch = {
      checked: true,
      name: values.name,
      branchId: values.id,
      address: values.address,
    }
    prepend(branch)
    if (type === 'PICKUP') {
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.SHOP_DELIVERY_DETAILS])
    }
    if (type === 'DELIVERY') {
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.SHOP_PICKUP_DETAILS])
    }
  }

  return (
    <>
      <Stack gap='5px'>
        <Stack gap='18px' component='ul'>
          {fields.map((f, index) => (
            <Card key={f.id}>
              <Stack
                p='8px'
                gap='13px'
                direction='row'
                alignItems='center'
                sx={{
                  maxWidth: 'calc(100% - 60px)',
                }}
              >
                <Stack>
                  <IconLocationMap />
                </Stack>
                <Stack width='100%'>
                  <Typography
                    width='100%'
                    variant='text60'
                    sx={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      maxWidth: 'calc(100% - 30px)',
                    }}
                  >
                    {f.name}
                  </Typography>
                  <Typography
                    variant='text'
                    component='span'
                    sx={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      maxWidth: 'calc(100% - 20px)',
                    }}
                    color={theme => theme.palette.allColors.BLACK30}
                  >
                    {f.address}
                  </Typography>
                </Stack>
              </Stack>
              <InputCheckbox label='' control={form.control} name={`branches.${index}.checked`} />
            </Card>
          ))}
        </Stack>
        <Stack alignItems='flex-end'>
          <FormBranch type={type} count={count} variant='create' handleUpdate={handleUpdate} />
        </Stack>
      </Stack>
    </>
  )
}
