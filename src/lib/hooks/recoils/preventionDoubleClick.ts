import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

const preventionDoubleClick = atom({
  key: 'preventionDoubleClick',
  default: false
})

export const usePreventionDoubleClick = () => {
  return useRecoilState(preventionDoubleClick)
}

export const usePreventionDoubleClickValue = () => {
  return useRecoilValue(preventionDoubleClick)
}

export const useSetPreventionDoubleClick = () => {
  return useSetRecoilState(preventionDoubleClick)
}
