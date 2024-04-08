import { selectItem, setEditedItem } from '@/lib/features/itemSlice'
import { useAppSelector } from '@/lib/hooks'
import { Tab, TabList, Tabs } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'

const FormModal = () => {
  const dispatch = useDispatch()
  const editedItem = useAppSelector(selectItem)
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">入力</h2>
      <div className="mb-2">
        <Tabs variant='soft-rounded' colorScheme='green' index={editedItem.type === '収入' ? 1 : 0}>
          <TabList>
            <Tab onClick={() => {dispatch(setEditedItem({...editedItem, type: '支出'}))}}>支出</Tab>
            <Tab onClick={() => { dispatch(setEditedItem({ ...editedItem, type: '収入' }))}}>収入</Tab>
          </TabList>
        </Tabs>
      </div>
    </div>
  )
}

export default FormModal
