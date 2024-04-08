import React from 'react'
import Card from '../atom/card/Card'
import Modal from '../atom/modal/Modal'
import { Button } from '@chakra-ui/react'
import FormModal from '../Organisms/form/FormModal'
import DatePicker from '../atom/datePicker/DatePicker'
import Select from '../atom/select/Select'
import InputText from '../atom/input/InputText'
import InputNumber from '../atom/input/InputNumber'
import { useProcessItem } from '@/hooks/useProcessItem'
import { useDispatch, useSelector } from 'react-redux'
import { selectItem, setEditedItem } from '@/lib/features/itemSlice'
import { useQueryCategories } from '@/hooks/useQueryCategories'

const InputField = () => {
  const dispatch = useDispatch()
  const editedItem = useSelector(selectItem)
  const {
    processItem
  } = useProcessItem()
  const { data: dataCategories } = useQueryCategories()
  return (
    <div>
      <Card>
        <div className="flex">
          <div>
            <Button colorScheme='gray'>収入</Button>
          </div>
          <div>
            <Button colorScheme='gray'>支出</Button>
          </div>
        </div>
        <div><Button colorScheme='gray'>残高</Button></div>
        <Modal>
          <form onSubmit={processItem}>
            <FormModal />
            <div className="mb-2">
              <DatePicker />
            </div>
            <div className="mb-2">
              <Select
                array={dataCategories}
              />
            </div>
            <div className="mb-2">
              <InputNumber
                pleaceholder="金額"
                onChange={(event) => {
                  dispatch(
                    setEditedItem({
                      ...editedItem,
                      amount: Number(event.target.value)
                    })
                  )
                }}
              />
            </div>
            <div className="mb-2">
              <InputText
                pleaceholder="内容"
                name=""
                onChange={(event) => {
                  dispatch(
                    setEditedItem({
                      ...editedItem,
                      content: event.target.value
                    })
                  )
                }}
              />
            </div>
            <Button
              colorScheme="red"
              type="submit"
            >
              保存
            </Button>
            <Button
              colorScheme="blue"
              type="submit"
            >
              更新
            </Button>
            <Button
              colorScheme="red"
            >
              削除
            </Button>
          </form>
        </Modal>
        <div className="flex justify-between">
          <div>test</div>
          <div>test</div>
        </div>
      </Card>
    </div>
  )
}

export default InputField
