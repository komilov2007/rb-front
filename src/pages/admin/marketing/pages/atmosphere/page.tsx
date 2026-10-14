import Stack from '@mui/material/Stack'
import { usePage } from './usePage'
import { Images } from './components/images'
import { Spinner } from '@/components/spinner'
import { Settings } from './components/settings'
import { Categories } from './components/categories'

const Page = () => {
  const { images, can_edit, isLoading, atmosphere, can_delete, selected, setSelected } = usePage()

  if (isLoading || !atmosphere) {
    return <Spinner center />
  }

  return (
    <Stack p='20px' gap='24px' height='100%' overflow='auto'>
      <Settings atmosphere={atmosphere} canEdit={can_edit} />
      <Categories
        canEdit={can_edit}
        selected={selected}
        canDelete={can_delete}
        onSelect={setSelected}
        categories={atmosphere.categories}
      />
      <Images
        images={images}
        canEdit={can_edit}
        selected={selected}
        canDelete={can_delete}
        onSelect={setSelected}
        categories={atmosphere.categories}
      />
    </Stack>
  )
}

export default Page
